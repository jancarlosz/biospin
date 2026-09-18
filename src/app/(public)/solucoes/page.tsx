import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Activity, ShieldPlus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/public/spotlight-card";
import { db } from "@/lib/db";

export const metadata = {
  title: "Soluções BioSpin | Biomateriais e Cosméticos",
  description:
    "Conheça o portfólio da BioSpin: Nanofiberdressing, OncoMatrix e a linha cosmética com bioativos amazônicos encapsulados em nanotecnologia própria.",
};

export default async function SolucoesPage() {
  // Fetch additional published solutions from database
  const dbSolutions = await db.solution.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
  });

  // Filter out any db solutions that match the static anchor slugs to avoid duplicates
  const dynamicSolutions = dbSolutions.filter(
    (s) => s.slug !== "nanofiberdressing" && s.slug !== "oncomatrix"
  );

  const anchorSolutions = [
    {
      id: "nanofiberdressing",
      slug: "nanofiberdressing",
      name: "Nanofiberdressing",
      stage: "TRL 5 — validação clínica em andamento",
      audience: "Hospitais, homecare, distribuidores",
      summary:
        "Curativo de nanofibras bioativas que acelera a regeneração de feridas crônicas, com liberação controlada de compostos naturais da Amazônia.",
      icon: <Activity className="h-12 w-12 text-primary" />,
      image:
        dbSolutions.find((s) => s.slug === "nanofiberdressing")?.imageUrl ||
        "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?w=800&q=80",
    },
    {
      id: "oncomatrix",
      slug: "oncomatrix",
      name: "OncoMatrix",
      stage: "Em desenvolvimento — Hackathon SUS",
      audience: "Hospitais, SUS, parceiros de P&D",
      summary:
        "Membrana nanofibrilar bioabsorvível para reconstrução de tecidos em cirurgias oncológicas — biomaterial médico desenvolvido a partir do Hackathon SUS.",
      icon: <ShieldPlus className="h-12 w-12 text-primary" />,
      image:
        dbSolutions.find((s) => s.slug === "oncomatrix")?.imageUrl ||
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
    },
  ];


  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
          <div className="absolute inset-0 bg-nanotech-grid-dark opacity-35 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[700px] h-[700px] bg-secondary/25 rounded-full blur-[130px] opacity-70 animate-float-slow" />
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[500px] h-[500px] bg-white/10 rounded-full blur-[110px] opacity-50 animate-float-reverse" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl reveal-on-scroll">
            <h1 className="text-5xl md:text-7xl font-heading tracking-tight mb-8 leading-[1.1]">
              <span className="font-light block mb-2">Da floresta ao laboratório,</span>
              <span className="font-bold">do laboratório para o mercado.</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 leading-relaxed font-light max-w-3xl">
              Três frentes de inovação nascidas da mesma plataforma tecnológica de nanoencapsulação de bioativos amazônicos.
            </p>
          </div>
        </div>
      </section>

      {/* Grid de Soluções */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Âncoras do Projeto (Nanofiberdressing e OncoMatrix) */}
            {anchorSolutions.map((solution, idx) => (
              <div key={solution.id} className={`reveal-on-scroll ${idx === 1 ? 'reveal-delay-200' : ''}`}>
                <SpotlightCard className="h-full bg-background rounded-[3rem] p-6 transition-all duration-300 border border-foreground/5 hover:border-primary/20 flex flex-col">
                  <Link
                    href={`/solucoes/${solution.slug}`}
                    className="group flex flex-col h-full"
                  >
                    <div className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden mb-8 bg-white">
                      {solution.image ? (
                        <Image
                          src={solution.image}
                          alt={solution.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-foreground/40 bg-foreground/5">
                          {solution.icon}
                        </div>
                      )}
                      <div className="absolute top-6 left-6 flex flex-col gap-2">
                        <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-xs font-bold tracking-wider rounded-full text-primary shadow-sm inline-block w-max">
                          {solution.stage}
                        </span>
                        <span className="px-4 py-2 bg-black/80 backdrop-blur-md text-xs font-medium tracking-wider rounded-full text-white shadow-sm inline-block w-max">
                          Público: {solution.audience}
                        </span>
                      </div>
                    </div>
                    
                    <div className="px-4 pb-6 flex flex-col flex-1">
                      <h2 className="text-3xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                        {solution.name}
                      </h2>
                      <p className="text-foreground/60 leading-relaxed font-light mb-8 flex-1 text-lg">
                        {solution.summary}
                      </p>
                      <div className="mt-auto">
                        <div className="w-full h-14 rounded-full border border-foreground/10 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors text-base font-medium flex items-center justify-center">
                          Saiba mais sobre {solution.name} <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </SpotlightCard>
              </div>
            ))}

            {/* Soluções Dinâmicas Cadastradas no Painel Administrativo */}
            {dynamicSolutions.map((solution, idx) => (
              <div key={solution.id} className={`reveal-on-scroll ${idx % 2 === 1 ? 'reveal-delay-200' : ''}`}>
                <SpotlightCard className="h-full bg-background rounded-[3rem] p-6 transition-all duration-300 border border-foreground/5 hover:border-primary/20 flex flex-col">
                  <Link
                    href={`/solucoes/${solution.slug}`}
                    className="group flex flex-col h-full"
                  >
                    <div className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden mb-8 bg-white">
                      {solution.imageUrl ? (
                        <Image
                          src={solution.imageUrl}
                          alt={solution.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-foreground/40 bg-foreground/5">
                          <Sparkles className="h-12 w-12 text-primary opacity-40" />
                        </div>
                      )}
                      <div className="absolute top-6 left-6 flex flex-col gap-2">
                        <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-xs font-bold tracking-wider rounded-full text-primary shadow-sm inline-block w-max">
                          {solution.stage || "Catálogo BioSpin"}
                        </span>
                        {solution.targetAudience && (
                          <span className="px-4 py-2 bg-black/80 backdrop-blur-md text-xs font-medium tracking-wider rounded-full text-white shadow-sm inline-block w-max">
                            Público: {solution.targetAudience}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="px-4 pb-6 flex flex-col flex-1">
                      <h2 className="text-3xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                        {solution.name}
                      </h2>
                      <p className="text-foreground/60 leading-relaxed font-light mb-8 flex-1 text-lg line-clamp-3">
                        {solution.summary}
                      </p>
                      <div className="mt-auto">
                        <div className="w-full h-14 rounded-full border border-foreground/10 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors text-base font-medium flex items-center justify-center">
                          Saiba mais sobre {solution.name} <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </SpotlightCard>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 bg-background text-center relative overflow-hidden reveal-on-scroll">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-nanotech-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-gradient-to-b from-secondary/15 to-transparent blur-3xl -z-10 animate-float-slow" />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-heading mb-8 leading-tight text-primary">
            <span className="font-light block mb-2">Interessado em</span>
            <span className="font-bold text-secondary">nossas tecnologias?</span>
          </h2>
          <p className="text-xl text-foreground/60 mb-12 font-light leading-relaxed">
            Fale com a nossa equipe para explorar oportunidades de co-desenvolvimento, aplicação clínica ou investimentos.
          </p>
          <Button size="lg" className="text-lg px-10 h-16 rounded-full" render={<Link href="/contato" />}>
            Fale com Especialistas
          </Button>
        </div>
      </section>
    </div>
  );
}
