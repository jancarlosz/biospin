import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Layers,
  Atom,
  Microscope,
  FlaskConical,
  CheckCircle2,
  Building2,
  GraduationCap,
  Handshake,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/public/spotlight-card";
import { TechAccordion } from "@/components/public/tech-accordion";
import { TechApplications } from "@/components/public/tech-applications";
import { TechContactForm } from "@/components/public/tech-contact-form";

export const metadata: Metadata = {
  title: "Tecnologia | BioSpin — A próxima escala do cuidado",
  description:
    "BioSpin: deeptech brasileira dedicada à engenharia de nanofibras, biomateriais bioativos e pesquisa em regeneração tecidual.",
};

const platformItems = [
  {
    number: "01",
    title: "Engenharia de nanofibras",
    iconKey: "layers" as const,
    body: "Explorar a organização de fibras, porosidade e características de superfície como variáveis de projeto para biomateriais.",
  },
  {
    number: "02",
    title: "Biomateriais bioativos",
    iconKey: "atom" as const,
    body: "Investigar a associação entre matrizes e componentes bioativos, considerando compatibilidade, estabilidade e função pretendida.",
  },
  {
    number: "03",
    title: "Interfaces biológicas",
    iconKey: "microscope" as const,
    body: "Estudar a interação entre materiais e sistemas biológicos por meio de protocolos adequados à hipótese e ao estágio de desenvolvimento.",
  },
  {
    number: "04",
    title: "Desenvolvimento orientado por evidências",
    iconKey: "shield" as const,
    body: "Definir requisitos, documentar resultados e revisar decisões. O avanço depende de caracterização, validação e avaliação regulatória aplicável.",
  },
];

const researchSteps = [
  {
    number: "01",
    label: "DEFINIR",
    icon: Layers,
    title: "O desafio",
    body: "Entender o contexto de aplicação e estabelecer os requisitos do material.",
  },
  {
    number: "02",
    label: "PROJETAR",
    icon: Atom,
    title: "A estrutura",
    body: "Relacionar composição, arquitetura e propriedades desejadas.",
  },
  {
    number: "03",
    label: "INVESTIGAR",
    icon: Microscope,
    title: "As evidências",
    body: "Caracterizar o material e avaliar respostas em modelos pertinentes.",
  },
  {
    number: "04",
    label: "AVALIAR",
    icon: FlaskConical,
    title: "O próximo passo",
    body: "Analisar reprodutibilidade, viabilidade e exigências de validação.",
  },
];

export default function TecnologiaPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">

      {/* ── HERO DA PÁGINA ────────────────────────────────────────── */}
      <section
        id="inicio"
        className="relative pt-28 pb-16 md:pt-36 md:pb-20 min-h-[640px] md:min-h-[750px] flex items-center overflow-hidden bg-primary text-primary-foreground"
      >
        {/* Grid nanotecnológico e ambiência orgânica fluida idênticos aos de Soluções e Blog */}
        <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
          <div className="absolute inset-0 bg-nanotech-grid-dark opacity-35 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[700px] h-[700px] bg-secondary/25 rounded-full blur-[130px] opacity-70 animate-float-slow" />
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[500px] h-[500px] bg-white/10 rounded-full blur-[110px] opacity-50 animate-float-reverse" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-4xl reveal-on-scroll">
            {/* Selo Kicker Institucional */}
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-bold mb-6 tracking-wider uppercase border border-white/20">
              <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse" />
              CIÊNCIA BRASILEIRA. POSSIBILIDADES SEM FRONTEIRAS.
            </span>

            {/* Título Principal com a Formatação Oficial da BioSpin */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading tracking-tight mb-6 leading-[1.1]">
              <span className="font-light block mb-2">O futuro do cuidado começa</span>
              <span className="inline-block whitespace-nowrap">
                <span className="font-light">em uma </span>
                <span className="font-bold">nova escala.</span>
              </span>
            </h1>

            {/* Subtítulo */}
            <p className="text-xl md:text-2xl text-primary-foreground/80 leading-relaxed font-light max-w-3xl mb-8">
              Engenharia de nanofibras e biomateriais bioativos para explorar novas possibilidades em regeneração tecidual.
            </p>

            {/* Botões de Ação Padronizados */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="text-base px-8 h-14 rounded-full bg-white text-primary hover:bg-white/90 shadow-lg font-semibold group"
                render={<Link href="#plataforma" />}
              >
                <span>Explore a plataforma</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline-white"
                className="text-base px-8 h-14 rounded-full border border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-md shadow-md font-semibold group"
                render={<Link href="#parcerias" />}
              >
                <span>Conecte sua pesquisa à BioSpin</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Selos de Credibilidade */}
            <div className="flex flex-wrap gap-3 text-xs sm:text-sm font-medium text-primary-foreground/75">
              <div className="flex items-center gap-2 bg-black/20 rounded-full px-3.5 py-1.5 backdrop-blur-sm">
                <CheckCircle2 className="h-4 w-4 text-cyan-300" /> DA ESTRUTURA À FUNÇÃO
              </div>
              <div className="flex items-center gap-2 bg-black/20 rounded-full px-3.5 py-1.5 backdrop-blur-sm">
                <CheckCircle2 className="h-4 w-4 text-cyan-300" /> NANOFIBRAS / BIOATIVOS / REGENERAÇÃO
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 01 / ABERTURA ─────────────────────────────────────────── */}
      <section id="abertura" className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-8 border border-primary/20">
            <Sparkles className="h-3.5 w-3.5 text-secondary" />
            PEQUENA NA ESCALA. AMPLA NAS POSSIBILIDADES.
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Lado Esquerdo: Título Alinhado */}
            <div className="reveal-on-scroll">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary leading-tight">
                <span className="font-light block mb-2">Uma interface entre</span>
                <span>materiais e </span>
                <span className="font-bold text-secondary">vida.</span>
              </h2>
            </div>

            {/* Lado Direito: Descrição e Ação Alinhadas */}
            <div className="reveal-on-scroll reveal-delay-200 space-y-6">
              <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-light">
                A forma como um material é estruturado importa tanto quanto sua composição.
              </p>

              <p className="text-foreground/70 leading-relaxed text-lg font-light">
                A BioSpin é uma deeptech brasileira com foco em engenharia de nanofibras, biomateriais bioativos e regeneração tecidual. Nossa proposta conecta arquitetura de materiais e funcionalidade biológica para orientar o desenvolvimento de soluções fundamentadas em pesquisa.
              </p>

              <div className="pt-2">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 h-14 border-foreground/15 hover:border-primary/40 font-medium group"
                  render={<Link href="/sobre" />}
                >
                  <span>Conheça nossa visão</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 / PLATAFORMA ───────────────────────────────────────── */}
      <section id="plataforma" className="py-24 md:py-32 bg-background relative overflow-hidden border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
              <Layers className="h-3.5 w-3.5 text-secondary" />
              01 / TECNOLOGIA &amp; PLATAFORMA
            </span>
            <span className="text-xs uppercase font-bold tracking-wider text-foreground/40">
              ENGENHARIA QUE CONECTA ESCALAS
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
            <h2 className="text-4xl md:text-5xl font-heading text-primary leading-tight">
              <span className="font-light block mb-1">Estruturar. Funcionalizar.</span>
              <span className="font-bold text-secondary">Investigar.</span>
            </h2>
            <p className="text-foreground/70 leading-relaxed text-lg font-light">
              Uma abordagem integrada para relacionar composição, arquitetura fibrosa e resposta biológica. Cada projeto parte de uma pergunta e avança com critérios de avaliação definidos.
            </p>
          </div>

          {/* Formato de cascata (ao clicar revela o texto com seta indicativa) */}
          <div className="reveal-on-scroll">
            <TechAccordion items={platformItems} />
          </div>

          <div className="mt-12 text-center text-xs uppercase font-bold tracking-widest text-foreground/40">
            COMPOSIÇÃO ↔ ARQUITETURA ↔ FUNÇÃO
          </div>

        </div>
      </section>

      {/* ── 03 / APLICAÇÕES EM PERSPECTIVA ────────────────────────── */}
      <section id="aplicacoes" className="py-24 md:py-32 bg-white relative overflow-hidden border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
              <Sparkles className="h-3.5 w-3.5 text-secondary" />
              02 / APLICAÇÕES EM PERSPECTIVA
            </span>
            <span className="text-xs uppercase font-bold tracking-wider text-foreground/40">
              DA HIPÓTESE AO DESENVOLVIMENTO
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-12">
            <h2 className="text-4xl md:text-5xl font-heading text-primary leading-tight">
              <span className="font-light block mb-1">Uma plataforma.</span>
              <span className="font-bold text-secondary">Diferentes caminhos.</span>
            </h2>
            <p className="text-foreground/70 leading-relaxed text-lg font-light">
              Frentes de investigação que aproximam a engenharia de materiais dos desafios da saúde e da biotecnologia.
            </p>
          </div>

          {/* Componente interativo de aplicações com filtros e modal */}
          <TechApplications />

          {/* Mensagem centralizada sem caixa */}
          <p className="mt-14 text-center text-xs sm:text-sm text-foreground/50 leading-relaxed font-light max-w-3xl mx-auto">
            As frentes apresentadas descrevem possibilidades de pesquisa. Não representam produtos aprovados, indicação de uso médico ou comprovação de eficácia clínica.
          </p>

        </div>
      </section>

      {/* ── 04 / PESQUISA & DESENVOLVIMENTO ───────────────────────── */}
      <section id="pesquisa" className="py-24 md:py-32 bg-background relative overflow-hidden border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6 border border-primary/20">
            <FlaskConical className="h-3.5 w-3.5 text-secondary" />
            03 / PESQUISA &amp; DESENVOLVIMENTO
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
            <h2 className="text-4xl md:text-5xl font-heading text-primary leading-tight">
              <span className="font-light block mb-1">Rigor em cada etapa.</span>
              <span className="font-bold text-secondary">Clareza em cada avanço.</span>
            </h2>
            <p className="text-foreground/70 leading-relaxed text-lg font-light">
              Transformar uma hipótese em tecnologia exige método. Nossa proposta de desenvolvimento privilegia perguntas verificáveis, documentação e colaboração multidisciplinar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {researchSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className={`reveal-on-scroll ${idx === 1
                      ? "reveal-delay-100"
                      : idx === 2
                        ? "reveal-delay-200"
                        : idx === 3
                          ? "reveal-delay-300"
                          : ""
                    }`}
                >
                  <SpotlightCard className="h-full bg-white p-8 rounded-[2.5rem] border border-foreground/5 shadow-[0_10px_40px_rgba(0,0,0,0.02)] transition-all duration-300 flex flex-col hover:-translate-y-1 hover:border-primary/20">
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                        {step.number} — {step.label}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold font-heading text-primary mb-3">
                      {step.title}
                    </h3>
                    <p className="text-foreground/70 text-base leading-relaxed font-light flex-1">
                      {step.body}
                    </p>
                  </SpotlightCard>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-3 mt-14 pt-8 border-t border-border/60">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-secondary animate-pulse flex-shrink-0" />
            <p className="text-sm text-foreground/70 font-light">
              Ciência responsável também é comunicar os limites do que sabemos.
            </p>
          </div>

        </div>
      </section>

      {/* ── 05 / SOBRE A BIOSPIN ──────────────────────────────────── */}
      <section id="sobre" className="py-24 md:py-32 bg-white relative overflow-hidden border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-8 border border-primary/20">
            <Sparkles className="h-3.5 w-3.5 text-secondary" />
            04 / SOBRE A BIOSPIN
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 reveal-on-scroll">
              <h2 className="text-4xl md:text-5xl font-heading text-primary leading-tight">
                <span className="font-light block mb-1">Origem brasileira.</span>
                <span className="font-bold text-secondary">Visão aberta ao mundo.</span>
              </h2>
            </div>

            <div className="lg:col-span-7 reveal-on-scroll reveal-delay-200 space-y-6">
              <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-light">
                Conectamos a precisão da engenharia à complexidade dos sistemas vivos.
              </p>
              <p className="text-foreground/70 leading-relaxed text-base sm:text-lg font-light">
                A BioSpin se dedica à fronteira entre nanotecnologia e biomateriais. Seu foco está em explorar como estruturas fibrosas e componentes bioativos podem contribuir para novas abordagens de pesquisa em regeneração tecidual.
              </p>
              <p className="text-foreground/70 leading-relaxed text-base sm:text-lg font-light">
                Valorizamos o diálogo entre disciplinas e a construção de conhecimento com responsabilidade. O potencial de uma tecnologia deve ser acompanhado por evidências proporcionais às suas aplicações.
              </p>

              <div className="pt-6 border-t border-border/60">
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 sm:gap-10">
                  {["Rigor científico", "Colaboração", "Responsabilidade"].map((val) => (
                    <span
                      key={val}
                      className="text-sm sm:text-base font-semibold text-primary tracking-wide border-b border-primary/30 pb-1 hover:border-primary transition-colors cursor-default whitespace-nowrap"
                    >
                      {val}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 06 / PARCERIAS ────────────────────────────────────────── */}
      <section id="parcerias" className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-nanotech-grid-dark opacity-25 pointer-events-none" />
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[700px] h-[700px] bg-secondary/20 rounded-full blur-[130px] opacity-60 animate-float-slow pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] opacity-50 animate-float-reverse pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-8 border border-white/20 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-secondary" />
            05 / CONEXÕES QUE MOVEM A CIÊNCIA
          </span>

          <h2 className="text-4xl md:text-6xl font-heading leading-tight tracking-tight mb-16">
            <span className="font-light block mb-2">O próximo avanço pode começar com</span>
            <span className="font-bold text-white">uma conversa.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="p-8 rounded-[2.5rem] bg-white/10 backdrop-blur-md border border-white/15 flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6">
                <Handshake className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-white mb-3">
                Buscamos conexões
              </h3>
              <p className="text-primary-foreground/70 text-base leading-relaxed font-light">
                Com quem compartilha desafios em materiais, biotecnologia e saúde.
              </p>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-white/10 backdrop-blur-md border border-white/15 flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-white mb-3">
                Instituições de pesquisa
              </h3>
              <p className="text-primary-foreground/70 text-base leading-relaxed font-light">
                Diálogo científico e construção de propostas de investigação conjunta.
              </p>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-white/10 backdrop-blur-md border border-white/15 flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-white mb-3">
                Empresas e inovação
              </h3>
              <p className="text-primary-foreground/70 text-base leading-relaxed font-light">
                Discussão de desafios de aplicação e oportunidades de codesenvolvimento.
              </p>
            </div>
          </div>

          <Button
            size="lg"
            className="px-8 h-14 rounded-full bg-white text-primary hover:bg-white/90 font-semibold shadow-lg text-base group"
            render={<Link href="#contato" />}
          >
            <span>Proponha uma colaboração</span>
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>

        </div>
      </section>

      {/* ── 07 / CONTATO ──────────────────────────────────────────── */}
      <section id="contato" className="py-24 md:py-32 bg-white relative overflow-hidden border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Lado esquerdo: cabeçalho e canais oficiais */}
            <div className="lg:col-span-5 space-y-8 reveal-on-scroll">
              <div>
                <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6 border border-primary/20">
                  <Sparkles className="h-3.5 w-3.5 text-secondary" />
                  06 / CONTATO
                </span>

                <h2 className="text-4xl md:text-5xl font-heading text-primary leading-tight mb-6">
                  <span className="font-light block mb-1">Vamos conectar</span>
                  <span className="font-bold text-secondary">possibilidades.</span>
                </h2>

                <p className="text-xl text-foreground/75 leading-relaxed font-light mb-8">
                  Conte o que você está investigando e qual desafio deseja explorar com a BioSpin.
                </p>

                <div className="p-6 rounded-2xl bg-background border border-border/80 text-xs text-foreground/60 leading-relaxed font-light">
                  Envie sua mensagem diretamente para nossa equipe científica e técnica. Retornaremos o contato pelo seu e-mail profissional com rapidez e discrição.
                </div>
              </div>

              {/* Canal WhatsApp Destaque idêntico ao de Contato */}
              <SpotlightCard
                spotlightColor="rgba(34, 197, 94, 0.15)"
                className="p-6 rounded-3xl bg-green-50/60 border border-green-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <FaWhatsapp className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-base">Atendimento via WhatsApp</h3>
                    <p className="text-xs text-foreground/70">Resposta rápida para novos contatos</p>
                  </div>
                </div>
                <a
                  href="https://wa.me/5548988401508?text=Ol%C3%A1!%20Gostaria%20de%20conversar%20com%20a%20equipe%20da%20BioSpin."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-full shadow-sm transition-colors whitespace-nowrap"
                >
                  Iniciar Conversa
                </a>
              </SpotlightCard>

              {/* Informações de Contato Oficiais */}
              <div className="space-y-6 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-base">E-mail Institucional</h3>
                    <a
                      href="mailto:contato@biospin.com.br"
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      contato@biospin.com.br
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-base">Telefone</h3>
                    <a
                      href="tel:+5548988401508"
                      className="text-foreground/70 hover:text-primary transition-colors text-sm"
                    >
                      +55 (48) 98840-1508
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-base">Sede &amp; Laboratório</h3>
                    <p className="text-foreground/70 text-sm">
                      Manaus, Amazonas — Brasil
                      <br />
                      <span className="text-xs text-foreground/50">LTMN / INPA e UFAM</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lado direito: formulário estruturado */}
            <div className="lg:col-span-7 reveal-on-scroll reveal-delay-200">
              <SpotlightCard className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border border-slate-200/80 shadow-sm transition-all duration-300">
                <div className="mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold font-heading text-foreground mb-2">
                    Envie sua Mensagem
                  </h3>
                  <p className="text-sm text-foreground/60 font-light">
                    Preencha o formulário abaixo para iniciar uma conversa com nossos especialistas.
                  </p>
                </div>

                <TechContactForm />
              </SpotlightCard>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
