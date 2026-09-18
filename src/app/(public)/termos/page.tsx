import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso | BioSpin",
  description: "Termos e Condições de Uso do website da BioSpin.",
};

export default function TermosPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20 bg-background">
      <section className="bg-slate-50 py-16 md:py-24 border-b border-foreground/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-4">
            Termos de Uso
          </h1>
          <p className="text-foreground/60 text-lg">
            Diretrizes para navegação e utilização do site institucional da BioSpin
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate prose-lg max-w-none font-light leading-relaxed">
          <h2>1. Objeto do Site</h2>
          <p>
            Este site tem por finalidade apresentar institucionalmente a <strong>BioSpin</strong>, sua atuação técnico-científica em nanotecnologia, biomateriais regenerativos e bioativos da biodiversidade amazônica, além de fornecer canal de contato e catálogo de soluções como vitrine digital.
          </p>

          <h2>2. Caráter Informativo das Soluções</h2>
          <p>
            As soluções apresentadas neste site possuem diferentes estágios de maturidade tecnológica e regulatória:
          </p>
          <ul>
            <li><strong>Nanofiberdressing:</strong> Curativo bioativo em estágio TRL 5 (validação clínica em andamento);</li>
            <li><strong>OncoMatrix:</strong> Membrana nanofibrilar bioabsorvível em estágio de pesquisa e desenvolvimento (Hackathon SUS — Desafio 2);</li>
          </ul>
          <p>
            O catálogo deste website funciona estritamente como vitrine digital institucional e de relacionamento B2B/P&D, não constituindo plataforma de comércio eletrônico, compra direta ou recomendação médica individualizada.
          </p>

          <h2>3. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo presente neste portal (textos, logotipos, marcas, imagens, artigos científicos e códigos) é de propriedade exclusiva da BioSpin ou licenciado para o seu uso. É vedada a reprodução total ou parcial sem autorização prévia por escrito.
          </p>

          <h2>4. Limitação de Responsabilidade</h2>
          <p>
            A BioSpin envida seus melhores esforços para manter as informações sempre atualizadas e precisas. Contudo, não se responsabiliza por eventuais indisponibilidades temporárias de serviços de terceiros ou pelo mau uso das informações contidas nas páginas.
          </p>

          <h2>5. Legislação e Foro</h2>
          <p>
            Estes termos são regidos pelas leis da República Federativa do Brasil. Para a resolução de eventuais controvérsias decorrentes deste termo, elege-se o foro da Comarca de Manaus, Estado do Amazonas.
          </p>
        </div>
      </section>
    </div>
  );
}
