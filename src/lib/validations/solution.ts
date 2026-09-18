import { z } from "zod";
import { Status } from "@prisma/client";

export const solutionSchema = z.object({
  name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres"),
  slug: z
    .string()
    .min(2, "O slug deve ter no mínimo 2 caracteres")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug inválido (apenas letras minúsculas, números e hífens)"),
  summary: z.string().min(10, "O resumo deve ter no mínimo 10 caracteres").max(255, "Máximo de 255 caracteres"),
  content: z.string().min(10, "O conteúdo detalhado deve ter no mínimo 10 caracteres"),
  imageUrl: z.string().url("A URL da imagem é inválida").nullable().optional(),
  imageKey: z.string().nullable().optional(),
  status: z.nativeEnum(Status),
  seoTitle: z.string().nullable().optional(),
  seoDescription: z.string().nullable().optional(),
  
  // Campos estruturados opcionais para layout premium
  badge: z.string().nullable().optional(),
  subtitle: z.string().nullable().optional(),
  heroCta: z.string().nullable().optional(),
  stage: z.string().nullable().optional(),
  targetAudience: z.string().nullable().optional(),
  problemTitle: z.string().nullable().optional(),
  problemDescription: z.string().nullable().optional(),
  highlights: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .nullable()
    .optional(),
  features: z
    .array(
      z.object({
        title: z.string(),
        items: z.array(z.string()),
      })
    )
    .nullable()
    .optional(),
  benefits: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .nullable()
    .optional(),
  audience: z.array(z.string()).nullable().optional(),
  audienceDescription: z.string().nullable().optional(),
  ctaTitle: z.string().nullable().optional(),
  ctaDescription: z.string().nullable().optional(),
});

export type SolutionInput = z.infer<typeof solutionSchema>;
