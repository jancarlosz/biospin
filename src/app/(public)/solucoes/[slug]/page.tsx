import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Microchip,
  Sparkles,
  Activity,
  Layers,
} from "lucide-react";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/public/spotlight-card";

interface SolutionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

type HighlightItem = { value: string; label: string };
type FeatureItem = { title: string; items: string[] };
type BenefitItem = { title: string; description: string };

export async function generateMetadata({ params }: SolutionPageProps) {
  const resolvedParams = await params;
  const solution = await db.solution.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!solution) return { title: "Solução não encontrada | BioSpin" };

  return {
    title: solution.seoTitle || `${solution.name} | BioSpin`,
    description: solution.seoDescription || solution.summary,
  };
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const resolvedParams = await params;
  const solution = await db.solution.findUnique({
    where: { slug: resolvedParams.slug, status: "PUBLISHED" },
  });

  if (!solution) {
    notFound();
  }

  // Safely extract structured JSON arrays
  const highlights = (Array.isArray(solution.highlights) ? solution.highlights : []) as HighlightItem[];
  const features = (Array.isArray(solution.features) ? solution.features : []) as FeatureItem[];
  const benefits = (Array.isArray(solution.benefits) ? solution.benefits : []) as BenefitItem[];
  const audience = (Array.isArray(solution.audience) ? solution.audience : []) as string[];

  const hasStructuredData = Boolean(
    solution.subtitle ||
    solution.badge ||
    solution.problemTitle ||
    solution.problemDescription ||
    highlights.length > 0 ||
    features.length > 0 ||
    benefits.length > 0 ||
    audience.length > 0
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 z-0 opacity-20">
          {solution.imageUrl ? (
            <>
              <Image
                src={solution.imageUrl}
                alt={solution.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent" />
            </>
          ) : (
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-secondary/15 rounded-full blur-[140px] opacity-70" />
          )}
        </div>

        {/* Grid nanotecnológico e orbes orgânicos */}
        <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
          <div className="absolute inset-0 bg-nanotech-grid-dark opacity-35 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[700px] h-[700px] bg-secondary/25 rounded-full blur-[130px] opacity-70 animate-float-slow" />
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[500px] h-[500px] bg-white/10 rounded-full blur-[110px] opacity-50 animate-float-reverse" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl reveal-on-scroll">
            <Button
              variant="link"
              className="text-primary-foreground/60 hover:text-white mb-6 p-0 h-auto font-medium inline-flex items-center gap-2"
              render={<Link href="/solucoes" />}
            >
              <ArrowLeft className="h-4 w-4" /> Voltar para Soluções
            </Button>

            {/* Badge / Selo */}
            {solution.badge ? (
              <div>
                <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-bold mb-8 tracking-wider uppercase border border-white/20">
                  {solution.badge}
                </span>
              </div>
            ) : solution.stage ? (
              <div>
                <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-bold mb-8 tracking-wider uppercase border border-white/20">
                  {solution.stage}
                </span>
              </div>
            ) : null}

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-heading tracking-tight mb-8 leading-[1.1]">
              <span className="font-bold">{solution.name}</span>
            </h1>

            {/* Subtitle or Summary */}
            <p className="text-xl md:text-2xl text-primary-foreground/90 leading-relaxed font-light max-w-3xl mb-10 border-l-4 border-secondary pl-6">
              {solution.subtitle || solution.summary}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <Button
                size="lg"
                variant="secondary"
                className="text-base px-8 h-14 rounded-full shadow-lg"
                render={<Link href={`/contato?solucao=${encodeURIComponent(solution.name)}`} />}
              >
                {solution.heroCta || "Falar com Especialistas"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              {hasStructuredData && (
                <Button
                  size="lg"
                  variant="outline-white"
                  className="text-base px-8 h-14 rounded-full"
                  render={<Link href="#detalhes" />}
                >
                  Conhecer a Tecnologia
                </Button>
              )}
            </div>

            {/* Trust Pills */}
            <div className="flex flex-wrap gap-4 text-sm font-medium text-primary-foreground/70">
              <div className="flex items-center gap-2 bg-black/20 rounded-full px-4 py-2 backdrop-blur-sm">
                <CheckCircle2 className="h-4 w-4 text-secondary" /> Nanotecnologia e Biopolímeros
              </div>
              <div className="flex items-center gap-2 bg-black/20 rounded-full px-4 py-2 backdrop-blur-sm">
                <CheckCircle2 className="h-4 w-4 text-secondary" /> Bioativos da Amazônia
              </div>
              <div className="flex items-center gap-2 bg-black/20 rounded-full px-4 py-2 backdrop-blur-sm">
                <CheckCircle2 className="h-4 w-4 text-secondary" /> Sustentabilidade e Ciência
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== PREMIUM STRUCTURED SECTIONS ===================== */}
      {hasStructuredData ? (
        <div id="detalhes" className="space-y-0">
          {/* O Desafio & Números */}
          {(solution.problemTitle || solution.problemDescription || highlights.length > 0) && (
            <section className="py-28 bg-background relative z-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {(solution.problemTitle || solution.problemDescription) && (
                  <div className="max-w-3xl mb-16">
                    {solution.problemTitle && (
                      <h2 className="text-4xl md:text-5xl font-heading text-foreground mb-6 leading-tight">
                        <span className="font-light">O contexto e o</span>{" "}
                        <span className="font-bold text-primary">{solution.problemTitle}</span>
                      </h2>
                    )}
                    {solution.problemDescription && (
                      <p className="text-xl text-foreground/70 font-light leading-relaxed whitespace-pre-line">
                        {solution.problemDescription}
                      </p>
                    )}
                  </div>
                )}

                {/* Highlights Grid */}
                {highlights.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {highlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-8 rounded-[2rem] border border-foreground/5 shadow-[0_10px_40px_rgba(0,0,0,0.02)] transition-transform hover:-translate-y-1"
                      >
                        <p className="text-4xl md:text-5xl font-bold text-primary mb-2 font-heading">
                          {item.value}
                        </p>
                        <p className="text-foreground/70 font-light leading-snug text-sm md:text-base">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Features / Diferenciais Tecnológicos */}
          {features.length > 0 && (
            <section className="py-24 md:py-28 bg-white relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-secondary font-bold tracking-widest text-sm uppercase mb-3 block">
                    Pilares Científicos
                  </span>
                  <h2 className="text-4xl md:text-5xl font-heading text-foreground mb-4 leading-tight">
                    <span className="font-bold text-primary">Diferenciais e Engenharia</span>{" "}
                    <span className="font-light">de Biomateriais</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="bg-background rounded-[2.5rem] p-8 md:p-10 border border-foreground/5 shadow-sm"
                    >
                      <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                        {idx % 2 === 0 ? (
                          <Microchip className="h-7 w-7 text-primary" />
                        ) : (
                          <Activity className="h-7 w-7 text-primary" />
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-6 font-heading">
                        {feat.title}
                      </h3>
                      <ul className="space-y-4">
                        {feat.items.map((it, iIdx) => (
                          <li
                            key={iIdx}
                            className="flex items-start gap-3.5 text-foreground/75 font-light text-base md:text-lg"
                          >
                            <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Benefícios (Fundo Escuro BioSpin) */}
          {benefits.length > 0 && (
            <section className="py-24 md:py-28 bg-primary text-primary-foreground relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                  <div className="lg:col-span-5">
                    <span className="text-secondary font-bold tracking-widest text-sm uppercase mb-3 block">
                      Vantagens Competitivas
                    </span>
                    <h2 className="text-4xl md:text-5xl font-heading mb-6 leading-tight">
                      <span className="font-light block">Impacto direto com</span>
                      <span className="font-bold text-white">{solution.name}</span>
                    </h2>
                    <p className="text-primary-foreground/80 font-light text-lg leading-relaxed mb-8">
                      Desenvolvido para atender aos mais rigorosos padrões biomédicos e industriais,
                      com alta reprodutibilidade e escalabilidade.
                    </p>
                    <Button
                      size="lg"
                      variant="secondary"
                      className="rounded-full px-8 h-12"
                      render={<Link href={`/contato?solucao=${encodeURIComponent(solution.name)}`} />}
                    >
                      Solicitar Relatório Técnico
                    </Button>
                  </div>

                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {benefits.map((b, idx) => (
                      <div
                        key={idx}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 hover:bg-white/10 transition-colors"
                      >
                        <h4 className="text-lg font-bold text-secondary mb-2.5 font-heading">
                          {b.title}
                        </h4>
                        <p className="text-primary-foreground/80 font-light text-sm leading-relaxed">
                          {b.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Público & Aplicações */}
          {(solution.audienceDescription || audience.length > 0) && (
            <section className="py-24 md:py-28 bg-white relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <span className="text-secondary font-bold tracking-widest text-sm uppercase mb-3 block">
                      Aplicações e Parceiros
                    </span>
                    <h2 className="text-4xl md:text-5xl font-heading text-foreground mb-6 leading-tight">
                      <span className="font-light block">Para quem é o</span>
                      <span className="font-bold text-primary">{solution.name}?</span>
                    </h2>
                    {solution.audienceDescription && (
                      <p className="text-xl text-foreground/70 font-light leading-relaxed mb-8">
                        {solution.audienceDescription}
                      </p>
                    )}
                  </div>

                  {audience.length > 0 && (
                    <div className="space-y-4">
                      {audience.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-4 text-foreground/85 font-medium text-base md:text-lg p-4 bg-background rounded-2xl border border-foreground/5 shadow-sm"
                        >
                          <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Conteúdo Livre Complementar (se preenchido) */}
          {solution.content && solution.content.trim().length > 20 && (
            <section className="py-20 bg-background relative z-20">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white p-8 md:p-14 rounded-[2.5rem] border border-foreground/5 shadow-sm">
                  <h3 className="text-2xl font-bold font-heading text-foreground mb-8 pb-4 border-b">
                    Informações Técnicas Detalhadas
                  </h3>
                  <div
                    className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-foreground prose-h2:text-3xl prose-h3:text-xl prose-p:text-foreground/70 prose-p:font-light prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary/80 prose-li:text-foreground/70 prose-li:font-light prose-img:rounded-[1.5rem]"
                    dangerouslySetInnerHTML={{ __html: solution.content }}
                  />
                </div>
              </div>
            </section>
          )}

          {/* Seção Final de Chamada para Ação (CTA) */}
          <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <h2 className="text-4xl md:text-5xl font-heading mb-6 font-bold text-white leading-tight">
                {solution.ctaTitle || "Pronto para inovar com a BioSpin?"}
              </h2>
              <p className="text-xl text-primary-foreground/80 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
                {solution.ctaDescription ||
                  "Entre em contato com nossa equipe técnica para discutir parcerias, fornecimento e projetos de validação."}
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="h-14 px-10 rounded-full text-base font-medium shadow-xl"
                render={<Link href={`/contato?solucao=${encodeURIComponent(solution.name)}`} />}
              >
                Entrar em Contato Agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </section>
        </div>
      ) : (
        /* ===================== FALLBACK (SIMPLE LAYOUT) ===================== */
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-8">
                <div
                  className="prose prose-lg md:prose-xl max-w-none prose-headings:font-heading prose-headings:text-foreground prose-h2:text-4xl prose-h3:text-2xl prose-p:text-foreground/70 prose-p:font-light prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary/80 prose-li:text-foreground/70 prose-li:font-light prose-img:rounded-[2rem] prose-strong:text-foreground prose-strong:font-bold"
                  dangerouslySetInnerHTML={{ __html: solution.content }}
                />
              </div>

              <div className="lg:col-span-4">
                <div className="sticky top-32 bg-background border border-foreground/5 p-8 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.02)]">
                  <h3 className="text-2xl font-bold font-heading text-foreground mb-4">
                    Interessado nesta tecnologia?
                  </h3>
                  <p className="text-foreground/60 font-light leading-relaxed mb-8">
                    Entre em contato para discutir parcerias, aplicações clínicas, ou oportunidades de investimento.
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center text-foreground/70 font-medium">
                      <CheckCircle2 className="h-5 w-5 text-secondary mr-3" />
                      Validação em andamento
                    </div>
                    <div className="flex items-center text-foreground/70 font-medium">
                      <CheckCircle2 className="h-5 w-5 text-secondary mr-3" />
                      Bioativos sustentáveis
                    </div>
                  </div>
                  <Button
                    size="lg"
                    className="w-full h-14 rounded-full text-base"
                    render={<Link href={`/contato?solucao=${encodeURIComponent(solution.name)}`} />}
                  >
                    Fale com Especialistas
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
