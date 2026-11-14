import { db } from "@/lib/db";
import { AlertTriangle } from "lucide-react";
import { ContatosClient } from "./components/contatos-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contatos Recebidos | Painel BioSpin",
};

export default async function ContatosAdminPage() {
  let submissions: Awaited<ReturnType<typeof db.contactSubmission.findMany>> = [];
  let loadError = false;

  try {
    submissions = await db.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Erro ao consultar contatos recebidos:", error);
    loadError = true;
  }

  if (loadError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Contatos Recebidos
          </h1>
          <p className="text-slate-600 mt-1">
            Gestão de envios e formulários recebidos pelo site.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-amber-900 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-sm">
            <p className="font-semibold">
              Não foi possível carregar os contatos neste ambiente.
            </p>
            <p className="text-amber-800/90">
              Verifique se o banco de dados está acessível e se as migrações do Prisma
              estão atualizadas.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <ContatosClient initialSubmissions={submissions} />;
}
