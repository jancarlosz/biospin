"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { SpotlightCard } from "@/components/public/spotlight-card";

interface ApplicationArea {
  id: string;
  category: "saude" | "biotech";
  tag: string;
  title: string;
  body: string;
  fullDescription: string;
  gradFrom: string;
  gradTo: string;
  accent: string;
}

const applicationAreas: ApplicationArea[] = [
  {
    id: "regeneracao",
    category: "saude",
    tag: "SAÚDE / PESQUISA",
    title: "Regeneração tecidual",
    body: "Arquiteturas fibrosas como objeto de estudo para interfaces e suportes voltados à engenharia de tecidos.",
    fullDescription:
      "A organização das fibras pode ser investigada como variável no desenvolvimento de suportes para engenharia de tecidos. Uma proposta de pesquisa precisa definir tecido de interesse, propriedades do material e modelos de avaliação. Biocompatibilidade, desempenho e segurança dependem de estudos específicos; não há indicação clínica associada a esta apresentação.",
    gradFrom: "#00058B",
    gradTo: "#0a0fa8",
    accent: "#93c5fd",
  },
  {
    id: "matrizes",
    category: "saude",
    tag: "SAÚDE / PESQUISA",
    title: "Matrizes bioativas",
    body: "Associação de materiais e componentes bioativos para investigar funções e interações de interesse.",
    fullDescription:
      "A integração de componentes bioativos a matrizes exige investigar compatibilidade, estabilidade e comportamento no contexto pretendido. A seleção da composição e dos critérios de avaliação deve ser definida para cada projeto. Esta frente apresenta uma possibilidade de desenvolvimento, sem alegação de liberação controlada ou eficácia comprovada.",
    gradFrom: "#050B24",
    gradTo: "#0a1450",
    accent: "#60a5fa",
  },
  {
    id: "modelos",
    category: "biotech",
    tag: "BIOTECNOLOGIA / PESQUISA",
    title: "Modelos e interfaces",
    body: "Estruturas para explorar interações entre células e materiais em ambientes experimentais.",
    fullDescription:
      "Estruturas fibrosas podem ser exploradas no estudo de interações entre células e materiais. A pertinência de cada modelo depende da pergunta científica, dos métodos de caracterização e das condições experimentais. Entre os temas para discussão estão arquitetura, propriedades de superfície e reprodutibilidade.",
    gradFrom: "#0a0d3d",
    gradTo: "#00058B",
    accent: "#bfdbfe",
  },
];

export function TechApplications() {
  const [filter, setFilter] = useState<"all" | "saude" | "biotech">("all");
  const [activeDetail, setActiveDetail] = useState<ApplicationArea | null>(null);

  const filtered = applicationAreas.filter((item) =>
    filter === "all" ? true : item.category === filter
  );

  return (
    <>
      {/* Botões de Filtro */}
      <div className="flex gap-2.5 mb-10 flex-wrap" role="group" aria-label="Filtrar aplicações">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-colors ${
            filter === "all"
              ? "bg-primary text-white shadow-sm"
              : "border border-foreground/20 text-foreground/70 hover:border-primary hover:text-primary"
          }`}
        >
          Todas as frentes
        </button>
        <button
          onClick={() => setFilter("saude")}
          className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-colors ${
            filter === "saude"
              ? "bg-primary text-white shadow-sm"
              : "border border-foreground/20 text-foreground/70 hover:border-primary hover:text-primary"
          }`}
        >
          Saúde
        </button>
        <button
          onClick={() => setFilter("biotech")}
          className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-colors ${
            filter === "biotech"
              ? "bg-primary text-white shadow-sm"
              : "border border-foreground/20 text-foreground/70 hover:border-primary hover:text-primary"
          }`}
        >
          Biotecnologia
        </button>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((area, idx) => (
          <div
            key={area.id}
            className={`transition-all duration-300 ${
              idx === 1 ? "reveal-delay-100" : idx === 2 ? "reveal-delay-200" : ""
            }`}
          >
            <SpotlightCard className="h-full flex flex-col rounded-2xl overflow-hidden border border-foreground/10 hover:border-primary/30 transition-all duration-300 bg-card group shadow-sm hover:shadow-md">
              {/* Arte do card com padrões de microarquitetura */}
              <div
                className="h-48 sm:h-52 relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${area.gradFrom}, ${area.gradTo})` }}
              >
                <div
                  className="absolute inset-0 opacity-25 group-hover:scale-105 transition-transform duration-700"
                  style={{
                    background: `repeating-linear-gradient(38deg, transparent 0 12px, ${area.accent}40 13px, transparent 16px 22px),
                                 repeating-linear-gradient(129deg, transparent 0 14px, ${area.accent}30 16px, transparent 19px 24px)`,
                  }}
                />
                <div
                  className="absolute inset-0 opacity-30"
                  style={{ background: `radial-gradient(ellipse at 40% 40%, ${area.accent}60, transparent 65%)` }}
                />
                <span
                  className="absolute bottom-4 left-4 text-[9px] tracking-[1.5px] font-bold uppercase"
                  style={{ color: area.accent }}
                >
                  {area.tag}
                </span>
              </div>

              {/* Conteúdo */}
              <div className="p-6 flex flex-col gap-3 flex-1">
                <h3 className="text-2xl font-heading text-primary font-normal">{area.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed flex-1 font-light">{area.body}</p>
                <button
                  type="button"
                  onClick={() => setActiveDetail(area)}
                  className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold border-b border-primary/30 pb-1 w-fit hover:opacity-75 transition-all mt-3 group-hover:border-primary"
                >
                  <span>Explorar a frente</span>
                  <span className="text-secondary">↗</span>
                </button>
              </div>
            </SpotlightCard>
          </div>
        ))}
      </div>

      {/* Modal / Dialog de Detalhe da Frente */}
      {activeDetail && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveDetail(null)}
        >
          <div
            className="bg-white text-foreground rounded-2xl max-w-lg w-full p-8 shadow-2xl relative border border-foreground/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveDetail(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-muted text-foreground/50 hover:text-foreground transition-colors"
              aria-label="Fechar janela"
            >
              <X className="h-5 w-5" />
            </button>
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-secondary mb-3">
              BIOSPIN / PESQUISA &middot; {activeDetail.tag}
            </p>
            <h3 className="text-3xl font-heading text-primary font-normal mb-4">
              {activeDetail.title}
            </h3>
            <p className="text-foreground/75 leading-relaxed text-sm mb-6 font-light">
              {activeDetail.fullDescription}
            </p>
            <div className="pt-4 border-t border-foreground/10 flex justify-between items-center">
              <Link
                href="/contato"
                onClick={() => setActiveDetail(null)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-primary border-b border-primary/40 pb-1 hover:opacity-70 transition-opacity"
              >
                Conversar sobre esta frente <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setActiveDetail(null)}
                className="text-xs text-foreground/50 hover:text-foreground transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
