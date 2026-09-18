import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Activity, Clock, ShieldCheck, Microchip, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/public/spotlight-card";
import { NanofiberdressingForm } from "@/components/public/nanofiberdressing-form";

export const metadata = {
  title: "Nanofiberdressing | Curativo Bioativo BioSpin para Feridas Crônicas",
  description: "Curativo bioativo da BioSpin acelera a cicatrização de feridas crônicas com nanofibras e ativos da Amazônia. TRL 5, validação clínica em andamento.",
};

export default function NanofiberdressingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 z-0 opacity-20">
           <Image
              src="https://images.unsplash.com/photo-1583324113626-70df0f4deaab?w=1600&q=80"
              alt="Nanofiberdressing"
              fill
              className="object-cover"
              priority
           />
           <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent" />
        </div>
        
        {/* Grid nanotecnológico e orbes orgânicos */}
        <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
          <div className="absolute inset-0 bg-nanotech-grid-dark opacity-35 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[700px] h-[700px] bg-secondary/25 rounded-full blur-[130px] opacity-70 animate-float-slow" />
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[500px] h-[500px] bg-white/10 rounded-full blur-[110px] opacity-50 animate-float-reverse" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl reveal-on-scroll">
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-bold mb-8 tracking-wider uppercase border border-white/20">
              Nanofiberdressing · TRL 5
            </span>
            <h1 className="text-5xl md:text-7xl font-heading tracking-tight mb-8 leading-[1.1]">
              <span className="font-light block mb-2">Menos tempo de cicatrização.</span>
              <span className="font-bold">Mais qualidade de vida.</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 leading-relaxed font-light max-w-3xl mb-10 border-l-4 border-secondary pl-6">
              Nanofibras bioativas desenvolvidas para reduzir drasticamente o tempo de cicatrização de feridas crônicas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Button size="lg" variant="secondary" className="text-base px-8 h-14 rounded-full shadow-lg" render={<Link href="#contato" />}>
                Solicitar demonstração
              </Button>
              <Button size="lg" variant="outline-white" className="text-base px-8 h-14 rounded-full" render={<Link href="#como-funciona" />}>
                Como funciona
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm font-medium text-primary-foreground/70">
              <div className="flex items-center gap-2 bg-black/20 rounded-full px-4 py-2 backdrop-blur-sm"><CheckCircle2 className="h-4 w-4 text-cyan-300" /> Validação clínica em andamento</div>
              <div className="flex items-center gap-2 bg-black/20 rounded-full px-4 py-2 backdrop-blur-sm"><CheckCircle2 className="h-4 w-4 text-cyan-300" /> Bioativos sustentáveis</div>
              <div className="flex items-center gap-2 bg-black/20 rounded-full px-4 py-2 backdrop-blur-sm"><CheckCircle2 className="h-4 w-4 text-cyan-300" /> Tecnologia da Amazônia</div>
            </div>
          </div>
        </div>
      </section>

      {/* O Problema */}
      <section className="py-32 bg-background relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-heading text-primary mb-6 leading-tight">
              <span className="font-light">O tempo é inimigo do</span> <span className="font-bold text-secondary">pé diabético.</span>
            </h2>
            <p className="text-xl text-foreground/70 font-light leading-relaxed">
              No Brasil, são 28 amputações por dia ligadas ao pé diabético, segundo o Ministério da Saúde. Feridas crônicas demoram semanas, quando não meses, para cicatrizar. E se esse tempo caísse drasticamente, com um curativo que entrega bioativos diretamente onde a pele precisa regenerar?
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="reveal-on-scroll reveal-delay-100">
              <SpotlightCard className="h-full bg-white p-8 rounded-[2rem] border border-foreground/5 shadow-[0_10px_40px_rgba(0,0,0,0.02)] transition-all duration-300">
                <p className="text-4xl font-bold text-primary mb-2">28</p>
                <p className="text-foreground/70 font-light leading-snug">amputações por dia no Brasil</p>
              </SpotlightCard>
            </div>
            <div className="reveal-on-scroll reveal-delay-200">
              <SpotlightCard className="h-full bg-white p-8 rounded-[2rem] border border-foreground/5 shadow-[0_10px_40px_rgba(0,0,0,0.02)] transition-all duration-300">
                <p className="text-4xl font-bold text-primary mb-2">US$ 35 bi</p>
                <p className="text-foreground/70 font-light leading-snug">mercado global de curativos até 2032</p>
              </SpotlightCard>
            </div>
            <div className="reveal-on-scroll reveal-delay-300">
              <SpotlightCard className="h-full bg-white p-8 rounded-[2rem] border border-foreground/5 shadow-[0_10px_40px_rgba(0,0,0,0.02)] transition-all duration-300">
                <p className="text-4xl font-bold text-primary mb-2">TRL 5</p>
                <p className="text-foreground/70 font-light leading-snug">maturidade tecnológica validada</p>
              </SpotlightCard>
            </div>
            <div className="reveal-on-scroll reveal-delay-400">
              <SpotlightCard className="h-full bg-white p-8 rounded-[2rem] border border-foreground/5 shadow-[0_10px_40px_rgba(0,0,0,0.02)] transition-all duration-300">
                <p className="text-4xl font-bold text-primary mb-2">10</p>
                <p className="text-foreground/70 font-light leading-snug">clientes em prospecção ativa</p>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </section>

      {/* A Solução */}
      <section id="como-funciona" className="py-32 bg-white relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-20 reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-heading text-primary mb-6 leading-tight">
              <span className="font-bold text-secondary">Nanofibras bioativas</span> <span className="font-light">que regeneram a pele de dentro para fora.</span>
            </h2>
            <p className="text-xl text-foreground/60 font-light leading-relaxed">
              Nosso curativo avançado combina uma malha de nanofibras com bioativos da Amazônia nanoencapsulados, para liberação controlada e ação direta na ferida, acelerando a regeneração tecidual.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="reveal-on-scroll">
              <SpotlightCard className="h-full bg-background rounded-[2.5rem] p-10 md:p-12 border border-foreground/5 transition-all duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
                  <Microchip className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Nanofibras Bioativas</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4 text-foreground/70 font-light text-lg">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" /> Estrutura tridimensional que imita a matriz extracelular
                  </li>
                  <li className="flex items-start gap-4 text-foreground/70 font-light text-lg">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" /> Liberação controlada de bioativos por dias
                  </li>
                  <li className="flex items-start gap-4 text-foreground/70 font-light text-lg">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" /> Scaffold ideal para regeneração tecidual
                  </li>
                </ul>
              </SpotlightCard>
            </div>
            
            <div className="reveal-on-scroll reveal-delay-200">
              <SpotlightCard className="h-full bg-background rounded-[2.5rem] p-10 md:p-12 border border-foreground/5 transition-all duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
                  <Activity className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Bioativos Amazônicos</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4 text-foreground/70 font-light text-lg">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" /> <strong>Copaíba:</strong> anti-inflamatório natural
                  </li>
                  <li className="flex items-start gap-4 text-foreground/70 font-light text-lg">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" /> <strong>Pracaxi:</strong> regeneração e hidratação intensiva
                  </li>
                  <li className="flex items-start gap-4 text-foreground/70 font-light text-lg">
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" /> <strong>Castanha-da-Amazônia:</strong> rica em ácidos graxos essenciais
                  </li>
                </ul>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-32 bg-primary text-primary-foreground relative z-30 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/15 rounded-full blur-[130px] animate-float-slow" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[110px] animate-float-reverse" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="reveal-on-scroll">
              <h2 className="text-4xl md:text-5xl font-heading mb-8 leading-tight">
                <span className="font-light block mb-2">Por que escolher o</span>
                <span className="font-bold text-white">Nanofiberdressing</span>
              </h2>
              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-bold text-cyan-300 mb-2">Cicatrização acelerada</h4>
                  <p className="text-primary-foreground/80 font-light leading-relaxed">A liberação controlada de bioativos otimiza o tempo de regeneração tecidual em feridas crônicas.</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-cyan-300 mb-2">100% bioativos amazônicos</h4>
                  <p className="text-primary-foreground/80 font-light leading-relaxed">Copaíba, pracaxi e castanha, conhecidos por suas potentes propriedades anti-inflamatórias e cicatrizantes.</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-cyan-300 mb-2">Segurança em validação</h4>
                  <p className="text-primary-foreground/80 font-light leading-relaxed">Curativo em fase de validação clínica, TRL 5, com prospecções ativas em hospitais e parceiros homecare.</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-cyan-300 mb-2">Tecnologia escalável</h4>
                  <p className="text-primary-foreground/80 font-light leading-relaxed">Nossa plataforma de nanomateriais permite fácil adaptação para diferentes aplicações biomédicas e industriais.</p>
                </div>
              </div>
            </div>
            
            <div className="reveal-on-scroll reveal-delay-200">
              <SpotlightCard spotlightColor="rgba(255, 255, 255, 0.15)" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10">
                <h3 className="text-2xl font-bold text-white mb-6">Mais vantagens clínicas</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4 text-primary-foreground/90 font-light text-lg bg-black/20 p-4 rounded-[1.5rem]">
                    <CheckCircle2 className="h-5 w-5 text-cyan-300 shrink-0" /> Ambiente ideal para regeneração tecidual
                  </li>
                  <li className="flex items-center gap-4 text-primary-foreground/90 font-light text-lg bg-black/20 p-4 rounded-[1.5rem]">
                    <CheckCircle2 className="h-5 w-5 text-cyan-300 shrink-0" /> Menor manipulação da ferida
                  </li>
                  <li className="flex items-center gap-4 text-primary-foreground/90 font-light text-lg bg-black/20 p-4 rounded-[1.5rem]">
                    <CheckCircle2 className="h-5 w-5 text-cyan-300 shrink-0" /> Aplicação simples e segura
                  </li>
                </ul>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </section>

      {/* Vídeo / Demonstração */}
      <section className="py-32 bg-background relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
            <h2 className="text-4xl font-heading text-foreground mb-4">
              <span className="font-bold text-primary">Assista:</span> <span className="font-light">Curativos avançados BioSpin</span>
            </h2>
            <p className="text-foreground/60 font-light text-lg">Entenda a ciência por trás do Nanofiberdressing e como ele atua na matriz da pele.</p>
          </div>
          <div className="max-w-4xl mx-auto aspect-video bg-foreground/5 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden group cursor-pointer border border-foreground/10 reveal-on-scroll">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
            <Play className="h-20 w-20 text-white z-20 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all drop-shadow-lg" />
            <p className="absolute bottom-6 left-6 text-white font-medium z-20">Vídeo Institucional</p>
          </div>
        </div>
      </section>

      {/* Para Quem é & Contato */}
      <section id="contato" className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div className="reveal-on-scroll">
              <h2 className="text-4xl md:text-5xl font-heading text-primary mb-6 leading-tight">
                <span className="font-light block mb-2">Para quem é o</span>
                <span className="font-bold text-secondary">Nanofiberdressing?</span>
              </h2>
              <p className="text-xl text-foreground/70 font-light leading-relaxed mb-10">
                Buscamos parceiros interessados em testar e co-desenvolver o Nanofiberdressing como curativo avançado de próxima geração.
              </p>
              
              <ul className="space-y-4 mb-12">
                <li className="flex items-center gap-4 text-foreground/80 font-medium text-lg p-4 bg-background rounded-2xl">
                  <ShieldCheck className="h-6 w-6 text-primary shrink-0" /> Hospitais, enfermeiros homecare e clínicas
                </li>
                <li className="flex items-center gap-4 text-foreground/80 font-medium text-lg p-4 bg-background rounded-2xl">
                  <ShieldCheck className="h-6 w-6 text-primary shrink-0" /> Empresas de dispositivos médicos
                </li>
                <li className="flex items-center gap-4 text-foreground/80 font-medium text-lg p-4 bg-background rounded-2xl">
                  <ShieldCheck className="h-6 w-6 text-primary shrink-0" /> Sistemas públicos de saúde (SUS)
                </li>
                <li className="flex items-center gap-4 text-foreground/80 font-medium text-lg p-4 bg-background rounded-2xl">
                  <ShieldCheck className="h-6 w-6 text-primary shrink-0" /> Distribuidores e parceiros industriais
                </li>
              </ul>
            </div>
            
            <div className="reveal-on-scroll reveal-delay-200">
              <SpotlightCard className="bg-background p-10 rounded-[2.5rem] border border-foreground/5 shadow-[0_10px_40px_rgba(0,0,0,0.02)]">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold font-heading text-foreground mb-4">Fale com o time BioSpin</h3>
                  <p className="text-foreground/60 font-light">
                    Conte sobre seu interesse no Nanofiberdressing. Retornamos com material técnico, casos de uso e oportunidades de validação.
                  </p>
                </div>
                <NanofiberdressingForm />
                <div className="mt-6 flex flex-wrap gap-4 text-xs font-medium text-foreground/50">
                  <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Resposta em 2 dias</span>
                  <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Atendimento técnico</span>
                  <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Confidencialidade</span>
                </div>
              </SpotlightCard>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
