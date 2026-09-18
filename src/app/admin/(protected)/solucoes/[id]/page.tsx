import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { SolutionForm } from "../components/solution-form";

export const metadata = {
  title: "Editar Solução | Admin",
};

interface EditarSolucaoPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditarSolucaoPage({ params }: EditarSolucaoPageProps) {
  const resolvedParams = await params;
  const solution = await db.solution.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!solution) {
    notFound();
  }

  const initialData = {
    ...solution,
    highlights: Array.isArray(solution.highlights) ? (solution.highlights as Array<{ value: string; label: string }>) : null,
    features: Array.isArray(solution.features) ? (solution.features as Array<{ title: string; items: string[] }>) : null,
    benefits: Array.isArray(solution.benefits) ? (solution.benefits as Array<{ title: string; description: string }>) : null,
    audience: Array.isArray(solution.audience) ? (solution.audience as string[]) : null,
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Editar Solução</h2>
      </div>
      <div className="bg-white p-6 rounded-md border">
        <SolutionForm initialData={initialData} />
      </div>
    </div>
  );
}
