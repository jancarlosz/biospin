"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { categorySchema, type CategoryInput } from "@/lib/validations/category";

export async function createCategory(data: CategoryInput) {
  const session = await auth();
  if (!session?.user) {
    return { error: "Não autorizado" };
  }

  const parsed = categorySchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Dados inválidos" };
  }

  try {
    const existing = await db.category.findUnique({
      where: { slug: parsed.data.slug },
    });

    if (existing) {
      return { error: "Já existe uma categoria com este slug." };
    }

    const category = await db.category.create({
      data: parsed.data,
    });

    revalidatePath("/admin/categorias");
    return { success: true, category };
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    return { error: "Ocorreu um erro ao criar a categoria." };
  }
}

export async function updateCategory(id: string, data: CategoryInput) {
  const session = await auth();
  if (!session?.user) {
    return { error: "Não autorizado" };
  }

  const parsed = categorySchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Dados inválidos" };
  }

  try {
    const existing = await db.category.findUnique({
      where: { slug: parsed.data.slug },
    });

    if (existing && existing.id !== id) {
      return { error: "Já existe outra categoria com este slug." };
    }

    const category = await db.category.update({
      where: { id },
      data: parsed.data,
    });

    revalidatePath("/admin/categorias");
    return { success: true, category };
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error);
    return { error: "Ocorreu um erro ao atualizar a categoria." };
  }
}

export async function deleteCategory(id: string) {
  const session = await auth();
  if (!session?.user) {
    return { error: "Não autorizado" };
  }

  try {
    // Check if category is being used
    const postsCount = await db.post.count({
      where: { categoryId: id },
    });

    if (postsCount > 0) {
      return { error: "Não é possível excluir esta categoria pois existem posts associados a ela." };
    }

    await db.category.delete({
      where: { id },
    });

    revalidatePath("/admin/categorias");
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar categoria:", error);
    return { error: "Ocorreu um erro ao excluir a categoria." };
  }
}
