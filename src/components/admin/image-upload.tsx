"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
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
      <div className="relative w-full max-w-[400px] aspect-video rounded-md overflow-hidden border">
        <div className="absolute top-2 right-2 z-10">
          <Button type="button" variant="destructive" size="icon" onClick={onRemove}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <Image
          fill
          sizes="(max-width: 400px) 100vw, 400px"
          className="object-cover"
          alt="Imagem enviada"
          src={value}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[400px]">
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res?.[0]) {
            // Usa ufsUrl (novo padrão do uploadthing) com fallback para url
            const fileUrl = (res[0] as any).ufsUrl || res[0].url;
            onChange(fileUrl, res[0].key);
            toast.success("Upload concluído!");
          }
        }}
        onUploadError={(error: Error) => {
          toast.error(`Erro no upload: ${error.message}`);
        }}
      />
    </div>
  );
}
