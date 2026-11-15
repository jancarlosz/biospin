"use client";

import { useRef, useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { UploadCloud, X, Loader2, ImageIcon, RefreshCw } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string, key: string) => void;
  onRemove: () => void;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  className = "",
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onUploadProgress: (p) => {
      setProgress(p);
    },
    onClientUploadComplete: (res) => {
      if (res?.[0]) {
        const fileUrl =
          (res[0] as { ufsUrl?: string; url?: string }).ufsUrl || res[0].url;
        const key = res[0].key;
        onChange(fileUrl || "", key);
        toast.success("Imagem enviada com sucesso!");
      }
      setProgress(0);
    },
    onUploadError: (error: Error) => {
      toast.error(`Falha no upload: ${error.message}`);
      setProgress(0);
    },
  });

  const handleFiles = async (files: FileList | File[]) => {
    const file = files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Formato inválido. Por favor, selecione uma imagem (PNG, JPG, WEBP ou GIF).");
      return;
    }

    const maxBytes = 4 * 1024 * 1024;
    if (file.size > maxBytes) {
      toast.error("O arquivo excede o limite máximo permitido de 4MB.");
      return;
    }

    try {
      await startUpload([file]);
    } catch {
      toast.error("Ocorreu um erro ao iniciar o envio da imagem.");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (isUploading) return;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isUploading) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleClick = () => {
    if (isUploading) return;
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
      // Limpa para permitir selecionar o mesmo arquivo novamente se necessário
      e.target.value = "";
    }
  };

  // Se já há imagem carregada
  if (value) {
    return (
      <div className={`w-full max-w-[460px] ${className}`}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          accept="image/png,image/jpeg,image/webp,image/gif"
          className="hidden"
          disabled={isUploading}
        />
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs bg-slate-50 group">
          {isUploading && (
            <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white p-4">
              <Loader2 className="w-8 h-8 animate-spin mb-2 text-emerald-400" />
              <p className="text-xs font-semibold">Atualizando imagem... {progress}%</p>
            </div>
          )}

          <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleClick}
              disabled={isUploading}
              className="h-8 px-2.5 rounded-full shadow-md bg-white/95 hover:bg-white text-slate-700 text-xs font-medium cursor-pointer"
              title="Trocar imagem"
            >
              <RefreshCw className="h-3.5 w-3.5 mr-1" />
              <span>Trocar</span>
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={onRemove}
              disabled={isUploading}
              className="w-8 h-8 rounded-full shadow-md bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              title="Remover imagem"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <Image
            fill
            sizes="(max-width: 460px) 100vw, 460px"
            className="object-cover"
            alt="Imagem selecionada"
            src={value}
          />

          <div className="absolute bottom-2.5 left-2.5 z-10 px-2.5 py-1 rounded-md bg-black/65 text-white text-[11px] font-medium backdrop-blur-xs flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span>Imagem Ativa</span>
          </div>
        </div>
      </div>
    );
  }

  // Se estiver enviando imagem pela primeira vez
  if (isUploading) {
    return (
      <div className={`w-full max-w-[460px] ${className}`}>
        <div className="border-2 border-dashed border-emerald-500/60 bg-emerald-50/40 rounded-2xl p-6 text-center min-h-[190px] flex flex-col items-center justify-center animate-pulse">
          <Loader2 className="w-9 h-9 text-emerald-600 animate-spin mb-3" />
          <p className="text-sm font-semibold text-slate-800">Enviando imagem...</p>
          <div className="w-48 h-2 bg-slate-200 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
              style={{ width: `${Math.max(progress, 15)}%` }}
            />
          </div>
          <span className="text-xs text-slate-600 font-medium mt-2">
            {progress > 0 ? `${progress}% enviado` : "Iniciando upload..."}
          </span>
        </div>
      </div>
    );
  }

  // Estado padrão (pronto para seleção / arraste)
  return (
    <div className={`w-full max-w-[460px] ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        disabled={isUploading}
      />

      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        className={`group border-2 border-dashed transition-all rounded-2xl p-6 text-center cursor-pointer min-h-[190px] flex flex-col items-center justify-center select-none ${
          isDragging
            ? "border-emerald-600 bg-emerald-50/60 scale-[1.01]"
            : "border-slate-300 hover:border-emerald-600/70 bg-slate-50/70 hover:bg-slate-50"
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-emerald-100/70 text-emerald-700 flex items-center justify-center mb-3 transition-transform group-hover:scale-105 group-hover:bg-emerald-100">
          <UploadCloud className="w-6 h-6" />
        </div>

        <p className="text-sm font-semibold text-slate-700 group-hover:text-emerald-700 transition-colors">
          Clique para selecionar ou arraste uma imagem
        </p>

        <p className="text-xs text-slate-500 mt-1 font-medium">
          Formatos: PNG, JPG, WEBP ou GIF (máx. 4MB)
        </p>

        <div className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all">
          <span>Selecionar do computador</span>
        </div>
      </div>
    </div>
  );
}
