import { SolutionForm } from "../components/solution-form";

export const metadata = {
  title: "Nova Solução | Admin",
};

export default function NovaSolucaoPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Criar Solução</h2>
      </div>
      <div className="bg-white p-6 rounded-md border">
        <SolutionForm />
      </div>
    </div>
  );
}
