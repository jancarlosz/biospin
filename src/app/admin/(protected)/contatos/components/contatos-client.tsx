"use client";

import { useState, useMemo } from "react";
import { ContactSubmission } from "@prisma/client";
import { toast } from "sonner";
import Link from "next/link";
import {
  User,
  Mail,
  Building2,
  Layers,
  Globe,
  ShieldCheck,
  MessageSquare,
  ExternalLink,
  Trash2,
  Copy,
  Check,
  Search,
  ChevronDown,
  ChevronUp,
  FileText,
  BadgeAlert,
  Send,
  SlidersHorizontal,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { deleteContactSubmission } from "../actions";

interface ContatosClientProps {
  initialSubmissions: ContactSubmission[];
}

function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function formatRelative(date: Date | string) {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return "Há poucos minutos";
  if (diffHours < 24) return `Há ${diffHours}h atrás`;
  if (diffDays === 1) return "Ontem";
  if (diffDays < 7) return `Há ${diffDays} dias`;
  return formatDate(date);
}

function getWhatsAppUrl(phone?: string | null) {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 8) return null;
  const fullNumber = digits.length <= 11 ? `55${digits}` : digits;
  return `https://wa.me/${fullNumber}`;
}

function getOriginInfo(origin?: string | null) {
  if (!origin) {
    return {
      label: "Contato Geral",
      category: "contato",
      badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
      path: "/contato",
    };
  }
  if (origin.includes("nanofiberdressing")) {
    return {
      label: "Nanofiberdressing",
      category: "nanofiberdressing",
      badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      path: "/solucoes/nanofiberdressing",
    };
  }
  if (origin.includes("oncomatrix")) {
    return {
      label: "OncoMatrix",
      category: "oncomatrix",
      badgeClass: "bg-purple-50 text-purple-700 border-purple-200",
      path: "/solucoes/oncomatrix",
    };
  }
  if (origin.includes("tecnologia")) {
    return {
      label: "Tecnologia / P&D",
      category: "tecnologia",
      badgeClass: "bg-cyan-50 text-cyan-700 border-cyan-200",
      path: "/tecnologia",
    };
  }
  if (origin.includes("contato")) {
    return {
      label: "Fale Conosco",
      category: "contato",
      badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
      path: "/contato",
    };
  }
  return {
    label: origin,
    category: "outro",
    badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
    path: origin,
  };
}

export function ContatosClient({ initialSubmissions }: ContatosClientProps) {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>(initialSubmissions);
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("todos");
  const [expandedId, setExpandedId] = useState<string | null>(
    initialSubmissions.length > 0 ? initialSubmissions[0].id : null
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Counts for filters
  const counts = useMemo(() => {
    const res = {
      todos: submissions.length,
      contato: 0,
      nanofiberdressing: 0,
      oncomatrix: 0,
      tecnologia: 0,
      quote: 0,
    };
    submissions.forEach((s) => {
      const orig = getOriginInfo(s.origin).category;
      if (orig in res) {
        (res as Record<string, number>)[orig] += 1;
      }
      if (s.requestQuote) {
        res.quote += 1;
      }
    });
    return res;
  }, [submissions]);

  // Filtered submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((s) => {
      // Filter by origin tab
      if (selectedFilter !== "todos") {
        if (selectedFilter === "quote") {
          if (!s.requestQuote) return false;
        } else {
          const orig = getOriginInfo(s.origin).category;
          if (orig !== selectedFilter) return false;
        }
      }

      // Filter by search string
      if (!search.trim()) return true;
      const term = search.toLowerCase();
      return (
        s.name.toLowerCase().includes(term) ||
        s.email.toLowerCase().includes(term) ||
        (s.phone && s.phone.includes(term)) ||
        (s.company && s.company.toLowerCase().includes(term)) ||
        (s.institution && s.institution.toLowerCase().includes(term)) ||
        (s.subject && s.subject.toLowerCase().includes(term)) ||
        (s.message && s.message.toLowerCase().includes(term))
      );
    });
  }, [submissions, selectedFilter, search]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleCopySummary = (s: ContactSubmission) => {
    const lines = [
      `--- CONTATO BIOPIN ---`,
      `Nome: ${s.name}`,
      `E-mail: ${s.email}`,
      s.phone ? `Telefone: ${s.phone}` : null,
      s.company ? `Empresa: ${s.company}` : null,
      s.institution ? `Instituição: ${s.institution}` : null,
      s.role ? `Cargo: ${s.role}` : null,
      s.segment ? `Segmento: ${s.segment}` : null,
      `Assunto: ${s.subject}`,
      s.interestType ? `Interesse: ${s.interestType}` : null,
      s.requestQuote ? `Solicita Orçamento: SIM` : null,
      `Origem: ${s.origin || "Site"}`,
      `LGPD: ${s.consentLGPD ? "Aceito" : "Não informado"} (${formatDate(s.consentAt)})`,
      `Data: ${formatDate(s.createdAt)}`,
      `\nMensagem:\n${s.message}`,
    ]
      .filter(Boolean)
      .join("\n");

    navigator.clipboard.writeText(lines);
    setCopiedId(s.id);
    toast.success("Dados do contato copiados para a área de transferência!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Deseja realmente excluir a submissão de "${name}"? Esta ação não pode ser desfeita.`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await deleteContactSubmission(id);
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success("Contato excluído com sucesso.");
        setSubmissions((prev) => prev.filter((item) => item.id !== id));
        if (expandedId === id) setExpandedId(null);
      }
    } catch {
      toast.error("Ocorreu um erro ao excluir o contato.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Contatos Recebidos
          </h1>
          <p className="text-slate-600 mt-1">
            Gestão centralizada de formulários de contato e propostas de parceria.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-xs text-sm">
            <span className="text-slate-500">Total: </span>
            <span className="font-bold text-slate-900">{submissions.length}</span>
          </div>
          {counts.quote > 0 && (
            <div className="px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl text-sm font-medium text-amber-800">
              <span>{counts.quote} orçamento(s)</span>
            </div>
          )}
        </div>
      </div>

      {/* Search & Origin Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, e-mail, empresa, assunto ou mensagem..."
            className="w-full h-11 pl-10 pr-4 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Limpar
            </button>
          )}
        </div>

        {/* Filter Chips by Form Origin */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-medium flex items-center gap-1 shrink-0 mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filtrar:
          </span>

          <button
            onClick={() => setSelectedFilter("todos")}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
              selectedFilter === "todos"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Todos ({counts.todos})
          </button>

          <button
            onClick={() => setSelectedFilter("contato")}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
              selectedFilter === "contato"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-blue-50 text-blue-700 hover:bg-blue-100"
            }`}
          >
            Fale Conosco ({counts.contato})
          </button>

          <button
            onClick={() => setSelectedFilter("nanofiberdressing")}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
              selectedFilter === "nanofiberdressing"
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            }`}
          >
            Nanofiberdressing ({counts.nanofiberdressing})
          </button>

          <button
            onClick={() => setSelectedFilter("oncomatrix")}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
              selectedFilter === "oncomatrix"
                ? "bg-purple-600 text-white shadow-xs"
                : "bg-purple-50 text-purple-700 hover:bg-purple-100"
            }`}
          >
            OncoMatrix ({counts.oncomatrix})
          </button>

          <button
            onClick={() => setSelectedFilter("tecnologia")}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
              selectedFilter === "tecnologia"
                ? "bg-cyan-700 text-white shadow-xs"
                : "bg-cyan-50 text-cyan-700 hover:bg-cyan-100"
            }`}
          >
            Tecnologia ({counts.tecnologia})
          </button>

          {counts.quote > 0 && (
            <button
              onClick={() => setSelectedFilter("quote")}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                selectedFilter === "quote"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-amber-50 text-amber-700 hover:bg-amber-100"
              }`}
            >
              Com Cotação ({counts.quote})
            </button>
          )}
        </div>
      </div>

      {/* Submissions List */}
      {filteredSubmissions.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500">
          <Mail className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <p className="font-semibold text-slate-700 text-base">Nenhum envio encontrado</p>
          <p className="text-xs text-slate-400 mt-1">
            {search || selectedFilter !== "todos"
              ? "Tente ajustar o termo de busca ou o filtro de formulário."
              : "Assim que um usuário preencher qualquer formulário do site, os dados aparecerão aqui."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSubmissions.map((s) => {
            const isExpanded = expandedId === s.id;
            const originInfo = getOriginInfo(s.origin);
            const waUrl = getWhatsAppUrl(s.phone);

            return (
              <div
                key={s.id}
                className={`bg-white border rounded-2xl transition-all duration-200 shadow-xs overflow-hidden ${
                  isExpanded
                    ? "border-primary/40 ring-1 ring-primary/20 shadow-md"
                    : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                {/* Collapsible Row Header */}
                <div
                  onClick={() => toggleExpand(s.id)}
                  className="p-5 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none hover:bg-slate-50/50 transition-colors"
                >
                  {/* Left: Identification & Origin */}
                  <div className="flex items-start gap-4 min-w-0 flex-1">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary font-bold text-sm flex items-center justify-center shrink-0 uppercase">
                      {s.name
                        .split(" ")
                        .map((p) => p[0])
                        .slice(0, 2)
                        .join("")}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-bold text-slate-900 text-base">
                          {s.name}
                        </span>

                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${originInfo.badgeClass}`}
                        >
                          <Globe className="w-3 h-3" />
                          {originInfo.label}
                        </span>

                        {s.requestQuote && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                            <BadgeAlert className="w-3 h-3" /> Solicita Cotação
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                        <span className="text-slate-700 font-medium">{s.email}</span>
                        {s.phone && <span>· Tel: {s.phone}</span>}
                        {(s.company || s.institution) && (
                          <span>· {s.company || s.institution}</span>
                        )}
                        {s.role && <span>({s.role})</span>}
                      </div>
                    </div>
                  </div>

                  {/* Right: Subject, Date & Expand button */}
                  <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <div className="text-left md:text-right">
                      <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                        {s.subject}
                      </span>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {formatRelative(s.createdAt)}
                      </p>
                    </div>

                    <button
                      type="button"
                      aria-label={isExpanded ? "Recolher detalhes" : "Expandir detalhes"}
                      className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-primary" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Structured View — Exactly Matching the Form Structure */}
                {isExpanded && (
                  <div className="border-t border-slate-100 bg-slate-50/50 p-6 space-y-6 animate-in fade-in-50 duration-200">
                    {/* Notice bar */}
                    <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-200/80">
                      <span className="flex items-center gap-1.5 font-semibold text-slate-700 uppercase tracking-wider text-[11px]">
                        <FileText className="w-3.5 h-3.5 text-primary" />
                        Ficha Estruturada do Formulário
                      </span>
                      <span className="text-slate-400">
                        Submetido em {formatDate(s.createdAt)}
                      </span>
                    </div>

                    {/* Form Fields Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Section 1: Contato & Identificação */}
                      <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs space-y-3">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-primary" />
                          1. Dados de Contato
                        </div>

                        <div>
                          <label className="text-[11px] font-medium text-slate-400 block">
                            Nome Completo
                          </label>
                          <p className="text-sm font-semibold text-slate-900">
                            {s.name}
                          </p>
                        </div>

                        <div>
                          <label className="text-[11px] font-medium text-slate-400 block">
                            E-mail
                          </label>
                          <a
                            href={`mailto:${s.email}`}
                            className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            {s.email}
                          </a>
                        </div>

                        <div>
                          <label className="text-[11px] font-medium text-slate-400 block">
                            Telefone / WhatsApp
                          </label>
                          {s.phone ? (
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-sm font-medium text-slate-800">
                                {s.phone}
                              </span>
                              {waUrl && (
                                <a
                                  href={waUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-2xs"
                                >
                                  <FaWhatsapp className="w-3 h-3" /> WhatsApp
                                </a>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400">Não informado</span>
                          )}
                        </div>
                      </div>

                      {/* Section 2: Instituição / Empresa / Cargo */}
                      <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs space-y-3">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-primary" />
                          2. Organização & Atuação
                        </div>

                        <div>
                          <label className="text-[11px] font-medium text-slate-400 block">
                            Empresa ou Instituição
                          </label>
                          <p className="text-sm font-semibold text-slate-900">
                            {s.company || s.institution || "Não informada"}
                          </p>
                        </div>

                        <div>
                          <label className="text-[11px] font-medium text-slate-400 block">
                            Cargo / Especialidade
                          </label>
                          <p className="text-sm text-slate-800 font-medium">
                            {s.role || "Não informado"}
                          </p>
                        </div>

                        <div>
                          <label className="text-[11px] font-medium text-slate-400 block">
                            Segmento de Atuação
                          </label>
                          <p className="text-sm text-slate-800">
                            {s.segment || "Geral / Não especificado"}
                          </p>
                        </div>
                      </div>

                      {/* Section 3: Interesse & Origem */}
                      <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs space-y-3">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-primary" />
                          3. Demanda & Origem
                        </div>

                        <div>
                          <label className="text-[11px] font-medium text-slate-400 block">
                            Assunto ou Solução
                          </label>
                          <span className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                            {s.subject}
                          </span>
                        </div>

                        {s.interestType && (
                          <div>
                            <label className="text-[11px] font-medium text-slate-400 block">
                              Tipo de Interesse
                            </label>
                            <p className="text-sm text-slate-800 font-medium">
                              {s.interestType}
                            </p>
                          </div>
                        )}

                        <div>
                          <label className="text-[11px] font-medium text-slate-400 block">
                            Solicitação de Cotação
                          </label>
                          <p className="text-xs font-semibold mt-0.5">
                            {s.requestQuote ? (
                              <span className="text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                                <BadgeAlert className="w-3 h-3" /> Sim, solicitou orçamento
                              </span>
                            ) : (
                              <span className="text-slate-500">Não solicitada</span>
                            )}
                          </p>
                        </div>

                        <div>
                          <label className="text-[11px] font-medium text-slate-400 block">
                            Página de Origem do Lead
                          </label>
                          <Link
                            href={originInfo.path}
                            target="_blank"
                            className="text-xs text-primary hover:underline inline-flex items-center gap-1 font-mono mt-0.5"
                          >
                            <span>{s.origin || "/contato"}</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Section 4: Mensagem Completa */}
                    <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-2xs space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-primary" />
                        4. Mensagem Enviada pelo Usuário
                      </div>
                      <div className="p-4 bg-slate-50/80 border border-slate-100 rounded-lg text-slate-800 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                        {s.message || "Sem mensagem de texto complementar."}
                      </div>
                    </div>

                    {/* Section 5: Conformidade LGPD & Ações */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                      {/* LGPD Badge */}
                      <div className="flex items-center gap-2 text-xs">
                        {s.consentLGPD ? (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-medium">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            <span>
                              Consentimento LGPD confirmado em{" "}
                              <strong>{formatDate(s.consentAt)}</strong>
                            </span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 border border-red-200 font-medium">
                            <span>Consentimento LGPD não registrado</span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopySummary(s)}
                          className="h-9 px-3 gap-1.5 text-xs text-slate-700"
                        >
                          {copiedId === s.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-500" />
                              <span>Copiar Resumo</span>
                            </>
                          )}
                        </Button>

                        {waUrl && (
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-xs font-semibold bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xs transition-colors"
                          >
                            <FaWhatsapp className="w-3.5 h-3.5" />
                            <span>Abrir WhatsApp</span>
                          </a>
                        )}

                        <a
                          href={`mailto:${s.email}?subject=${encodeURIComponent(
                            `BioSpin — Re: ${s.subject}`
                          )}`}
                          className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-xs font-semibold bg-primary hover:bg-primary/90 text-white shadow-2xs transition-colors"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Responder E-mail</span>
                        </a>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(s.id, s.name)}
                          disabled={deletingId === s.id}
                          className="h-9 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                          title="Excluir este envio"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
