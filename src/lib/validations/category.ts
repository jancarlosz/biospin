import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "O nome da categoria deve ter no mínimo 2 caracteres").max(50, "Máximo de 50 caracteres"),
  slug: z.string().min(2, "O slug deve ter no mínimo 2 caracteres").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug inválido (apenas letras minúsculas, números e hifens)"),
});

export type CategoryInput = z.infer<typeof categorySchema>;
