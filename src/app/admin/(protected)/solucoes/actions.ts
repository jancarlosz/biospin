"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { solutionSchema, type SolutionInput } from "@/lib/validations/solution";
import { UTApi } from "uploadthing/server";
import { Prisma } from "@prisma/client";

const utapi = new UTApi();

export async function createSolution(data: SolutionInput) {
  const session = await auth();
  if (!session?.user) {
    return { error: "Não autorizado" };
  }

  const parsed = solutionSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Dados inválidos", details: parsed.error.format() };
  }

  try {
    const existing = await db.solution.findUnique({
      where: { slug: parsed.data.slug },
    });

    if (existing) {
      return { error: "Já existe uma solução com este slug." };
    }

    const isPublishing = parsed.data.status === "PUBLISHED";
    const solution = await db.solution.create({
      data: {
        ...parsed.data,
        highlights: parsed.data.highlights ? (parsed.data.highlights as Prisma.InputJsonValue) : Prisma.JsonNull,
        features: parsed.data.features ? (parsed.data.features as Prisma.InputJsonValue) : Prisma.JsonNull,
        benefits: parsed.data.benefits ? (parsed.data.benefits as Prisma.InputJsonValue) : Prisma.JsonNull,
        audience: parsed.data.audience ? (parsed.data.audience as Prisma.InputJsonValue) : Prisma.JsonNull,
        publishedAt: isPublishing ? new Date() : null,
      },
    });

    revalidatePath("/admin/solucoes");
    revalidatePath("/solucoes");
    revalidatePath("/");
    return { success: true, solution };
  } catch (error) {
    console.error("Erro ao criar solução:", error);
    return { error: "Ocorreu um erro ao criar a solução." };
  }
}

export async function updateSolution(id: string, data: SolutionInput) {
  const session = await auth();
  if (!session?.user) {
    return { error: "Não autorizado" };
  }

  const parsed = solutionSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Dados inválidos", details: parsed.error.format() };
  }

  try {
    const existingSlug = await db.solution.findUnique({
      where: { slug: parsed.data.slug },
    });

    if (existingSlug && existingSlug.id !== id) {
      return { error: "Já existe outra solução com este slug." };
    }

    const existingSolution = await db.solution.findUnique({ where: { id } });
    if (!existingSolution) {
      return { error: "Solução não encontrada." };
    }

    const isPublishing = parsed.data.status === "PUBLISHED";
    const publishedAt = isPublishing
      ? existingSolution.publishedAt || new Date()
      : null;

    const solution = await db.solution.update({
      where: { id },
      data: {
        ...parsed.data,
        highlights: parsed.data.highlights ? (parsed.data.highlights as Prisma.InputJsonValue) : Prisma.JsonNull,
        features: parsed.data.features ? (parsed.data.features as Prisma.InputJsonValue) : Prisma.JsonNull,
        benefits: parsed.data.benefits ? (parsed.data.benefits as Prisma.InputJsonValue) : Prisma.JsonNull,
        audience: parsed.data.audience ? (parsed.data.audience as Prisma.InputJsonValue) : Prisma.JsonNull,
        publishedAt,
      },
    });

    revalidatePath("/admin/solucoes");
    revalidatePath("/solucoes");
    revalidatePath(`/solucoes/${solution.slug}`);
    revalidatePath("/");
    return { success: true, solution };
  } catch (error) {
    console.error("Erro ao atualizar solução:", error);
    return { error: "Ocorreu um erro ao atualizar a solução." };
  }
}

export async function deleteSolution(id: string) {
  const session = await auth();
  if (!session?.user) {
    return { error: "Não autorizado" };
  }

  try {
    const solution = await db.solution.findUnique({ where: { id } });
    if (!solution) {
      return { error: "Solução não encontrada." };
    }

    await db.solution.delete({
      where: { id },
    });

    // Best-effort external cleanup
    if (solution.imageKey) {
      try {
        await utapi.deleteFiles(solution.imageKey);
      } catch (uploadThingError) {
        console.error("Falha ao deletar arquivo no UploadThing (best-effort):", uploadThingError);
      }
    }

    revalidatePath("/admin/solucoes");
    revalidatePath("/solucoes");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir solução:", error);
    return { error: "Ocorreu um erro ao excluir a solução." };
  }
}
