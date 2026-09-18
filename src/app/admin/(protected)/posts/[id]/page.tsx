import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PostForm } from "../components/post-form";

export const metadata = {
  title: "Editar Post | Admin",
};

interface EditarPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditarPostPage({ params }: EditarPostPageProps) {
  const resolvedParams = await params;
  
  const [post, categories] = await Promise.all([
    db.post.findUnique({
      where: { id: resolvedParams.id },
    }),
    db.category.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Editar Post</h2>
      </div>
      <div className="bg-white p-6 rounded-md border">
        <PostForm initialData={post} categories={categories} />
      </div>
    </div>
  );
}
