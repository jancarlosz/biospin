import { db } from "@/lib/db";
import { CategoryClient } from "./components/category-client";

export const metadata = {
  title: "Categorias | Admin",
};

export default async function CategoriasPage() {
  const categories = await db.category.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <CategoryClient categories={categories} />
    </div>
  );
}
