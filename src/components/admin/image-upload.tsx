"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { X, ImageIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string, key: string) => void;
  onRemove: () => void;
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  if (value) {
    return (
      <div className="relative w-full max-w-[460px] aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-xs bg-slate-50 group">
        <div className="absolute top-2.5 right-2.5 z-10">
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={onRemove}
            className="w-8 h-8 rounded-full shadow-md bg-red-600 hover:bg-red-700 text-white"
            title="Remover imagem"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <Image
          fill
          sizes="(max-width: 460px) 100vw, 460px"
          className="object-cover"
          alt="Imagem enviada"
          src={value}
        />
        <div className="absolute bottom-2 left-2 z-10 px-2.5 py-1 rounded-md bg-black/60 text-white text-[11px] font-medium backdrop-blur-xs flex items-center gap-1.5">
          <ImageIcon className="w-3 h-3" />
          <span>Imagem Carregada</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[460px]">
      <UploadDropzone
        endpoint="imageUploader"
        appearance={{
          container:
            "border-2 border-dashed border-slate-300 hover:border-primary/50 bg-slate-50/80 hover:bg-slate-50 transition-all rounded-2xl p-6 text-center cursor-pointer min-h-[190px] flex flex-col items-center justify-center",
          uploadIcon: "text-primary/70 w-10 h-10 mb-1",
          label:
            "text-sm font-semibold text-slate-700 hover:text-primary transition-colors cursor-pointer",
          allowedContent: "text-xs text-slate-500 mt-1 font-medium",
          button:
            "bg-primary hover:bg-primary/90 text-white font-semibold text-xs px-6 py-2.5 rounded-full shadow-xs transition-all cursor-pointer mt-3 focus:ring-2 focus:ring-primary/20",
        }}
        content={{
          label: "Clique para selecionar ou arraste uma imagem",
          allowedContent: "Formatos suportados: PNG, JPG, WEBP (até 4MB)",
          button({ ready, isUploading }) {
            if (isUploading) return "Enviando arquivo...";
            if (ready) return "Selecionar Arquivo";
            return "Carregando...";
          },
        }}
        onClientUploadComplete={(res) => {
          if (res?.[0]) {
            const fileUrl =
              (res[0] as { ufsUrl?: string; url?: string }).ufsUrl ||
              res[0].url;
            onChange(fileUrl || "", res[0].key);
            toast.success("Upload concluído com sucesso!");
          }
        }}
        onUploadError={(error: Error) => {
          toast.error(`Erro no upload: ${error.message}`);
        }}
      />
    </div>
  );
}
