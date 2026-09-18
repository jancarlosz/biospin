import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";

export function Footer() {

  return (
    <footer className="bg-primary text-primary-foreground border-t-0 mt-auto overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link
              href="/"
              className="inline-block transition-opacity hover:opacity-90 py-1"
            >
              <Image
                src="/branco-biospin-horizontal.png"
                alt="BioSpin Nanotech"
                width={200}
                height={52}
                className="h-11 w-auto object-contain"
              />
            </Link>
            <p className="text-primary-foreground/70 leading-relaxed font-light text-base">
              Deeptech Amazônica focada em nanotecnologia, biomateriais e bioativos para a saúde e o bem-estar. Da floresta para a regeneração celular.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/biospin.bio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da BioSpin"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                title="Instagram @biospin.bio"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/company/biospin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn da BioSpin"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                title="LinkedIn da BioSpin"
              >
                <FaLinkedinIn className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/5548988401508?text=Ol%C3%A1!%20Gostaria%20de%20conversar%20com%20a%20equipe%20da%20BioSpin."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da BioSpin"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-green-600/80 text-white flex items-center justify-center transition-colors"
                title="Falar no WhatsApp"
              >
                <FaWhatsapp className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 tracking-wider text-sm uppercase">Navegação</h3>
            <ul className="space-y-4 text-base font-light text-white/70">
              <li><Link href="/" className="hover:text-white transition-colors">Início</Link></li>
              <li><Link href="/sobre" className="hover:text-white transition-colors">Sobre a BioSpin</Link></li>
              <li><Link href="/solucoes" className="hover:text-white transition-colors">Catálogo de Soluções</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog & Pesquisa</Link></li>
              <li><Link href="/contato" className="hover:text-white transition-colors">Fale Conosco</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 tracking-wider text-sm uppercase">Soluções</h3>
            <ul className="space-y-4 text-base font-light text-white/70">
              <li><Link href="/solucoes/nanofiberdressing" className="hover:text-white transition-colors">Nanofiberdressing</Link></li>
              <li><Link href="/solucoes/oncomatrix" className="hover:text-white transition-colors">OncoMatrix</Link></li>
              <li><Link href="/solucoes" className="hover:text-white transition-colors">Ver todas as tecnologias</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 tracking-wider text-sm uppercase">Contato</h3>
            <ul className="space-y-4 text-base font-light text-white/80">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="pt-1">Manaus, Amazonas — Brasil</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <a href="mailto:contato@biospin.com.br" className="hover:text-white transition-colors">
                  contato@biospin.com.br
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <a href="tel:+5548988401508" className="hover:text-white transition-colors">
                  +55 (48) 98840-1508
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0">
                  <FaWhatsapp className="h-4 w-4" />
                </div>
                <a
                  href="https://wa.me/5548988401508?text=Ol%C3%A1!%20Gostaria%20de%20conversar%20com%20a%20equipe%20da%20BioSpin."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 hover:underline font-medium transition-colors"
                >
                  Atendimento WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60 font-light">
          <p>© {new Date().getFullYear()} BioSpin Deep Tech. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link href="/privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link>
            <Link href="/termos" className="hover:text-white transition-colors">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

