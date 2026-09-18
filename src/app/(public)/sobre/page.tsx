import Image from "next/image";
import { ArrowRight, Leaf, Target, Users, BookOpen, ShieldCheck, HeartHandshake, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/public/spotlight-card";
import Link from "next/link";

export const metadata = {
  title: "Sobre a BioSpin | Deeptech Amazônica",
  description: "Conheça a história, missão e equipe da BioSpin, startup amazônica de nanobiotecnologia.",
};

export default function SobrePage() {
  const team = [
    {
      name: "Andrey Marcos",
      role: "Fundador e líder científico",
      bio: "Doutor em Ciência de Materiais, tecnologista do LTMN/INPA.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80",
    },
    {
      name: "Bianca Marinho",
      role: "P&D e Inovação",
      bio: "Engenharia de Materiais, mestranda pela UFAM. Lidera pesquisa e desenvolvimento técnico.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80",
    },
    {
      name: "Thiago Mendes",
      role: "Gestão e Estratégia",
      bio: "Responsável por fundraising, operação, go-to-market e parcerias.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&q=80",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
          <div className="absolute inset-0 bg-nanotech-grid-dark opacity-35 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[700px] h-[700px] bg-secondary/25 rounded-full blur-[130px] opacity-70 animate-float-slow" />
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[500px] h-[500px] bg-white/10 rounded-full blur-[110px] opacity-50 animate-float-reverse" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl reveal-on-scroll">
            <h1 className="text-5xl md:text-7xl font-heading tracking-tight mb-8 leading-[1.1]">
              <span className="font-light block mb-2">Ciência amazônica</span>
              <span className="font-bold">com propósito.</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 leading-relaxed font-light max-w-3xl">
              Somos uma deeptech de Manaus que transforma conhecimento em nanobiotecnologia para gerar saúde, beleza e desenvolvimento sustentável a partir da floresta em pé.
            </p>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative reveal-on-scroll flex justify-center">
              <div className="w-full max-w-md rounded-[2.5rem] overflow-hidden bg-background shadow-2xl border border-foreground/5 relative">
                <Image
                  src="/biospin-img-hand.png"
                  alt="BioSpin Nanobiotecnologia e Bioativos"
                  width={960}
                  height={1280}
                  className="w-full h-auto object-contain transition-transform duration-700 hover:scale-[1.02]"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-secondary/20 rounded-full blur-3xl -z-10 animate-float-slow" />
            </div>
            
            <div className="max-w-xl reveal-on-scroll reveal-delay-200">
              <h2 className="text-4xl md:text-5xl font-heading text-primary mb-8 leading-tight">
                <span className="font-light block mb-1">Nossa</span>
                <span className="font-bold text-secondary">História</span>
              </h2>
              <div className="space-y-6 text-foreground/70 leading-relaxed text-lg font-light">
                <p>
                  A BioSpin nasceu do encontro entre ciência de materiais e a biodiversidade amazônica. Fundada por Andrey Marcos Pinho da Silva, doutor em Engenharia de Materiais e tecnologista do LTMN/INPA, a startup nasceu do desejo de transformar décadas de pesquisa sobre nanotecnologia e bioativos amazônicos em produtos reais.
                </p>
                <p>
                  Começamos na área da saúde, com curativos e biomateriais regenerativos, e expandimos para a cosmética com a marca NanoBeauty Bioactives.
                </p>
                <p>
                  Com apoio do programa Sinapse Bio e, mais recentemente, do Sebrae Nacional (Catalisa ICT) e do Hackathon SUS, a BioSpin vem validando sua tecnologia com instituições de saúde, ciência e fomento em todo o Brasil.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            <div className="reveal-on-scroll">
              <SpotlightCard className="h-full bg-white p-12 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-foreground/5 transition-all duration-300 flex flex-col">
                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-8">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold font-heading text-foreground mb-6">Missão</h3>
                <p className="text-foreground/70 leading-relaxed text-lg font-light flex-1">
                  Transformar a biodiversidade amazônica em soluções inovadoras para saúde e bem-estar por meio de biomateriais sustentáveis, com impacto positivo para o meio ambiente e as comunidades locais.
                </p>
              </SpotlightCard>
            </div>
            
            <div className="reveal-on-scroll reveal-delay-200">
              <SpotlightCard className="h-full bg-white p-12 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-foreground/5 transition-all duration-300 flex flex-col">
                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-8">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold font-heading text-foreground mb-6">Visão</h3>
                <p className="text-foreground/70 leading-relaxed text-lg font-light flex-1">
                  Ser referência nacional e internacional em biomateriais sustentáveis e bioativos, reconhecida pela inovação, excelência científica e compromisso com a conservação da Amazônia.
                </p>
              </SpotlightCard>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center reveal-on-scroll">
            <h3 className="text-3xl md:text-4xl font-heading text-primary mb-12">
              <span className="font-light">Nossos</span> <span className="font-bold text-secondary">Valores</span>
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['Sustentabilidade', 'Inovação com responsabilidade', 'Ética', 'Excelência científica', 'Impacto positivo', 'Respeito às pessoas'].map((val) => (
                <span key={val} className="px-6 py-4 bg-white rounded-full text-foreground font-medium shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-foreground/5 flex items-center text-lg transition-transform hover:-translate-y-1 hover:border-primary/20 cursor-default">
                  <ShieldCheck className="h-5 w-5 text-secondary mr-3" /> {val}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-heading text-primary mb-6 leading-tight">
              <span className="font-light">Nossa</span> <span className="font-bold text-secondary">Equipe</span>
            </h2>
            <p className="text-foreground/60 text-xl font-light">
              A ciência da BioSpin é feita por especialistas apaixonados pela Amazônia e pela inovação em saúde.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={member.name} className={`reveal-on-scroll ${idx === 1 ? 'reveal-delay-100' : idx === 2 ? 'reveal-delay-200' : ''}`}>
                <SpotlightCard className="h-full bg-white p-8 rounded-[2.5rem] border border-foreground/5 transition-all duration-300 hover:shadow-lg text-center flex flex-col items-center">
                  <div className="relative w-48 h-48 mx-auto mb-6 rounded-2xl overflow-hidden bg-background shadow-inner">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3 text-base">{member.role}</p>
                  <p className="text-foreground/60 font-light max-w-sm mx-auto text-sm leading-relaxed">{member.bio}</p>
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compromisso e Parceiros */}
      <section className="py-24 md:py-32 bg-background border-t border-border/60 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Coluna Esquerda: Compromisso com a Floresta */}
            <div className="lg:col-span-5 reveal-on-scroll">
              <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6 border border-primary/20">
                <Leaf className="h-3.5 w-3.5 text-secondary" />
                Bioeconomia & Impacto Social
              </span>
              
              <h2 className="text-4xl md:text-5xl font-heading text-primary mb-6 leading-tight">
                <span className="font-light block mb-1">Compromisso com a</span>
                <span className="font-bold text-secondary">Floresta em Pé</span>
              </h2>
              
              <p className="text-foreground/75 leading-relaxed text-lg font-light mb-8">
                A BioSpin trabalha com repartição ética de benefícios com fornecedores de bioativos amazônicos, como a comunidade extrativista ASPACS, garantindo que a cadeia produtiva remunere de forma justa quem cultiva e coleta a matéria-prima na floresta.
              </p>

              <div className="space-y-3 mb-10">
                <div className="flex items-center gap-3 text-sm text-foreground/85 font-medium">
                  <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <span>Cadeia produtiva ética e rastreabilidade total dos bioativos</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground/85 font-medium">
                  <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <span>Remuneração justa e valorização de cooperativas extrativistas</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground/85 font-medium">
                  <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <span>Conservação da biodiversidade por meio de biotecnologia de ponta</span>
                </div>
              </div>

              <Button size="lg" className="px-8 h-14 rounded-full text-base font-medium shadow-lg shadow-primary/15 group" render={<Link href="/contato" />}>
                Seja nosso parceiro
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Coluna Direita: Parceiros e Programas (Bento Grid Institucional) */}
            <div className="lg:col-span-7 reveal-on-scroll reveal-delay-200">
              <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-border/80 shadow-[0_12px_40px_rgba(0,5,139,0.05)]">
                <div className="flex items-center justify-between gap-4 mb-8 pb-5 border-b border-border/60">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary block mb-1">
                      Ecossistema Integrado
                    </span>
                    <h3 className="text-2xl font-bold font-heading text-primary">
                      Parceiros e Programas
                    </h3>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-foreground/70 font-medium px-3.5 py-1.5 rounded-full bg-background border border-border/60">
                    <Sparkles className="h-3.5 w-3.5 text-secondary" />
                    Validação & P&D
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Sebrae Nacional */}
                  <div className="p-5 rounded-2xl bg-background/60 hover:bg-white border border-border/80 hover:border-primary/30 transition-all hover:shadow-md group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-foreground text-base group-hover:text-primary transition-colors">
                        Sebrae Nacional
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        Catalisa ICT
                      </span>
                    </div>
                    <p className="text-xs text-foreground/60 font-light leading-relaxed">
                      Aceleração e transposição de tecnologia da floresta ao mercado.
                    </p>
                  </div>

                  {/* Hackathon SUS */}
                  <div className="p-5 rounded-2xl bg-background/60 hover:bg-white border border-border/80 hover:border-primary/30 transition-all hover:shadow-md group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-foreground text-base group-hover:text-primary transition-colors">
                        Hackathon SUS
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                        Desafio 2
                      </span>
                    </div>
                    <p className="text-xs text-foreground/60 font-light leading-relaxed">
                      OncoMatrix selecionada para inovação na saúde pública.
                    </p>
                  </div>

                  {/* Sinapse Bio */}
                  <div className="p-5 rounded-2xl bg-background/60 hover:bg-white border border-border/80 hover:border-primary/30 transition-all hover:shadow-md group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-foreground text-base group-hover:text-primary transition-colors">
                        Sinapse Bio
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        CERTI
                      </span>
                    </div>
                    <p className="text-xs text-foreground/60 font-light leading-relaxed">
                      Fomento e suporte a deep techs de bioeconomia na Amazônia.
                    </p>
                  </div>

                  {/* LTMN / INPA */}
                  <div className="p-5 rounded-2xl bg-background/60 hover:bg-white border border-border/80 hover:border-primary/30 transition-all hover:shadow-md group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-foreground text-base group-hover:text-primary transition-colors">
                        LTMN / INPA
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                        P&D Científico
                      </span>
                    </div>
                    <p className="text-xs text-foreground/60 font-light leading-relaxed">
                      Pesquisa e caracterização contínua de nanomateriais.
                    </p>
                  </div>

                  {/* UFAM & ASPACS */}
                  <div className="sm:col-span-2 p-5 rounded-2xl bg-background/60 hover:bg-white border border-border/80 hover:border-primary/30 transition-all hover:shadow-md group flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span className="font-bold text-foreground text-base group-hover:text-primary transition-colors">
                          UFAM & ASPACS
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                          Academia & Comunidade
                        </span>
                      </div>
                      <p className="text-xs text-foreground/60 font-light leading-relaxed">
                        Parceria científica acadêmica conectada ao manejo florestal sustentável direto com comunidades extrativistas.
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center gap-2">
                      <span className="text-xs font-semibold text-primary px-3 py-1 rounded-full bg-primary/5 border border-primary/10">
                        Manaus / Amazônia
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
