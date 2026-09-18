import { db } from "@/lib/db";
import { SolutionClient } from "./components/solution-client";

export const metadata = {
  title: "Soluções | Admin",
};

export default async function SolucoesPage() {
  const solutions = await db.solution.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <SolutionClient solutions={solutions} />
    </div>
  );
}
