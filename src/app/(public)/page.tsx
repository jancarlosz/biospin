import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Leaf, Microchip, ShieldCheck, HeartHandshake, Building2, Stethoscope, HandHeart, Sparkles } from "lucide-react";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/public/spotlight-card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const metadata = {
  title: "BioSpin | Nanotecnologia e Bioativos da Amazônia para Saúde e Beleza",
  description: "A BioSpin transforma bioativos amazônicos em nanotecnologia para saúde e beleza: curativos regenerativos, biomateriais médicos e cosméticos sustentáveis.",
};

export default async function HomePage() {
  const [solutions, posts] = await Promise.all([
    db.solution.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
    db.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 3,
      include: { category: true },
    }),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section com Grid Nanotecnológico e Orbes Orgânicos */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
          {/* Grid de precisão nanotecnológica */}
          <div className="absolute inset-0 bg-nanotech-grid opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
          {/* Formas orgânicas com animação fluida */}
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[130px] opacity-70 animate-float-slow" />
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[110px] opacity-60 animate-float-reverse" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl reveal-on-scroll">
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-primary/10 text-primary text-sm font-bold mb-8 tracking-wider uppercase border border-primary/20 shadow-xs">
              <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Deep Tech Amazônica
            </span>
            <h1 className="text-5xl md:text-7xl font-heading text-primary tracking-tight mb-8 leading-[1.1]">
              <span className="font-light block mb-2">Nanotecnologia que nasce na floresta</span>
              <span className="font-bold text-secondary">e regenera a pele.</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/75 mb-10 leading-relaxed font-light max-w-3xl">
              A BioSpin combina nanotecnologia de ponta com bioativos da Amazônia para criar nanofibras regenerativas, biomateriais médicos e cosméticos de alta performance. Com ciência validada e impacto positivo para comunidades extrativistas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base px-8 h-14" render={<Link href="/solucoes" />}>
                Conheça nossas soluções
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 h-14 border-foreground/10 hover:bg-foreground/5" render={<Link href="/contato" />}>
                Fale com um especialista
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Credenciais e Validação */}
      <section className="py-20 bg-white rounded-t-[3rem] -mt-8 relative z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.02)] overflow-hidden border-b border-foreground/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-foreground/40 mb-2">
            Parcerias científicas, fomento e validação institucional
          </p>
          <h2 className="text-3xl md:text-4xl font-heading text-primary font-bold">Ecossistema de Inovação</h2>
        </div>

        {/* Marquee: Apoio e Articulações Inline */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] mb-16 mt-6">
          <div className="animate-marquee flex items-center gap-10 md:gap-16 py-4 whitespace-nowrap">
            {[
              { type: "text", text: "APOIO:" },
              { src: "/certi.png", alt: "CERTI" },
              { src: "/catalisa.png", alt: "Catalisa ICT" },
              { src: "/logo-startup-acelerada.png", alt: "Startup Acelerada" },
              { src: "/logo-bezos.png", alt: "Bezos Earth Fund" },
              { src: "/inpa.png", alt: "INPA" },
              { src: "/logo-biospin-horizontal.png", alt: "BioSpin" },
              { type: "text", text: "ARTICULAÇÕES:" },
              { src: "/reblas.png", alt: "REBLAS" },
              { src: "/cba.png", alt: "CBA" },
              { src: "/swissnex.png", alt: "Swissnex" },
              { src: "/logo-penn-state.png", alt: "Penn State University" },
              { src: "/logo-zoma.png", alt: "Zoma" },
              // Repetido para scroll infinito
              { type: "text", text: "APOIO:" },
              { src: "/certi.png", alt: "CERTI" },
              { src: "/catalisa.png", alt: "Catalisa ICT" },
              { src: "/logo-startup-acelerada.png", alt: "Startup Acelerada" },
              { src: "/logo-bezos.png", alt: "Bezos Earth Fund" },
              { src: "/inpa.png", alt: "INPA" },
              { src: "/logo-biospin-horizontal.png", alt: "BioSpin" },
              { type: "text", text: "ARTICULAÇÕES:" },
              { src: "/reblas.png", alt: "REBLAS" },
              { src: "/cba.png", alt: "CBA" },
              { src: "/swissnex.png", alt: "Swissnex" },
              { src: "/logo-penn-state.png", alt: "Penn State University" },
              { src: "/logo-zoma.png", alt: "Zoma" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center shrink-0 cursor-default">
                 {item.type === "text" ? (
                   <span className="text-sm md:text-base font-bold text-primary uppercase tracking-[0.2em] px-4">{item.text}</span>
                 ) : (
                   <div className="relative h-12 w-28 md:h-14 md:w-36 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                     <Image src={item.src!} alt={item.alt!} fill className="object-contain" />
                   </div>
                 )}
              </div>
            ))}
          </div>
        </div>

        {/* Premiações e Destaques (Grid, Sem Carrossel) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 border-t border-foreground/5">
           <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-widest text-center mb-10">Reconhecimentos & Premiações</h3>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1: PEGN */}
              <div className="bg-[#f96901] rounded-[1.8rem] p-6 text-white flex flex-col justify-between items-center text-center overflow-hidden group shadow-md hover:shadow-xl transition-all h-64">
                <div className="flex-1 flex flex-col items-center justify-center gap-2">
                  <h4 className="font-bold text-sm opacity-90 uppercase tracking-wider mb-2">Destaque na Mídia</h4>
                  <div className="relative h-16 w-32 md:h-20 md:w-40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Image src="/p-e-g-n.png" alt="Pequenas Empresas e Grandes Negócios" fill className="object-contain drop-shadow-md" />
                  </div>
                </div>
                <p className="text-xs font-medium opacity-90 bg-white/20 px-4 py-1.5 rounded-full mt-2 backdrop-blur-sm">Edições Mai/Out 2026</p>
              </div>

              {/* Card 2: Top 1000 Sebrae */}
              <div className="relative h-64 bg-background rounded-[1.8rem] overflow-hidden border border-foreground/5 shadow-md group">
                <Image src="/Top 1000 Sebrae Startups_BioSpin.jpeg" alt="Top 1000 Sebrae Startups" fill className="object-contain transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a2f]/90 via-[#0a1a2f]/20 to-transparent flex flex-col justify-end p-5">
                  <h4 className="text-white font-bold text-lg mb-0.5 whitespace-normal leading-tight">Top 1000 Startups</h4>
                  <p className="text-white/70 text-xs font-medium whitespace-normal">Prêmio Sebrae Startups 2026</p>
                </div>
              </div>

              {/* Card 3: Hackathon SUS */}
              <div className="relative h-64 bg-[#031d49] rounded-[1.8rem] overflow-hidden border border-foreground/5 shadow-md group">
                <Image src="/Hackathon Sus.png" alt="Finalista Hackathon SUS" fill className="object-contain transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#031d49]/90 via-[#031d49]/20 to-transparent flex flex-col justify-end p-5">
                  <h4 className="text-white font-bold text-lg mb-0.5 whitespace-normal leading-tight">Finalista Hackathon SUS</h4>
                  <p className="text-white/70 text-xs font-medium whitespace-normal">Inovação Aberta em Saúde Pública</p>
                </div>
              </div>

              {/* Card 4: Jaraqui Valley */}
              <div className="relative h-64 bg-background rounded-[1.8rem] overflow-hidden border border-foreground/5 shadow-md group bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center p-8">
                <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
                  <Image src="/jaraqui.png" alt="Top 3 Jaraqui Valley" fill className="object-contain" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a2f]/90 via-[#0a1a2f]/10 to-transparent flex flex-col justify-end p-5">
                  <h4 className="text-white font-bold text-lg mb-0.5 whitespace-normal leading-tight">Top 3 Startups</h4>
                  <p className="text-white/70 text-xs font-medium whitespace-normal">Jaraqui Valley</p>
                </div>
              </div>

           </div>
        </div>
      </section>

      {/* Featured Solutions */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-6 reveal-on-scroll">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-heading text-primary mb-4 leading-tight">
                <span className="font-light">Nossas</span> <span className="font-bold text-secondary">Soluções</span>
              </h2>
              <p className="text-xl text-foreground/60 font-light">
                Três frentes de inovação nascidas da mesma plataforma tecnológica.
              </p>
            </div>
            <Button variant="ghost" className="hidden md:flex text-primary hover:text-primary hover:bg-primary/5 font-semibold group" render={<Link href="/solucoes" />}>
              Ver portfólio completo <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {solutions.length > 0 ? (
              solutions.filter(s => s.slug !== 'oncomatrix').map((solution, idx) => {
                const defaultImages: Record<string, string> = {
                  nanofiberdressing: "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?w=800&q=80",
                  oncomatrix: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
                };
                const solutionImage = solution.imageUrl || defaultImages[solution.slug];

                return (
                  <div key={solution.id} className={`reveal-on-scroll ${idx === 1 ? 'reveal-delay-200' : ''}`}>
                    <SpotlightCard className="h-full bg-background rounded-[2rem] p-6 border border-foreground/5 hover:border-primary/20 transition-all duration-300">
                      <Link
                        href={`/solucoes/${solution.slug}`}
                        className="group block h-full flex flex-col"
                      >
                        <div className="relative aspect-[16/9] rounded-[1.5rem] overflow-hidden mb-6 bg-white">
                          {solutionImage ? (
                            <Image
                              src={solutionImage}
                              alt={solution.name}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-foreground/40 bg-foreground/5">
                              <Microchip className="h-12 w-12 opacity-20" />
                            </div>
                          )}
                        </div>
                        <div className="px-2 pb-2 flex-1 flex flex-col">
                          <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                            {solution.name}
                          </h3>
                        <p className="text-foreground/60 leading-relaxed font-light line-clamp-3 text-base mb-4 flex-1">
                          {solution.summary}
                        </p>
                        <span className="text-primary font-medium inline-flex items-center text-sm group-hover:underline mt-auto">
                          Conhecer solução <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </SpotlightCard>
                </div>
              );
            })
          ) : (
              <>
                {/* Card 1 — Nanofiberdressing (PROJECT-SPEC 3.3) */}
                <div className="reveal-on-scroll">
                  <SpotlightCard className="h-full bg-background rounded-[2rem] p-6 border border-foreground/5 hover:border-primary/20 transition-all duration-300">
                    <Link
                      href="/solucoes/nanofiberdressing"
                      className="group block h-full flex flex-col"
                    >
                      <div className="relative aspect-[16/9] rounded-[1.5rem] overflow-hidden mb-6 bg-white">
                        <Image
                          src="https://images.unsplash.com/photo-1583324113626-70df0f4deaab?w=800&q=80"
                          alt="Nanofiberdressing"
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur-md text-xs font-bold text-primary rounded-full shadow-sm">
                          TRL 5 · Validação em andamento
                        </span>
                      </div>
                      <div className="px-2 pb-2 flex-1 flex flex-col">
                        <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                          Nanofiberdressing
                        </h3>
                        <p className="text-foreground/60 leading-relaxed font-light text-base mb-4 flex-1">
                          Curativo de nanofibras bioativas que acelera a regeneração de feridas crônicas, com liberação controlada de compostos naturais da Amazônia.
                        </p>
                        <span className="text-primary font-medium inline-flex items-center text-sm group-hover:underline mt-auto">
                          Conhecer Nanofiberdressing <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </SpotlightCard>
                </div>
              </>
            )}
          </div>
          
          <div className="mt-10 md:hidden">
            <Button variant="outline" className="w-full h-14 rounded-full border-foreground/10 text-foreground" render={<Link href="/solucoes" />}>
              Ver todas as soluções
            </Button>
          </div>
        </div>
      </section>

      {/* Para quem é a BioSpin */}
      <section className="py-32 bg-primary text-primary-foreground rounded-[3rem] mx-4 sm:mx-6 lg:mx-8 mb-24 overflow-hidden relative reveal-on-scroll">
        <div className="absolute inset-0 z-0 opacity-10">
           <svg className="absolute left-0 top-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,0 C30,40 70,60 100,0 L100,100 L0,100 Z" fill="currentColor" />
           </svg>
        </div>
        {/* Glow sutil de fundo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-20 reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-heading mb-6 leading-tight">
              <span className="font-light">Para quem é a</span> <span className="font-bold">BioSpin</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="reveal-on-scroll reveal-delay-100">
              <SpotlightCard spotlightColor="rgba(255, 255, 255, 0.12)" className="h-full bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm transition-all hover:bg-white/10 flex flex-col">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8 backdrop-blur-md">
                  <Stethoscope className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Hospitais e profissionais de saúde</h3>
                <p className="text-primary-foreground/80 leading-relaxed mb-8 font-light flex-1 text-lg">
                  Curativos e biomateriais para tratamento de feridas complexas e reconstrução tecidual.
                </p>
                <Link href="/solucoes" className="font-medium hover:text-secondary inline-flex items-center transition-colors group mt-auto">
                  Ver Nanofiberdressing <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </SpotlightCard>
            </div>
            
            <div className="reveal-on-scroll reveal-delay-200">
              <SpotlightCard spotlightColor="rgba(255, 255, 255, 0.12)" className="h-full bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm transition-all hover:bg-white/10 flex flex-col">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8 backdrop-blur-md">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Indústria e parceiros</h3>
                <p className="text-primary-foreground/80 leading-relaxed mb-8 font-light flex-1 text-lg">
                  Nanoemulsões, bioativos e consultoria em P&D para cosméticos e farmacêuticos.
                </p>
                <Link href="/contato" className="font-medium hover:text-secondary inline-flex items-center transition-colors group mt-auto">
                  Falar com a equipe <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </SpotlightCard>
            </div>
            
            <div className="reveal-on-scroll reveal-delay-300">
              <SpotlightCard spotlightColor="rgba(255, 255, 255, 0.12)" className="h-full bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm transition-all hover:bg-white/10 flex flex-col">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8 backdrop-blur-md">
                  <HeartHandshake className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Investidores e fomento</h3>
                <p className="text-primary-foreground/80 leading-relaxed mb-8 font-light flex-1 text-lg">
                  Trajetória, ciência e tração de uma deeptech amazônica.
                </p>
                <Link href="/sobre" className="font-medium hover:text-secondary inline-flex items-center transition-colors group mt-auto">
                  Conheça a BioSpin <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </section>

      {/* Por que BioSpin */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20 max-w-3xl reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-heading text-primary mb-6 leading-tight">
              <span className="font-light">Por que</span> <span className="font-bold text-secondary">BioSpin</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="reveal-on-scroll reveal-delay-100">
              <SpotlightCard className="h-full bg-white p-8 rounded-[2rem] border border-foreground/5 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
                <Leaf className="h-10 w-10 text-secondary mb-6" />
                <p className="text-foreground font-semibold text-lg leading-snug">Bioativos exclusivos da biodiversidade amazônica</p>
              </SpotlightCard>
            </div>
            
            <div className="reveal-on-scroll reveal-delay-200">
              <SpotlightCard className="h-full bg-white p-8 rounded-[2rem] border border-foreground/5 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
                <Microchip className="h-10 w-10 text-secondary mb-6" />
                <p className="text-foreground font-semibold text-lg leading-snug">Nanotecnologia própria de encapsulação e liberação controlada</p>
              </SpotlightCard>
            </div>
            
            <div className="reveal-on-scroll reveal-delay-300">
              <SpotlightCard className="h-full bg-white p-8 rounded-[2rem] border border-foreground/5 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
                <ShieldCheck className="h-10 w-10 text-secondary mb-6" />
                <p className="text-foreground font-semibold text-lg leading-snug">Ciência validada por instituições e parcerias estratégicas</p>
              </SpotlightCard>
            </div>

            <div className="reveal-on-scroll reveal-delay-400">
              <SpotlightCard className="h-full bg-white p-8 rounded-[2rem] border border-foreground/5 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
                <HandHeart className="h-10 w-10 text-secondary mb-6" />
                <p className="text-foreground font-semibold text-lg leading-snug">Impacto social com repartição ética de benefícios</p>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-6 reveal-on-scroll">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-heading text-primary mb-4 leading-tight">
                <span className="font-light">Blog &</span> <span className="font-bold text-secondary">Pesquisa</span>
              </h2>
              <p className="text-xl text-foreground/60 font-light">
                Acompanhe as últimas novidades, artigos e descobertas da BioSpin.
              </p>
            </div>
            <Button variant="ghost" className="hidden md:flex text-primary hover:text-primary hover:bg-primary/5 font-semibold group" render={<Link href="/blog" />}>
              Ir para o Blog <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.length > 0 ? (
              posts.map((post, idx) => (
                <div key={post.id} className={`reveal-on-scroll ${idx === 1 ? 'reveal-delay-100' : idx === 2 ? 'reveal-delay-200' : ''}`}>
                  <SpotlightCard className="h-full bg-white rounded-[2rem] p-4 border border-foreground/5 hover:border-primary/20 transition-all duration-300">
                    <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full">
                      <div className="relative aspect-[4/3] bg-background rounded-[1.5rem] overflow-hidden mb-5">
                        {post.coverImageUrl ? (
                          <Image
                            src={post.coverImageUrl}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-foreground/40 bg-foreground/5">Sem Capa</div>
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-xs font-bold uppercase tracking-wider rounded-full text-primary shadow-sm">
                            {post.category.name}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col flex-1 px-2">
                        <div className="text-sm text-foreground/50 mb-3 font-medium">
                          {post.publishedAt ? format(new Date(post.publishedAt), "dd 'de' MMMM, yyyy", { locale: ptBR }) : ""}
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                          {post.title}
                        </h3>
                        <p className="text-foreground/60 font-light line-clamp-2 mb-4 flex-1 text-base">
                          {post.excerpt || "Leia mais..."}
                        </p>
                        <span className="text-primary font-medium inline-flex items-center text-sm group-hover:underline mt-auto">
                          Ler artigo completo <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </SpotlightCard>
                </div>
              ))
            ) : (
              <p className="text-foreground/50 col-span-3">Nenhum artigo publicado no momento.</p>
            )}
          </div>
          
          <div className="mt-12 md:hidden">
            <Button variant="outline" className="w-full h-14 rounded-full border-foreground/10 text-foreground" render={<Link href="/blog" />}>
              Ler o blog
            </Button>
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
          <h2 className="text-5xl md:text-7xl font-heading mb-8 leading-tight text-primary">
            <span className="font-light block">Vamos regenerar</span>
            <span className="font-bold text-secondary">junto com a floresta.</span>
          </h2>
          <p className="text-xl text-foreground/60 mb-12 font-light leading-relaxed">
            Fale com a nossa equipe para conhecer nossas soluções, discutir parcerias ou saber mais sobre a ciência por trás da BioSpin.
          </p>
          <Button size="lg" className="text-lg px-10 h-16 rounded-full" render={<Link href="/contato" />}>
            Fale com a BioSpin
          </Button>
        </div>
      </section>
    </div>
  );
}
