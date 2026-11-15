"use client";

import { useRef, useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { CustomImage } from "./rich-text-image";
import { useUploadThing } from "@/lib/uploadthing";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Heading2,
  Heading3,
  Quote,
  Code,
  Minus,
  ImageIcon,
  Globe,
  Undo2,
  Redo2,
  Eraser,
  Loader2,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function RichTextEditor({
  value,
  onChange,
  disabled,
}: RichTextEditorProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onUploadProgress: (p) => {
      setUploadProgress(p);
    },
    onClientUploadComplete: (res) => {
      if (res?.[0]) {
        const fileUrl =
          (res[0] as { ufsUrl?: string; url?: string }).ufsUrl || res[0].url;
        if (fileUrl && editor) {
          editor
            .chain()
            .focus()
            .setImage({ src: fileUrl, alt: "Imagem da publicação" })
            .run();
          toast.success("Imagem inserida no conteúdo com sucesso!");
        }
      }
      setUploadProgress(0);
    },
    onUploadError: (error: Error) => {
      toast.error(`Erro ao enviar imagem: ${error.message}`);
      setUploadProgress(0);
    },
  });

  const uploadAndInsertImage = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Selecione um arquivo de imagem válido (PNG, JPG, WEBP).");
      return;
    }

    const maxBytes = 4 * 1024 * 1024;
    if (file.size > maxBytes) {
      toast.error("A imagem excede o tamanho máximo de 4MB.");
      return;
    }

    toast.info("Enviando imagem para o conteúdo...");
    try {
      await startUpload([file]);
    } catch {
      toast.error("Falha ao iniciar envio da imagem.");
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class:
            "text-emerald-600 underline font-medium hover:text-emerald-700 cursor-pointer",
        },
      }),
      CustomImage.configure({
        inline: false,
      }),
    ],
    content: value,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer?.files?.[0]) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith("image/")) {
            event.preventDefault();
            uploadAndInsertImage(file);
            return true;
          }
        }
        return false;
      },
      handlePaste: (view, event) => {
        const items = event.clipboardData?.items;
        if (items) {
          for (let i = 0; i < items.length; i++) {
            if (items[i].type.startsWith("image/")) {
              const file = items[i].getAsFile();
              if (file) {
                event.preventDefault();
                uploadAndInsertImage(file);
                return true;
              }
            }
          }
        }
        return false;
      },
    },
  });

  useEffect(() => {
    if (editor && !editor.isFocused && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL do link:", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const insertImageByUrl = () => {
    const url = window.prompt("Insira a URL direta da imagem (https://...):");
    if (!url) return;

    editor
      .chain()
      .focus()
      .setImage({ src: url, alt: "Imagem inserida por URL" })
      .run();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadAndInsertImage(e.target.files[0]);
      e.target.value = "";
    }
  };

  return (
    <div className="flex flex-col border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs focus-within:border-emerald-500/80 focus-within:ring-2 focus-within:ring-emerald-500/15 transition-all">
      {/* Hidden File Input for Direct Image Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        disabled={disabled || isUploading}
      />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200/80 bg-slate-50/90 px-3 py-2">
        {/* Títulos */}
        <Toggle
          size="sm"
          pressed={editor.isActive("heading", { level: 2 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          disabled={disabled}
          title="Título 2 (H2)"
          className="h-8 px-2 data-[state=on]:bg-emerald-100 data-[state=on]:text-emerald-800 font-bold"
        >
          <Heading2 className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive("heading", { level: 3 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          disabled={disabled}
          title="Subtítulo (H3)"
          className="h-8 px-2 data-[state=on]:bg-emerald-100 data-[state=on]:text-emerald-800 font-bold"
        >
          <Heading3 className="h-4 w-4" />
        </Toggle>

        <div className="w-[1px] h-5 bg-slate-200 mx-1" />

        {/* Formatação básica */}
        <Toggle
          size="sm"
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          disabled={disabled}
          title="Negrito (Ctrl+B)"
          className="h-8 w-8 p-0 data-[state=on]:bg-emerald-100 data-[state=on]:text-emerald-800"
        >
          <Bold className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          disabled={disabled}
          title="Itálico (Ctrl+I)"
          className="h-8 w-8 p-0 data-[state=on]:bg-emerald-100 data-[state=on]:text-emerald-800"
        >
          <Italic className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive("blockquote")}
          onPressedChange={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
          disabled={disabled}
          title="Citação em bloco"
          className="h-8 w-8 p-0 data-[state=on]:bg-emerald-100 data-[state=on]:text-emerald-800"
        >
          <Quote className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive("code")}
          onPressedChange={() => editor.chain().focus().toggleCode().run()}
          disabled={disabled}
          title="Código inline"
          className="h-8 w-8 p-0 data-[state=on]:bg-emerald-100 data-[state=on]:text-emerald-800"
        >
          <Code className="h-4 w-4" />
        </Toggle>

        <div className="w-[1px] h-5 bg-slate-200 mx-1" />

        {/* Listas & Divisores */}
        <Toggle
          size="sm"
          pressed={editor.isActive("bulletList")}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          disabled={disabled}
          title="Lista com marcadores"
          className="h-8 w-8 p-0 data-[state=on]:bg-emerald-100 data-[state=on]:text-emerald-800"
        >
          <List className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive("orderedList")}
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          disabled={disabled}
          title="Lista numerada"
          className="h-8 w-8 p-0 data-[state=on]:bg-emerald-100 data-[state=on]:text-emerald-800"
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          disabled={disabled}
          title="Linha divisória"
          className="h-8 w-8 p-0 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50"
        >
          <Minus className="h-4 w-4" />
        </Button>

        <div className="w-[1px] h-5 bg-slate-200 mx-1" />

        {/* Link */}
        <Toggle
          size="sm"
          pressed={editor.isActive("link")}
          onPressedChange={setLink}
          disabled={disabled}
          title="Inserir / remover link"
          className="h-8 w-8 p-0 data-[state=on]:bg-emerald-100 data-[state=on]:text-emerald-800"
        >
          <LinkIcon className="h-4 w-4" />
        </Toggle>

        {/* Imagem - Upload Direto do Dispositivo */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || isUploading}
          title="Inserir imagem (upload direto do computador)"
          className="h-8 px-2.5 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 font-medium text-xs flex items-center gap-1.5 cursor-pointer"
        >
          {isUploading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-600" />
          ) : (
            <ImageIcon className="h-3.5 w-3.5 text-emerald-600" />
          )}
          <span>{isUploading ? `Enviando (${uploadProgress}%)` : "Imagem"}</span>
        </Button>

        {/* Imagem por URL Externa */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={insertImageByUrl}
          disabled={disabled || isUploading}
          title="Inserir imagem via link URL"
          className="h-8 w-8 p-0 text-slate-500 hover:text-slate-800 hover:bg-slate-100"
        >
          <Globe className="h-3.5 w-3.5" />
        </Button>

        <div className="w-[1px] h-5 bg-slate-200 mx-1" />

        {/* Limpar formatação */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
          disabled={disabled}
          title="Limpar formatação"
          className="h-8 w-8 p-0 text-slate-500 hover:text-slate-800 hover:bg-slate-100"
        >
          <Eraser className="h-3.5 w-3.5" />
        </Button>

        {/* Desfazer / Refazer */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={disabled || !editor.can().undo()}
          title="Desfazer (Ctrl+Z)"
          className="h-8 w-8 p-0 text-slate-500 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-40"
        >
          <Undo2 className="h-3.5 w-3.5" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={disabled || !editor.can().redo()}
          title="Refazer (Ctrl+Y)"
          className="h-8 w-8 p-0 text-slate-500 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-40"
        >
          <Redo2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Status de upload em andamento */}
      {isUploading && (
        <div className="bg-emerald-50/70 border-b border-emerald-100 px-4 py-1.5 flex items-center justify-between text-xs text-emerald-800 animate-pulse">
          <div className="flex items-center gap-2">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
            <span>Fazendo upload da imagem para o conteúdo...</span>
          </div>
          <span className="font-semibold">{uploadProgress}%</span>
        </div>
      )}

      {/* Editor Area */}
      <div className="p-4 md:p-6 min-h-[340px] prose prose-slate max-w-none focus:outline-none text-slate-800 leading-relaxed prose-headings:font-bold prose-headings:text-slate-900 prose-h2:text-2xl prose-h3:text-xl prose-img:rounded-2xl prose-img:shadow-sm prose-img:border prose-img:border-slate-200/80 prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-50/30 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
