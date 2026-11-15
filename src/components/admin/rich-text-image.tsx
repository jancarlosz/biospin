"use client";

import React, { useState, useRef } from "react";
import TipTapImage from "@tiptap/extension-image";
import {
  NodeViewWrapper,
  ReactNodeViewRenderer,
  type ReactNodeViewProps,
} from "@tiptap/react";
import { mergeAttributes } from "@tiptap/core";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Maximize2,
  Trash2,
  Subtitles,
  RefreshCw,
  Loader2,
  Sliders,
} from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "sonner";

export function ImageNodeView({
  node,
  updateAttributes,
  deleteNode,
  selected,
}: ReactNodeViewProps) {
  const {
    src,
    alt = "",
    width = "100%",
    alignment = "center",
    caption = "",
  } = node.attrs;

  const [showToolbar, setShowToolbar] = useState(false);
  const [showSlider, setShowSlider] = useState(false);
  const [showCaptionInput, setShowCaptionInput] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // UploadThing para substituição direta de imagem
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      if (res?.[0]) {
        const fileUrl =
          (res[0] as { ufsUrl?: string; url?: string }).ufsUrl || res[0].url;
        if (fileUrl) {
          updateAttributes({ src: fileUrl });
          toast.success("Imagem substituída com sucesso!");
        }
      }
    },
    onUploadError: (error: Error) => {
      toast.error(`Falha ao substituir imagem: ${error.message}`);
    },
  });

  const handleReplaceFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Formato inválido. Selecione uma imagem.");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      toast.error("A imagem excede 4MB.");
      return;
    }

    toast.info("Enviando nova imagem...");
    await startUpload([file]);
    e.target.value = "";
  };

  const handleWidthChange = (newWidth: string) => {
    updateAttributes({ width: newWidth });
  };

  const handleAlignmentChange = (newAlign: "left" | "center" | "right" | "full") => {
    if (newAlign === "full") {
      updateAttributes({ alignment: "full", width: "100%" });
    } else {
      updateAttributes({ alignment: newAlign });
    }
  };

  const saveCaption = () => {
    updateAttributes({ caption: captionValue });
    setShowCaptionInput(false);
    toast.success("Legenda da imagem atualizada!");
  };

  // Classes de posicionamento para o wrapper dentro do editor
  let wrapperClass = "my-5 clear-both select-none relative group";
  let containerStyle: React.CSSProperties = {
    maxWidth: "100%",
    width: width || "100%",
  };

  if (alignment === "left") {
    wrapperClass = "float-left mr-6 mb-4 my-2 clear-left max-w-full select-none relative group";
  } else if (alignment === "right") {
    wrapperClass = "float-right ml-6 mb-4 my-2 clear-right max-w-full select-none relative group";
  } else if (alignment === "center") {
    wrapperClass = "my-6 flex flex-col items-center justify-center clear-both w-full select-none relative group";
  } else if (alignment === "full") {
    wrapperClass = "my-6 w-full clear-both select-none relative group";
    containerStyle.width = "100%";
  }

  const numericWidth = parseInt(String(width).replace("%", ""), 10) || 100;
  const isToolbarVisible = selected || showToolbar;

  return (
    <NodeViewWrapper
      className={wrapperClass}
      onMouseEnter={() => setShowToolbar(true)}
      onMouseLeave={() => {
        if (!selected) {
          setShowToolbar(false);
          setShowSlider(false);
        }
      }}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleReplaceFile}
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
      />

      {/* Floating Toolbar estilo WordPress */}
      <div
        className={`absolute -top-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 bg-slate-900/95 text-white px-2 py-1.5 rounded-xl shadow-xl backdrop-blur-xs border border-slate-700/60 transition-all duration-150 text-xs ${
          isToolbarVisible ? "opacity-100 pointer-events-auto scale-100" : "opacity-0 pointer-events-none scale-95"
        }`}
      >
        {/* Alinhamento */}
        <div className="flex items-center gap-0.5 pr-1 border-r border-slate-700">
          <button
            type="button"
            onClick={() => handleAlignmentChange("left")}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              alignment === "left"
                ? "bg-emerald-600 text-white font-bold"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
            title="Alinhar à Esquerda (texto contorna à direita)"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleAlignmentChange("center")}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              alignment === "center"
                ? "bg-emerald-600 text-white font-bold"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
            title="Centralizar (em bloco)"
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleAlignmentChange("right")}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              alignment === "right"
                ? "bg-emerald-600 text-white font-bold"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
            title="Alinhar à Direita (texto contorna à esquerda)"
          >
            <AlignRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleAlignmentChange("full")}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              alignment === "full"
                ? "bg-emerald-600 text-white font-bold"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
            title="Largura Total (100%)"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Dimensionamento / Presets de Tamanho */}
        <div className="flex items-center gap-1 px-1 border-r border-slate-700">
          {(["25%", "50%", "75%", "100%"] as const).map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => handleWidthChange(size)}
              className={`px-1.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                width === size && alignment !== "full"
                  ? "bg-emerald-600 text-white"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
              title={`Definir tamanho para ${size}`}
            >
              {size}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowSlider(!showSlider)}
            className={`p-1 rounded text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer ${
              showSlider ? "bg-slate-800 text-emerald-400" : ""
            }`}
            title="Ajuste fino de largura"
          >
            <Sliders className="w-3 h-3" />
          </button>
        </div>

        {/* Legenda (Caption) */}
        <button
          type="button"
          onClick={() => setShowCaptionInput(!showCaptionInput)}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
            caption || showCaptionInput
              ? "text-emerald-400 bg-slate-800"
              : "text-slate-300 hover:text-white hover:bg-slate-800"
          }`}
          title="Adicionar ou editar legenda"
        >
          <Subtitles className="w-3.5 h-3.5" />
        </button>

        {/* Substituir imagem */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          title="Trocar imagem mantendo configurações"
        >
          {isUploading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
          ) : (
            <RefreshCw className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Excluir imagem */}
        <button
          type="button"
          onClick={deleteNode}
          className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/60 transition-colors cursor-pointer ml-0.5"
          title="Remover imagem do texto"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Slider de ajuste fino (opcional quando aberto) */}
      {showSlider && (
        <div className="absolute -top-22 left-1/2 -translate-x-1/2 z-30 bg-slate-900/95 text-white px-3 py-2 rounded-xl shadow-xl border border-slate-700/60 flex items-center gap-3 text-xs">
          <span className="text-slate-400 text-[11px] whitespace-nowrap">Largura:</span>
          <input
            type="range"
            min={20}
            max={100}
            step={5}
            value={numericWidth}
            onChange={(e) => handleWidthChange(`${e.target.value}%`)}
            className="w-28 accent-emerald-500 cursor-pointer"
          />
          <span className="font-mono text-emerald-400 font-bold min-w-[36px]">{numericWidth}%</span>
        </div>
      )}

      {/* Container visual da imagem com largura calculada */}
      <div style={containerStyle} className="transition-all duration-200">
        <div
          className={`relative rounded-2xl overflow-hidden transition-all duration-150 ${
            selected
              ? "ring-3 ring-emerald-500 ring-offset-2 shadow-lg"
              : "hover:ring-2 hover:ring-emerald-400/50 shadow-sm"
          }`}
        >
          {isUploading && (
            <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white p-4">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-400 mb-2" />
              <p className="text-xs font-semibold">Substituindo imagem...</p>
            </div>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt || caption || "Imagem do post"}
            className="w-full h-auto object-cover rounded-2xl block"
          />

          {/* Tag de alinhamento atual no canto */}
          <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
            {alignment === "left" && "⬅ Esquerda"}
            {alignment === "center" && "⏺ Centro"}
            {alignment === "right" && "➡ Direita"}
            {alignment === "full" && "↔ Largura Total"}
            {" · "}
            {width}
          </div>
        </div>

        {/* Legenda (Exibição e Edição) */}
        {showCaptionInput ? (
          <div className="mt-2 flex items-center gap-1.5">
            <input
              type="text"
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
              placeholder="Digite a legenda da imagem (ex: Foto: BioSpin)"
              className="text-xs border border-emerald-400/80 rounded-lg px-2.5 py-1 w-full text-center bg-white shadow-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  saveCaption();
                }
              }}
            />
            <button
              type="button"
              onClick={saveCaption}
              className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
            >
              Salvar
            </button>
          </div>
        ) : caption ? (
          <figcaption
            onClick={() => setShowCaptionInput(true)}
            className="text-xs text-center text-slate-500 italic mt-2 cursor-pointer hover:text-emerald-700 transition-colors"
            title="Clique para editar a legenda"
          >
            {caption}
          </figcaption>
        ) : null}
      </div>
    </NodeViewWrapper>
  );
}

// Extensão personalizada do TipTap para Image com suporte a WordPress styling
export const CustomImage = TipTapImage.extend({
  name: "image",

  addAttributes() {
    return {
      ...this.parent?.(),
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      width: {
        default: "100%",
        parseHTML: (element) =>
          element.getAttribute("data-width") ||
          element.style.width ||
          element.getAttribute("width") ||
          "100%",
        renderHTML: (attributes) => ({
          "data-width": attributes.width || "100%",
        }),
      },
      alignment: {
        default: "center",
        parseHTML: (element) => {
          const dataAlign = element.getAttribute("data-alignment");
          if (dataAlign) return dataAlign;
          if (element.classList.contains("align-left")) return "left";
          if (element.classList.contains("align-right")) return "right";
          if (element.classList.contains("align-full")) return "full";
          return "center";
        },
        renderHTML: (attributes) => ({
          "data-alignment": attributes.alignment || "center",
        }),
      },
      caption: {
        default: "",
        parseHTML: (element) =>
          element.getAttribute("data-caption") ||
          element.getAttribute("title") ||
          "",
        renderHTML: (attributes) => ({
          "data-caption": attributes.caption || "",
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "figure.post-content-figure",
        getAttrs: (element) => {
          const el = element as HTMLElement;
          const img = el.querySelector("img");
          const figcaption = el.querySelector("figcaption");
          return {
            src: img?.getAttribute("src"),
            alt: img?.getAttribute("alt"),
            width:
              img?.getAttribute("data-width") ||
              img?.style.width ||
              el.style.width ||
              "100%",
            alignment:
              img?.getAttribute("data-alignment") ||
              (el.classList.contains("align-left")
                ? "left"
                : el.classList.contains("align-right")
                ? "right"
                : el.classList.contains("align-full")
                ? "full"
                : "center"),
            caption:
              figcaption?.textContent ||
              img?.getAttribute("data-caption") ||
              "",
          };
        },
      },
      {
        tag: "img[src]",
        getAttrs: (element) => {
          const el = element as HTMLElement;
          return {
            src: el.getAttribute("src"),
            alt: el.getAttribute("alt"),
            width:
              el.getAttribute("data-width") ||
              el.style.width ||
              el.getAttribute("width") ||
              "100%",
            alignment:
              el.getAttribute("data-alignment") ||
              (el.classList.contains("align-left")
                ? "left"
                : el.classList.contains("align-right")
                ? "right"
                : el.classList.contains("align-full")
                ? "full"
                : "center"),
            caption: el.getAttribute("data-caption") || "",
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }): any {
    const {
      alignment = "center",
      width = "100%",
      caption = "",
      style = "",
      class: className = "",
      src,
      alt,
      ...rest
    } = HTMLAttributes;

    let alignStyle = "display: block; margin: 1.5rem auto; clear: both;";
    let alignClass = "align-center";

    if (alignment === "left") {
      alignStyle = "float: left; margin: 0.5rem 1.75rem 1.25rem 0; clear: left;";
      alignClass = "align-left";
    } else if (alignment === "right") {
      alignStyle = "float: right; margin: 0.5rem 0 1.25rem 1.75rem; clear: right;";
      alignClass = "align-right";
    } else if (alignment === "full") {
      alignStyle = "display: block; width: 100%; margin: 2rem 0; clear: both;";
      alignClass = "align-full";
    }

    const widthStyle =
      width && width !== "100%"
        ? `width: ${width}; max-width: 100%;`
        : alignment === "full"
        ? "width: 100%;"
        : "max-width: 100%;";

    const computedStyle = `${alignStyle} ${widthStyle} ${style || ""}`.trim();
    const computedClass = `post-content-image ${alignClass} rounded-2xl shadow-sm ${className || ""}`.trim();

    const imgTag = [
      "img",
      mergeAttributes(rest, {
        src,
        alt: alt || caption || "",
        class: computedClass,
        style: computedStyle,
        "data-alignment": alignment,
        "data-width": width,
        "data-caption": caption || "",
      }),
    ];

    if (caption && String(caption).trim().length > 0) {
      return [
        "figure",
        {
          class: `post-content-figure ${alignClass} ${
            alignment === "full" ? "w-full my-6 clear-both" : "my-4"
          }`.trim(),
          style: `${alignStyle} ${widthStyle}`.trim(),
        },
        imgTag,
        [
          "figcaption",
          {
            class: "text-xs text-center text-slate-500 italic mt-2 block",
            style:
              "text-align: center; font-size: 0.85rem; color: #64748b; font-style: italic; margin-top: 0.5rem;",
          },
          caption,
        ],
      ];
    }

    return imgTag;
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView);
  },
});
