import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Layers, Microscope, Atom, FlaskConical } from "lucide-react";
import { SpotlightCard } from "@/components/public/spotlight-card";
import { TechFibersCanvas } from "@/components/public/tech-fibers-canvas";
import { TechAccordion } from "@/components/public/tech-accordion";
import { TechApplications } from "@/components/public/tech-applications";
import { TechContactForm } from "@/components/public/tech-contact-form";

export const metadata: Metadata = {
  title: "Tecnologia | BioSpin — Engenharia de Nanofibras e Biomateriais",
  description:
    "Conheça a plataforma tecnológica da BioSpin: engenharia de nanofibras, biomateriais bioativos e interfaces biológicas orientadas por evidências.",
};

const platformItems = [
  {
    number: "01",
    title: "Engenharia de nanofibras",
    body: "Explorar a organização de fibras, porosidade e características de superfície como variáveis de projeto para biomateriais.",
  },
  {
    number: "02",
    title: "Biomateriais bioativos",
    body: "Investigar a associação entre matrizes e componentes bioativos, considerando compatibilidade, estabilidade e função pretendida.",
  },
  {
    number: "03",
    title: "Interfaces biológicas",
    body: "Estudar a interação entre materiais e sistemas biológicos por meio de protocolos adequados à hipótese e ao estágio de desenvolvimento.",
  },
  {
    number: "04",
    title: "Desenvolvimento orientado por evidências",
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

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        id="inicio"
        className="hero relative pt-36 pb-28 md:pt-48 md:pb-32 bg-primary text-primary-foreground overflow-hidden min-h-[90vh] lg:min-h-[920px] flex items-center"
      >
        {/* Grid nanotecnológico e ambiência */}
        <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
          <div className="absolute inset-0 bg-nanotech-grid-dark opacity-35 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[700px] h-[700px] bg-secondary/25 rounded-full blur-[130px] opacity-70 animate-float-slow" />
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[500px] h-[500px] bg-white/10 rounded-full blur-[110px] opacity-50 animate-float-reverse" />
        </div>

        {/* Canvas de nanofibras (hero-art) posicionado à direita */}
        <div
          className="absolute right-[-15%] top-10 w-[85%] h-[95%] opacity-90 pointer-events-none z-0"
          style={{ maskImage: "linear-gradient(90deg, transparent, #000 28%)" }}
          aria-hidden="true"
        >
          <TechFibersCanvas colorMode="blue" />
        </div>

        {/* Conteúdo principal do Hero */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10 w-full">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-blue-300 mb-8 sm:mb-10">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.9)] animate-pulse" />
              <span>CIÊNCIA BRASILEIRA. POSSIBILIDADES SEM FRONTEIRAS.</span>
            </div>

            {/* Headline H1 */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] font-heading font-light leading-[1.07] tracking-tight mb-8">
              O futuro do cuidado<br />
              começa em uma<br />
              <em className="font-serif italic font-normal text-blue-300">nova escala.</em>
            </h1>

            {/* Intro */}
            <p className="text-base sm:text-lg text-primary-foreground/75 leading-relaxed font-light max-w-md mb-8">
              Engenharia de nanofibras e biomateriais bioativos para explorar
              novas possibilidades em regeneração tecidual.
            </p>

            {/* Ações */}
            <div className="flex flex-col items-start gap-3">
              <Link
                href="#plataforma"
                className="inline-flex items-center justify-between gap-10 px-6 py-3.5 rounded bg-blue-300 text-[#00058B] hover:bg-white text-xs font-semibold tracking-wide transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
              >
                <span>Explore a plataforma</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="#parcerias"
                className="inline-flex items-center gap-2 text-xs text-primary-foreground/70 hover:text-white transition-colors mt-2 group"
              >
                <span>Conecte sua pesquisa à BioSpin</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Legenda técnica no canto inferior direito sobre o canvas */}
        <div className="absolute right-6 sm:right-10 lg:right-16 bottom-20 flex flex-col text-right gap-1 text-[9px] tracking-[1.2px] text-blue-200/50 uppercase z-10 pointer-events-none">
          <span className="font-medium text-blue-200/70">01 / ARQUITETURAS FIBROSAS</span>
          <span className="text-[9px] tracking-[0.4px] text-blue-200/40">Visualização conceitual · fora de escala</span>
        </div>

        {/* Rodapé do hero */}
        <div className="absolute bottom-0 left-6 sm:left-10 lg:left-16 right-6 sm:right-10 lg:right-16 h-16 flex justify-between items-center text-[9px] tracking-[1.3px] uppercase border-t border-white/15 text-primary-foreground/50 z-10">
          <span>DA ESTRUTURA À FUNÇÃO.</span>
          <Link
            href="#plataforma"
            className="text-blue-300 hover:text-white transition-colors"
          >
            Conheça a BioSpin ↓
          </Link>
          <span className="hidden sm:block">NANOFIBRAS / BIOATIVOS / REGENERAÇÃO</span>
        </div>
      </section>

      {/* ── ABERTURA ─────────────────────────────────────────────── */}
      <section id="abertura" className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-foreground/40 mb-12">
            PEQUENA NA ESCALA. AMPLA NAS POSSIBILIDADES.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="reveal-on-scroll">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary mb-0 leading-[1.1] tracking-tight">
                <span className="font-light block mb-1">Uma interface entre</span>
                <span>materiais e </span>
                <em className="font-serif italic font-normal text-secondary">vida.</em>
              </h2>
            </div>
            <div className="reveal-on-scroll reveal-delay-200">
              <p className="text-xl sm:text-2xl text-foreground/80 leading-relaxed mb-5 font-normal">
                A forma como um material é estruturado importa tanto quanto sua composição.
              </p>
              <p className="text-foreground/60 leading-relaxed mb-6 text-base font-light">
                A BioSpin é uma deeptech brasileira com foco em engenharia de nanofibras,
                biomateriais bioativos e regeneração tecidual. Nossa proposta conecta
                arquitetura de materiais e funcionalidade biológica para orientar o
                desenvolvimento de soluções fundamentadas em pesquisa.
              </p>
              <Link
                href="/sobre"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-primary font-semibold border-b border-primary/30 pb-1.5 hover:opacity-70 transition-opacity mt-2"
              >
                Conheça nossa visão ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PLATAFORMA ───────────────────────────────────────────── */}
      <section id="plataforma" className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-nanotech-grid-dark opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[130px] opacity-50 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-blue-300">
              01 / TECNOLOGIA &amp; PLATAFORMA
            </span>
            <span className="text-[9px] sm:text-xs uppercase tracking-wider text-primary-foreground/40 hidden sm:block">
              ENGENHARIA QUE CONECTA ESCALAS
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-16 mt-8">
            <h2 className="text-4xl md:text-6xl font-heading leading-[1.07] tracking-tight">
              <span className="font-light block">Estruturar.</span>
              <span className="font-light block">Funcionalizar.</span>
              <em className="font-serif italic font-normal text-blue-300 block">Investigar.</em>
            </h2>
            <p className="text-primary-foreground/70 leading-relaxed text-base sm:text-lg font-light">
              Uma abordagem integrada para relacionar composição, arquitetura fibrosa
              e resposta biológica. Cada projeto parte de uma pergunta e avança com
              critérios de avaliação definidos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Orbe visual azul */}
            <div className="relative flex items-center justify-center min-h-[320px] reveal-on-scroll">
              <div
                className="w-[260px] h-[260px] rounded-full"
                style={{
                  border: "1px solid rgba(59,91,255,0.3)",
                  background: "repeating-radial-gradient(ellipse at 20% 20%, transparent 0 6px, rgba(59,91,255,0.15) 7px, transparent 8px 11px)",
                  transform: "rotate(-25deg)",
                  boxShadow: "inset 10px 0 35px rgba(59,91,255,0.1), 0 0 100px rgba(0,0,251,0.08)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[320px] h-[320px] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(59,91,255,0.08), transparent 65%)" }} />
              </div>
              <span className="absolute bottom-0 text-[9px] tracking-[1.4px] uppercase text-primary-foreground/30">
                COMPOSIÇÃO ↔ ARQUITETURA ↔ FUNÇÃO
              </span>
            </div>

            <div className="reveal-on-scroll reveal-delay-200">
              <TechAccordion items={platformItems} colorMode="blue" />
            </div>
          </div>
        </div>
      </section>

      {/* ── APLICAÇÕES ───────────────────────────────────────────── */}
      <section id="aplicacoes" className="py-24 md:py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-nanotech-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-foreground/40">
              02 / APLICAÇÕES EM PERSPECTIVA
            </span>
            <span className="text-[9px] sm:text-xs uppercase tracking-wider text-foreground/30 hidden sm:block">
              DA HIPÓTESE AO DESENVOLVIMENTO
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-12 mt-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary leading-tight tracking-tight">
              <span className="font-light block mb-1">Uma plataforma.</span>
              <em className="font-serif italic font-normal text-secondary">Diferentes caminhos.</em>
            </h2>
            <p className="text-foreground/60 leading-relaxed text-base sm:text-lg font-light">
              Frentes de investigação que aproximam a engenharia de materiais dos
              desafios da saúde e da biotecnologia.
            </p>
          </div>

          {/* Componente interativo de aplicações com filtros e modal */}
          <TechApplications />

          <p className="mt-12 text-xs text-foreground/45 leading-relaxed max-w-3xl">
            As frentes apresentadas descrevem possibilidades de pesquisa. Não representam produtos aprovados,
            indicação de uso médico ou comprovação de eficácia clínica.
          </p>
        </div>
      </section>

      {/* ── PESQUISA & DESENVOLVIMENTO ───────────────────────────── */}
      <section id="pesquisa" className="py-24 md:py-32 bg-muted/40 relative overflow-hidden border-t border-foreground/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-foreground/40 block mb-4">
            03 / PESQUISA &amp; DESENVOLVIMENTO
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-16 mt-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary leading-tight tracking-tight">
              <span className="font-light block mb-1">Rigor em cada etapa.</span>
              <em className="font-serif italic font-normal text-secondary">Clareza em cada avanço.</em>
            </h2>
            <p className="text-foreground/60 leading-relaxed text-base sm:text-lg font-light">
              Transformar uma hipótese em tecnologia exige método. Nossa proposta
              de desenvolvimento privilegia perguntas verificáveis, documentação
              e colaboração multidisciplinar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {researchSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className={`reveal-on-scroll ${idx === 1 ? "reveal-delay-100" : idx === 2 ? "reveal-delay-200" : idx === 3 ? "reveal-delay-300" : ""}`}>
                  <SpotlightCard className="h-full bg-card rounded-2xl p-6 border border-foreground/10 hover:border-primary/20 transition-all duration-300 shadow-sm">
                    <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-6">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-[9px] tracking-[1.4px] uppercase text-foreground/40 block mb-3 font-semibold">
                      {step.number} — {step.label}
                    </span>
                    <h3 className="text-xl font-heading text-primary font-normal mb-2">{step.title}</h3>
                    <p className="text-foreground/60 text-sm leading-relaxed font-light">{step.body}</p>
                  </SpotlightCard>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-3 mt-14 pt-8 border-t border-foreground/10">
            <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse flex-shrink-0" />
            <p className="text-xs sm:text-sm text-foreground/60 font-light">
              Ciência responsável também é comunicar os limites do que sabemos.
            </p>
          </div>
        </div>
      </section>

      {/* ── SOBRE A BIOSPIN ───────────────────────────────────────── */}
      <section id="sobre" className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-foreground/40 block mb-12">
            04 / SOBRE A BIOSPIN
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="reveal-on-scroll">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary leading-tight tracking-tight">
                <span className="font-light block mb-1">Origem brasileira.</span>
                <em className="font-serif italic font-normal text-secondary">Visão aberta ao mundo.</em>
              </h2>
            </div>
            <div className="reveal-on-scroll reveal-delay-200">
              <p className="text-xl sm:text-2xl text-foreground/80 leading-relaxed mb-6 font-normal">
                Conectamos a precisão da engenharia à complexidade dos sistemas vivos.
              </p>
              <p className="text-foreground/60 leading-relaxed mb-5 text-base font-light">
                A BioSpin se dedica à fronteira entre nanotecnologia e biomateriais. Seu foco está em explorar como estruturas fibrosas e componentes bioativos podem contribuir para novas abordagens de pesquisa em regeneração tecidual.
              </p>
              <p className="text-foreground/60 leading-relaxed mb-8 text-base font-light">
                Valorizamos o diálogo entre disciplinas e a construção de conhecimento com responsabilidade. O potencial de uma tecnologia deve ser acompanhado por evidências proporcionais às suas aplicações.
              </p>
              <div className="flex flex-wrap gap-4 pt-4 border-t border-foreground/10">
                {["Rigor científico", "Colaboração", "Responsabilidade"].map((val) => (
                  <span
                    key={val}
                    className="text-xs tracking-wider text-foreground/70 border-b border-foreground/30 pb-1"
                  >
                    {val}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARCERIAS ────────────────────────────────────────────── */}
      <section id="parcerias" className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-nanotech-grid-dark opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[700px] h-[700px] bg-secondary/20 rounded-full blur-[130px] opacity-50 animate-float-slow pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] opacity-60 animate-float-reverse pointer-events-none" />

        {/* Símbolo decorativo de asterisco / biospin */}
        <span
          className="absolute pointer-events-none select-none text-white/[0.03] leading-none"
          style={{ fontSize: "500px", top: "-180px", right: "-100px" }}
          aria-hidden="true"
        >
          ✳
        </span>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-blue-300 block mb-8">
            05 / CONEXÕES QUE MOVEM A CIÊNCIA
          </span>

          <h2 className="text-5xl md:text-7xl font-heading leading-[1.07] tracking-tight mb-16">
            <span className="font-light block">O próximo avanço</span>
            <span className="font-light block">pode começar com</span>
            <em className="font-serif italic font-normal text-blue-300 block">uma conversa.</em>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <p className="text-primary-foreground/60 leading-relaxed text-base sm:text-lg font-light">
              Buscamos conexões com quem compartilha desafios em materiais,
              biotecnologia e saúde.
            </p>
            <div>
              <h3 className="text-lg font-heading text-primary-foreground font-light mb-2">
                Instituições de pesquisa
              </h3>
              <p className="text-primary-foreground/60 text-sm leading-relaxed font-light">
                Diálogo científico e construção de propostas de investigação conjunta.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-heading text-primary-foreground font-light mb-2">
                Empresas e inovação
              </h3>
              <p className="text-primary-foreground/60 text-sm leading-relaxed font-light">
                Discussão de desafios de aplicação e oportunidades de codesenvolvimento.
              </p>
            </div>
          </div>

          <Link
            href="#contato"
            className="inline-flex items-center justify-between gap-8 px-7 py-4 rounded bg-blue-300 text-[#00058B] hover:bg-white text-xs font-semibold tracking-wide transition-all duration-200 hover:-translate-y-0.5 shadow-sm group"
          >
            <span>Proponha uma colaboração</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>

      {/* ── CONTATO ──────────────────────────────────────────────── */}
      <section id="contato" className="py-24 md:py-32 bg-white relative overflow-hidden border-t border-foreground/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Lado esquerdo: cabeçalho e briefing info */}
            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-foreground/40 block mb-12">
                06 / CONTATO
              </span>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading text-primary leading-tight tracking-tight mb-8">
                Vamos conectar<br />
                <em className="font-serif italic font-normal text-secondary">possibilidades.</em>
              </h2>

              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed font-light max-w-sm mb-10">
                Conte o que você está investigando e qual desafio deseja explorar com a BioSpin.
              </p>

              <p className="text-xs text-foreground/50 leading-relaxed font-light max-w-sm pt-8 border-t border-foreground/10">
                Prepare um briefing para compartilhar com a equipe pelo canal oficial de sua preferência. Os dados são usados apenas neste navegador para gerar o arquivo; nenhum envio é realizado por este site.
              </p>
            </div>

            {/* Lado direito: formulário com campos minimalistas */}
            <div>
              <TechContactForm />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
