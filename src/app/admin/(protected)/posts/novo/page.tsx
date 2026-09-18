import { db } from "@/lib/db";
import { PostForm } from "../components/post-form";

export const metadata = {
  title: "Novo Post | Admin",
};

export default async function NovoPostPage() {
  const categories = await db.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Criar Post</h2>
      </div>
      <div className="bg-white p-6 rounded-md border">
        <PostForm categories={categories} />
      </div>
    </div>
  );
}
