import { db } from "@/lib/db";
import {
  ShieldCheck,
  Mail,
  Building2,
  Globe,
  User,
  AlertTriangle,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contatos Recebidos | Painel BioSpin",
};

type ContactSubmissionRow = Awaited<
  ReturnType<typeof db.contactSubmission.findMany>
>[number];

export default async function ContatosAdminPage() {
  let submissions: ContactSubmissionRow[] = [];
  let loadError = false;

  try {
    submissions = await db.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Erro ao consultar contatos recebidos:", error);
    loadError = true;
  }

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Contatos Recebidos
        </h1>
        <p className="text-slate-600 mt-1">
          Formulários enviados pelo site. Total:{" "}
          <strong>{loadError ? "—" : submissions.length}</strong>
        </p>
      </div>

      {loadError ? (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-amber-900 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-sm">
            <p className="font-semibold">
              Não foi possível carregar os contatos neste ambiente.
            </p>
            <p className="text-amber-800/90">
              Verifique se as migrações pendentes do Prisma foram aplicadas no
              banco de dados de produção para criar a tabela de submissões de
              contato.
            </p>
          </div>
        </div>
      ) : submissions.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">
          <Mail className="w-10 h-10 mx-auto mb-3 text-slate-300" />
          <p className="font-medium">Nenhum contato recebido ainda.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80">
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" /> Nome
                    </div>
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" /> E-mail
                    </div>
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" /> Empresa / Inst.
                    </div>
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">
                    Assunto
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" /> Origem
                    </div>
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-slate-600 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" /> LGPD
                    </div>
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 whitespace-nowrap">
                    Recebido em
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {submissions.map((s) => (
                  <tr
                    key={s.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">
                      {s.name}
                      {s.phone && (
                        <div className="text-xs text-slate-400 font-normal mt-0.5">
                          {s.phone}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      <a
                        href={`mailto:${s.email}`}
                        className="hover:text-primary underline underline-offset-2"
                      >
                        {s.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                      {s.company || s.institution || (
                        <span className="text-slate-300">—</span>
                      )}
                      {(s.role || s.segment) && (
                        <div className="text-xs text-slate-400 mt-0.5">
                          {[s.role, s.segment].filter(Boolean).join(" · ")}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {s.subject}
                      </span>
                      {s.requestQuote && (
                        <div className="text-xs text-amber-600 font-medium mt-1">
                          Solicita orçamento
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500 font-mono whitespace-nowrap">
                      {s.origin || <span className="text-slate-300">—</span>}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {s.consentLGPD ? (
                        <span
                          title={`Aceito em ${formatDate(s.consentAt)}`}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                        >
                          <ShieldCheck className="w-3 h-3" /> Sim
                        </span>
                      ) : (
                        <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-200/60">
                          Não
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
                      {formatDate(s.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-100 p-4">
            <p className="text-xs text-slate-400">
              Clique no e-mail para abrir o cliente de e-mail.
            </p>
          </div>
        </div>
      )}

      {/* Messages section */}
      {!loadError && submissions.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">
            Mensagens Completas
          </h2>
          {submissions.map((s) => (
            <details
              key={`msg-${s.id}`}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs group"
            >
              <summary className="px-5 py-3 cursor-pointer flex items-center justify-between hover:bg-slate-50 transition-colors list-none">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-slate-900 text-sm">
                    {s.name}
                  </span>
                  <span className="text-xs text-slate-400">{s.email}</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                    {s.subject}
                  </span>
                </div>
                <span className="text-xs text-slate-400">
                  {formatDate(s.createdAt)}
                </span>
              </summary>
              <div className="px-5 pb-5 pt-2 border-t border-slate-100">
                <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {s.message}
                </p>
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
