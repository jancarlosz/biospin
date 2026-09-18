import { z } from "zod";
import { Status } from "@prisma/client";

export const postSchema = z.object({
  title: z.string().min(2, "O título deve ter no mínimo 2 caracteres").max(100),
  slug: z.string().min(2, "O slug deve ter no mínimo 2 caracteres").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug inválido"),
  excerpt: z.string().min(10, "O resumo deve ter no mínimo 10 caracteres").max(255).optional().nullable(),
  content: z.string().min(10, "O conteúdo deve ter no mínimo 10 caracteres"),
  coverImageUrl: z.string().url("A imagem de capa é inválida").optional().nullable(),
  coverImageKey: z.string().optional().nullable(),
  status: z.nativeEnum(Status),
  categoryId: z.string().min(1, "Selecione uma categoria"),
  seoTitle: z.string().max(70).optional().nullable(),
  seoDescription: z.string().max(160).optional().nullable(),
});

export type PostInput = z.infer<typeof postSchema>;
