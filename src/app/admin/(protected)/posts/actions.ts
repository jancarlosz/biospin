"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { postSchema, type PostInput } from "@/lib/validations/post";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function createPost(data: PostInput) {
  const session = await auth();
  if (!session?.user) {
    return { error: "Não autorizado" };
  }

  const parsed = postSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Dados inválidos" };
  }

  try {
    const existing = await db.post.findUnique({
      where: { slug: parsed.data.slug },
    });

    if (existing) {
      return { error: "Já existe um post com este slug." };
    }

    const isPublishing = parsed.data.status === "PUBLISHED";
    const post = await db.post.create({
      data: {
        ...parsed.data,
        publishedAt: isPublishing ? new Date() : null,
      },
    });

    revalidatePath("/admin/posts");
    return { success: true, post };
  } catch (error) {
    console.error("Erro ao criar post:", error);
    return { error: "Ocorreu um erro ao criar o post." };
  }
}

export async function updatePost(id: string, data: PostInput) {
  const session = await auth();
  if (!session?.user) {
    return { error: "Não autorizado" };
  }

  const parsed = postSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Dados inválidos" };
  }

  try {
    const existingSlug = await db.post.findUnique({
      where: { slug: parsed.data.slug },
    });

    if (existingSlug && existingSlug.id !== id) {
      return { error: "Já existe outro post com este slug." };
    }

    const existingPost = await db.post.findUnique({ where: { id } });
    if (!existingPost) {
      return { error: "Post não encontrado." };
    }

    const isPublishingNow = parsed.data.status === "PUBLISHED" && existingPost.status !== "PUBLISHED";

    const post = await db.post.update({
      where: { id },
      data: {
        ...parsed.data,
        ...(isPublishingNow && { publishedAt: new Date() }),
      },
    });

    revalidatePath("/admin/posts");
    return { success: true, post };
  } catch (error) {
    console.error("Erro ao atualizar post:", error);
    return { error: "Ocorreu um erro ao atualizar o post." };
  }
}

export async function deletePost(id: string) {
  const session = await auth();
  if (!session?.user) {
    return { error: "Não autorizado" };
  }

  try {
    const post = await db.post.findUnique({ where: { id } });
    if (!post) {
      return { error: "Post não encontrado." };
    }

    await db.post.delete({
      where: { id },
    });

    // Best-effort external cleanup
    if (post.coverImageKey) {
      try {
        await utapi.deleteFiles(post.coverImageKey);
      } catch (e) {
        console.error("Falha ao deletar arquivo (best-effort):", e);
      }
    }

    revalidatePath("/admin/posts");
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar post:", error);
    return { error: "Ocorreu um erro ao excluir o post." };
  }
}
