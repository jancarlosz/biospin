"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { categorySchema, type CategoryInput } from "@/lib/validations/category";
import { createCategory, updateCategory } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CategoryFormProps = {
  initialData?: { id: string; name: string; slug: string } | null;
  onSuccess?: () => void;
};

export function CategoryForm({ initialData, onSuccess }: CategoryFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || { name: "", slug: "" },
  });

  // Auto-generate slug from name if not editing
  const generateSlug = (value: string) => {
    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue("name", value);
    if (!initialData) {
      setValue("slug", generateSlug(value), { shouldValidate: true });
    }
  };

  const onSubmit = async (data: CategoryInput) => {
    setIsLoading(true);
    try {
      if (initialData) {
        const res = await updateCategory(initialData.id, data);
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success("Categoria atualizada com sucesso!");
          onSuccess?.();
        }
      } else {
        const res = await createCategory(data);
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success("Categoria criada com sucesso!");
          onSuccess?.();
        }
      }
    } catch (error) {
      toast.error("Ocorreu um erro inesperado.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome da Categoria</Label>
        <Input
          id="name"
          placeholder="Ex: Nanotecnologia"
          {...register("name")}
          onChange={handleNameChange}
          disabled={isLoading}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug (URL)</Label>
        <Input
          id="slug"
          placeholder="ex: nanotecnologia"
          {...register("slug")}
          disabled={isLoading}
        />
        {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Salvando..." : initialData ? "Atualizar Categoria" : "Criar Categoria"}
      </Button>
    </form>
  );
}
