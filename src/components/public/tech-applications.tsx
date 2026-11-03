"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, X, Activity, Layers, Microscope } from "lucide-react";
import { SpotlightCard } from "@/components/public/spotlight-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ApplicationArea {
  id: string;
  category: "saude" | "biotech";
  tag: string;
  title: string;
  body: string;
  fullDescription: string;
  icon: typeof Activity;
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
    icon: Activity,
  },
  {
    id: "matrizes",
    category: "saude",
    tag: "SAÚDE / PESQUISA",
    title: "Matrizes bioativas",
    body: "Associação de materiais e componentes bioativos para investigar funções e interações de interesse.",
    fullDescription:
      "A integração de componentes bioativos a matrizes exige investigar compatibilidade, estabilidade e comportamento no contexto pretendido. A seleção da composição e dos critérios de avaliação deve ser definida para cada projeto. Esta frente apresenta uma possibilidade de desenvolvimento, sem alegação de liberação controlada ou eficácia comprovada.",
    icon: Layers,
  },
  {
    id: "modelos",
    category: "biotech",
    tag: "BIOTECNOLOGIA / PESQUISA",
    title: "Modelos e interfaces",
    body: "Estruturas para explorar interações entre células e materiais em ambientes experimentais.",
    fullDescription:
      "Estruturas fibrosas podem ser exploradas no estudo de interações entre células e materiais. A pertinência de cada modelo depende da pergunta científica, dos métodos de caracterização e das condições experimentais. Entre os temas para discussão estão arquitetura, propriedades de superfície e reprodutibilidade.",
    icon: Microscope,
  },
];

export function TechApplications() {
  const [filter, setFilter] = useState<"all" | "saude" | "biotech">("all");
  const [activeDetail, setActiveDetail] = useState<ApplicationArea | null>(null);

  const filtered = applicationAreas.filter((item) =>
    filter === "all" ? true : item.category === filter
  );

  return (
    <div className="w-full">
      {/* Botões de Filtro Corrigidos */}
      <div className="flex flex-wrap items-center gap-3 mb-10" role="group" aria-label="Filtrar aplicações">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={cn(
            "px-6 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer select-none",
            filter === "all"
              ? "bg-primary text-white shadow-md -translate-y-0.5"
              : "bg-white text-foreground/80 hover:text-primary hover:border-primary/40 border border-border/80 shadow-2xs hover:-translate-y-0.5"
          )}
        >
          Todas as frentes
        </button>
        <button
          type="button"
          onClick={() => setFilter("saude")}
          className={cn(
            "px-6 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer select-none",
            filter === "saude"
              ? "bg-primary text-white shadow-md -translate-y-0.5"
              : "bg-white text-foreground/80 hover:text-primary hover:border-primary/40 border border-border/80 shadow-2xs hover:-translate-y-0.5"
          )}
        >
          Saúde
        </button>
        <button
          type="button"
          onClick={() => setFilter("biotech")}
          className={cn(
            "px-6 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer select-none",
            filter === "biotech"
              ? "bg-primary text-white shadow-md -translate-y-0.5"
              : "bg-white text-foreground/80 hover:text-primary hover:border-primary/40 border border-border/80 shadow-2xs hover:-translate-y-0.5"
          )}
        >
          Biotecnologia
        </button>
      </div>

      {/* Grid de Cards Dinâmico */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filtered.map((area) => {
          const Icon = area.icon;
          return (
            <div
              key={area.id}
              className="animate-in fade-in zoom-in-95 duration-200"
            >
              <SpotlightCard className="h-full bg-white p-8 md:p-10 rounded-[2.5rem] border border-foreground/5 shadow-[0_10px_40px_rgba(0,0,0,0.02)] transition-all duration-300 flex flex-col hover:-translate-y-1 hover:border-primary/20">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {area.tag}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold font-heading text-primary mb-4 leading-tight">
                  {area.title}
                </h3>

                <p className="text-foreground/70 text-base leading-relaxed font-light mb-8 flex-1">
                  {area.body}
                </p>

                <div className="pt-6 border-t border-foreground/10 mt-auto">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveDetail(area)}
                    className="w-full h-12 rounded-full border-foreground/15 hover:border-primary hover:text-primary group text-sm font-medium"
                  >
                    <span>Explorar a frente</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </SpotlightCard>
            </div>
          );
        })}
      </div>

      {/* Modal / Dialog */}
      {activeDetail && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveDetail(null)}
        >
          <div
            className="bg-white text-foreground rounded-[2.5rem] max-w-xl w-full p-8 md:p-10 shadow-2xl relative border border-foreground/10 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveDetail(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-foreground/50 hover:text-foreground transition-colors"
              aria-label="Fechar janela"
            >
              <X className="h-5 w-5" />
            </button>

            <span className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/20">
              BIOSPIN / PESQUISA · {activeDetail.tag}
            </span>

            <h3 className="text-3xl font-heading font-bold text-primary mb-4 leading-tight">
              {activeDetail.title}
            </h3>

            <p className="text-foreground/75 leading-relaxed text-base font-light mb-8">
              {activeDetail.fullDescription}
            </p>

            <div className="pt-6 border-t border-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Button
                className="w-full sm:w-auto rounded-full px-6 h-12 font-semibold shadow-md"
                render={<Link href="#contato" onClick={() => setActiveDetail(null)} />}
              >
                Conversar sobre esta frente
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <button
                type="button"
                onClick={() => setActiveDetail(null)}
                className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors py-2"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
