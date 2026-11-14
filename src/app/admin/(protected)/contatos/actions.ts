"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function deleteContactSubmission(id: string) {
  const session = await auth();
  if (!session?.user) {
    return { error: "Não autorizado" };
  }

  try {
    await db.contactSubmission.delete({
      where: { id },
    });

    revalidatePath("/admin/contatos");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir contato:", error);
    return { error: "Não foi possível excluir o contato." };
  }
}

