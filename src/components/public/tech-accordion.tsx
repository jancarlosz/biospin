"use client";

import { useState } from "react";
import { ChevronDown, Layers, Atom, Microscope, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, typeof Layers> = {
  layers: Layers,
  atom: Atom,
  microscope: Microscope,
  shield: ShieldCheck,
};

export interface AccordionItem {
  number: string;
  title: string;
  body: string;
  iconKey?: "layers" | "atom" | "microscope" | "shield";
}

interface Props {
  items: AccordionItem[];
  className?: string;
  defaultOpenIndex?: number | null;
}

export function TechAccordion({ items, className, defaultOpenIndex = 0 }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div className={cn("space-y-4 max-w-5xl mx-auto w-full", className)}>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const Icon = (item.iconKey && iconMap[item.iconKey]) || Layers;

        return (
          <div
            key={item.number}
            className={cn(
              "rounded-[2rem] bg-white border transition-all duration-300 overflow-hidden shadow-xs",
              isOpen
                ? "border-primary/30 shadow-md ring-1 ring-primary/10"
                : "border-border/80 hover:border-primary/20 hover:shadow-sm"
            )}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full flex items-center justify-between gap-4 p-6 sm:p-8 text-left cursor-pointer group"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                <div
                  className={cn(
                    "w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors",
                    isOpen
                      ? "bg-primary text-white"
                      : "bg-primary/5 text-primary group-hover:bg-primary/10"
                  )}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20 w-fit">
                    {item.number}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-primary group-hover:text-secondary transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Seta Indicativa que rotaciona */}
              <div
                className={cn(
                  "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300",
                  isOpen
                    ? "bg-primary text-white border-primary rotate-180"
                    : "bg-background text-foreground/60 border-border group-hover:border-primary/40 group-hover:text-primary"
                )}
                aria-hidden="true"
              >
                <ChevronDown className="h-5 w-5 transition-transform duration-300" />
              </div>
            </button>

            {/* Conteúdo em cascata revelado com transição suave */}
            <div
              className={cn(
                "transition-all duration-300 ease-in-out px-6 sm:px-8",
                isOpen
                  ? "max-h-60 opacity-100 pb-8 pt-0 border-t border-border/40 mt-2"
                  : "max-h-0 opacity-0 overflow-hidden"
              )}
            >
              <p className="text-foreground/75 leading-relaxed font-light text-base sm:text-lg pt-4 sm:pl-20">
                {item.body}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
