import { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { ContactForm } from "@/components/public/contact-form";
import { SpotlightCard } from "@/components/public/spotlight-card";

export const metadata: Metadata = {
  title: "Contato | BioSpin",
  description:
    "Fale com a equipe da BioSpin para parcerias, dúvidas sobre nossas soluções ou oportunidades de negócio. Respondemos em até 2 dias úteis.",
};

export default function ContatoPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20 bg-background">
      {/* Header (PROJECT-SPEC 9.1) */}
      <section className="bg-background py-16 md:py-24 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
          <div className="absolute inset-0 bg-nanotech-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] opacity-70 animate-float-slow" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] opacity-60 animate-float-reverse" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 reveal-on-scroll">
          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6 uppercase tracking-wider border border-primary/20">
            <Clock className="h-3.5 w-3.5 text-secondary" /> Retorno em até 2 dias úteis
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-heading text-primary mb-6">
            Vamos conversar.
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed font-light">
            Seja para conhecer melhor nossas soluções, propor uma parceria ou tirar dúvidas, nossa equipe responde em até 2 dias úteis.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white flex-1 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Informações de Contato e Canais (PROJECT-SPEC 9.3) */}
            <div className="lg:col-span-5 space-y-8 reveal-on-scroll">
              <div>
                <h2 className="text-3xl font-bold font-heading text-primary mb-4">
                  Canais Oficiais
                </h2>
                <p className="text-foreground/70 leading-relaxed font-light">
                  Conecte-se com nosso time técnico-comercial e de desenvolvimento em Manaus.
                </p>
              </div>

              {/* Canal WhatsApp Destaque */}
              <SpotlightCard spotlightColor="rgba(34, 197, 94, 0.15)" className="p-6 rounded-3xl bg-green-50/60 border border-green-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300">
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
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-full shadow-sm transition-colors whitespace-nowrap"
                >
                  Iniciar Conversa
                </a>
              </SpotlightCard>

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
                    <h3 className="font-bold text-foreground text-base">Sede & Laboratório</h3>
                    <p className="text-foreground/70 text-sm">
                      Manaus, Amazonas — Brasil
                      <br />
                      <span className="text-xs text-foreground/50">LTMN / INPA e UFAM</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Redes Sociais */}
              <div className="pt-6 border-t border-foreground/10">
                <h3 className="font-bold text-foreground text-sm uppercase tracking-wider mb-4">
                  Redes Sociais da BioSpin
                </h3>
                <div className="flex items-center gap-4">
                  <a
                    href="https://instagram.com/biospin.bio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-foreground/80 hover:text-foreground text-sm font-medium transition-colors"
                  >
                    <FaInstagram className="h-4 w-4 text-pink-600" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://linkedin.com/company/biospin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-foreground/80 hover:text-foreground text-sm font-medium transition-colors"
                  >
                    <FaLinkedinIn className="h-4 w-4 text-blue-600" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Formulário Geral de Contato (PROJECT-SPEC 9.2) */}
            <div className="lg:col-span-7 reveal-on-scroll reveal-delay-200">
              <SpotlightCard className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border border-slate-200/80 shadow-sm transition-all duration-300">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground mb-2">
                    Envie uma Mensagem
                  </h2>
                  <p className="text-foreground/70 text-sm font-light">
                    Preencha os campos abaixo. Retornaremos com material técnico e agendamento de reunião.
                  </p>
                </div>
                <ContactForm />
              </SpotlightCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

