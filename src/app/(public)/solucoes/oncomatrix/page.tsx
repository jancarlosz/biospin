import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ShieldPlus, Layers, Hospital, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/public/spotlight-card";
import { OncomatrixForm } from "@/components/public/oncomatrix-form";

export const metadata = {
  title: "OncoMatrix | Membrana Nanofibrilar Bioabsorvível para Cirurgia Oncológica",
  description: "OncoMatrix é a membrana nanofibrilar bioabsorvível da BioSpin para reconstrução de tecidos em cirurgias oncológicas, desenvolvida a partir do Hackathon SUS.",
};

export default function OncoMatrixPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 z-0 opacity-20">
           <Image
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600&q=80"
              alt="OncoMatrix"
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
              OncoMatrix · Hackathon SUS Desafio 2
            </span>
            <h1 className="text-5xl md:text-7xl font-heading tracking-tight mb-8 leading-[1.1]">
              <span className="font-light block mb-2">Um biomaterial para devolver estrutura</span>
              <span className="font-bold">ao tecido depois do câncer.</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 leading-relaxed font-light max-w-3xl mb-10 border-l-4 border-secondary pl-6">
              Membrana nanofibrilar bioabsorvível desenvolvida para apoiar a reconstrução de tecidos em cirurgias oncológicas, unindo ciência de materiais e as necessidades reais do SUS.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="text-base px-8 h-14 rounded-full shadow-lg" render={<Link href="#contato" />}>
                Quero saber mais
              </Button>
              <Button size="lg" variant="outline-white" className="text-base px-8 h-14 rounded-full" render={<Link href="#contato" />}>
                Falar com a equipe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* O Problema & A Solução */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            <div className="reveal-on-scroll">
              <SpotlightCard className="h-full bg-background rounded-[2.5rem] p-10 md:p-12 border border-foreground/5 shadow-[0_10px_40px_rgba(0,0,0,0.02)] transition-all duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
                  <Hospital className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold font-heading text-primary mb-6">O Problema</h2>
                <p className="text-foreground/70 font-light leading-relaxed text-lg">
                  Cirurgias oncológicas que envolvem remoção de tecido frequentemente exigem soluções de reconstrução — nem sempre acessíveis ou adaptadas à realidade do sistema público de saúde brasileiro. As opções disponíveis no mercado geralmente possuem alto custo, dificultando a incorporação em larga escala.
                </p>
              </SpotlightCard>
            </div>
            
            <div className="reveal-on-scroll reveal-delay-200">
              <SpotlightCard spotlightColor="rgba(255, 255, 255, 0.15)" className="h-full bg-primary text-primary-foreground rounded-[2.5rem] p-10 md:p-12 shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8">
                  <Layers className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold font-heading text-white mb-6">A Solução</h2>
                <p className="text-primary-foreground/90 font-light leading-relaxed text-lg mb-8">
                  O OncoMatrix é uma membrana nanofibrilar bioabsorvível. Um biomaterial que serve de suporte estrutural (scaffold) para a regeneração de tecidos após procedimentos oncológicos, sendo absorvido pelo organismo ao longo do processo de cicatrização.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4 text-primary-foreground/80 font-light">
                    <CheckCircle2 className="h-6 w-6 text-cyan-300 shrink-0" /> Estrutura nanofibrilar bioabsorvível, sem necessidade de remoção cirúrgica posterior
                  </li>
                  <li className="flex items-start gap-4 text-primary-foreground/80 font-light">
                    <CheckCircle2 className="h-6 w-6 text-cyan-300 shrink-0" /> Desenvolvido a partir da mesma plataforma de nanotecnologia do Nanofiberdressing
                  </li>
                  <li className="flex items-start gap-4 text-primary-foreground/80 font-light">
                    <CheckCircle2 className="h-6 w-6 text-cyan-300 shrink-0" /> Pensado para se conectar aos fluxos de incorporação de tecnologia do SUS
                  </li>
                </ul>
              </SpotlightCard>
            </div>

          </div>
        </div>
      </section>

      {/* Origem e Validação */}
      <section className="py-32 bg-background relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-heading text-primary mb-6 leading-tight">
              <span className="font-light">Origem e</span> <span className="font-bold text-secondary">Validação</span>
            </h2>
            <p className="text-xl text-foreground/70 font-light leading-relaxed">
              O OncoMatrix nasceu como resposta ao Desafio 2 do Hackathon SUS, um dos principais programas de inovação aberta em saúde pública do país. O projeto segue em desenvolvimento técnico-científico.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="reveal-on-scroll reveal-delay-100">
              <SpotlightCard className="h-full bg-white p-8 rounded-[2rem] border border-foreground/5 flex flex-col items-center text-center transition-all duration-300">
                <ShieldPlus className="h-10 w-10 text-secondary mb-4" />
                <p className="text-foreground font-medium text-lg leading-snug">Selecionado no Hackathon SUS — Desafio 2</p>
              </SpotlightCard>
            </div>
            
            <div className="reveal-on-scroll reveal-delay-200">
              <SpotlightCard className="h-full bg-white p-8 rounded-[2rem] border border-foreground/5 flex flex-col items-center text-center transition-all duration-300">
                <ShieldPlus className="h-10 w-10 text-secondary mb-4" />
                <p className="text-foreground font-medium text-lg leading-snug">Desenvolvido com base científica do LTMN/INPA</p>
              </SpotlightCard>
            </div>
            
            <div className="reveal-on-scroll reveal-delay-300">
              <SpotlightCard className="h-full bg-white p-8 rounded-[2rem] border border-foreground/5 flex flex-col items-center text-center transition-all duration-300">
                <ShieldPlus className="h-10 w-10 text-secondary mb-4" />
                <p className="text-foreground font-medium text-lg leading-snug">Alinhado aos critérios de incorporação da ANVISA/SUS</p>
              </SpotlightCard>
            </div>
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
                <span className="font-bold text-secondary">OncoMatrix?</span>
              </h2>
              <p className="text-xl text-foreground/70 font-light leading-relaxed mb-10">
                Esta solução está em estágio de desenvolvimento. Buscamos parceiros estratégicos para avançar na pesquisa e validação.
              </p>
              
              <ul className="space-y-4 mb-12">
                <li className="flex items-center gap-4 text-foreground/80 font-medium text-lg p-4 bg-background rounded-2xl">
                  <Hospital className="h-6 w-6 text-primary shrink-0" /> Hospitais e serviços de cirurgia oncológica
                </li>
                <li className="flex items-center gap-4 text-foreground/80 font-medium text-lg p-4 bg-background rounded-2xl">
                  <Users className="h-6 w-6 text-primary shrink-0" /> Gestores de saúde pública e SUS
                </li>
                <li className="flex items-center gap-4 text-foreground/80 font-medium text-lg p-4 bg-background rounded-2xl">
                  <ShieldPlus className="h-6 w-6 text-primary shrink-0" /> Parceiros de P&D e investidores em dispositivos
                </li>
              </ul>
            </div>
            
            <div className="reveal-on-scroll reveal-delay-200">
              <SpotlightCard className="bg-background p-10 rounded-[2.5rem] border border-foreground/5 shadow-[0_10px_40px_rgba(0,0,0,0.02)]">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold font-heading text-foreground mb-4">Quer acompanhar o desenvolvimento?</h3>
                  <p className="text-foreground/60 font-light">
                    Estamos construindo parcerias com hospitais, pesquisadores e instituições de saúde pública para validar o OncoMatrix. Fale com a gente.
                  </p>
                </div>
                <OncomatrixForm />
              </SpotlightCard>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
