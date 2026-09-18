"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { postSchema, type PostInput } from "@/lib/validations/post";
import { createPost, updatePost } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { ImageUpload } from "@/components/admin/image-upload";
import { Status } from "@prisma/client";
import { RefreshCw } from "lucide-react";

type PostFormProps = {
  initialData?: (PostInput & { id: string }) | null;
  categories: { id: string; name: string }[];
};

export function PostForm({ initialData, categories }: PostFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<PostInput>({
    resolver: zodResolver(postSchema),
    defaultValues: initialData || { 
      title: "", 
      slug: "", 
      excerpt: "", 
      content: "",
      status: Status.DRAFT,
      categoryId: "",
      seoTitle: "",
      seoDescription: ""
    },
  });

  const generateSlug = (value: string) => {
    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue("title", value, { shouldValidate: true });
    // Atualiza o slug automaticamente conforme o título da publicação
    setValue("slug", generateSlug(value), { shouldValidate: true });
  };

  const onSubmit = async (data: PostInput) => {
    setIsLoading(true);
    try {
      if (initialData) {
        const res = await updatePost(initialData.id, data);
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success("Post atualizado com sucesso!");
          router.push("/admin/posts");
        }
      } else {
        const res = await createPost(data);
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success("Post criado com sucesso!");
          router.push("/admin/posts");
        }
      }
    } catch {
      toast.error("Ocorreu um erro inesperado.");
    } finally {
      setIsLoading(false);
    }
  };

  const currentCategoryId = watch("categoryId");
  const currentStatus = watch("status");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Título do Post</Label>
          <Input
            id="title"
            placeholder="Ex: Os benefícios da nanotecnologia"
            {...register("title")}
            onChange={handleTitleChange}
            disabled={isLoading}
          />
          {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="slug">Slug (URL)</Label>
            <button
              type="button"
              onClick={() => {
                const titleVal = watch("title");
                if (titleVal) {
                  setValue("slug", generateSlug(titleVal), { shouldValidate: true });
                  toast.info("Slug atualizado com base no título!");
                }
              }}
              className="text-xs text-blue-600 hover:text-blue-800 transition-colors font-medium flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Sincronizar com título</span>
            </button>
          </div>
          <Input
            id="slug"
            placeholder="ex: os-beneficios-da-nanotecnologia"
            {...register("slug")}
            disabled={isLoading}
          />
          {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Categoria</Label>
          <Select
            disabled={isLoading}
            value={currentCategoryId}
            onValueChange={(value) => {
              if (value) setValue("categoryId", value, { shouldValidate: true });
            }}
          >
            <SelectTrigger className="w-full h-10">
              <SelectValue placeholder="Selecione uma categoria">
                {(val) => {
                  const selected = categories.find((c) => c.id === val);
                  return selected ? selected.name : "Selecione uma categoria";
                }}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.categoryId && <p className="text-sm text-red-500">{errors.categoryId.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            disabled={isLoading}
            value={currentStatus}
            onValueChange={(value) => {
              if (value) setValue("status", value as Status, { shouldValidate: true });
            }}
          >
            <SelectTrigger className="w-full h-10">
              <SelectValue placeholder="Selecione um status">
                {(val) => {
                  if (val === Status.PUBLISHED || val === "PUBLISHED") return "Publicado";
                  if (val === Status.DRAFT || val === "DRAFT") return "Rascunho";
                  return "Selecione um status";
                }}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Status.DRAFT}>Rascunho</SelectItem>
              <SelectItem value={Status.PUBLISHED}>Publicado</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Resumo (opcional)</Label>
        <Textarea
          id="excerpt"
          placeholder="Um breve texto que vai aparecer no card do post."
          {...register("excerpt")}
          disabled={isLoading}
        />
        {errors.excerpt && <p className="text-sm text-red-500">{errors.excerpt.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Imagem de Capa (opcional)</Label>
        <ImageUpload
          value={watch("coverImageUrl")}
          onChange={(url, key) => {
            setValue("coverImageUrl", url, { shouldValidate: true });
            setValue("coverImageKey", key);
          }}
          onRemove={() => {
            setValue("coverImageUrl", null);
            setValue("coverImageKey", null);
          }}
        />
        {errors.coverImageUrl && <p className="text-sm text-red-500">{errors.coverImageUrl.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Conteúdo do Post</Label>
        <RichTextEditor
          value={watch("content")}
          onChange={(val) => setValue("content", val, { shouldValidate: true })}
          disabled={isLoading}
        />
        {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
      </div>

      <div className="border-t pt-6 mt-8">
        <h3 className="text-lg font-medium mb-4">Otimização SEO (opcional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="seoTitle">Título SEO</Label>
            <Input
              id="seoTitle"
              placeholder="Ex: Nanotecnologia na Saúde: Benefícios"
              {...register("seoTitle")}
              disabled={isLoading}
            />
            {errors.seoTitle && <p className="text-sm text-red-500">{errors.seoTitle.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="seoDescription">Descrição SEO</Label>
            <Textarea
              id="seoDescription"
              placeholder="Uma descrição otimizada de até 160 caracteres."
              {...register("seoDescription")}
              disabled={isLoading}
            />
            {errors.seoDescription && <p className="text-sm text-red-500">{errors.seoDescription.message}</p>}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/posts")}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Salvando..." : initialData ? "Atualizar Post" : "Criar Post"}
        </Button>
      </div>
    </form>
  );
}
