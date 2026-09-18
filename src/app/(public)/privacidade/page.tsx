import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | BioSpin",
  description: "Política de Privacidade e Proteção de Dados da BioSpin conforme a LGPD.",
};

export default function PrivacidadePage() {
  return (
    <div className="flex flex-col min-h-screen pt-20 bg-background">
      <section className="bg-slate-50 py-16 md:py-24 border-b border-foreground/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-4">
            Política de Privacidade
          </h1>
          <p className="text-foreground/60 text-lg">
            Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD)
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate prose-lg max-w-none font-light leading-relaxed">
          <h2>1. Introdução e Compromisso</h2>
          <p>
            A <strong>BioSpin</strong> tem o compromisso de proteger a privacidade e os dados pessoais de seus visitantes, clientes, parceiros de pesquisa e instituições de saúde. Esta Política de Privacidade descreve como tratamos, coletamos e protegemos as informações fornecidas em nossos canais digitais.
          </p>

          <h2>2. Dados Coletados</h2>
          <p>
            Coletamos apenas as informações estritamente necessárias fornecidas voluntariamente por você através de nossos formulários de contato, solicitação de demonstração ou parcerias institucionais:
          </p>
          <ul>
            <li>Nome completo;</li>
            <li>E-mail corporativo ou pessoal;</li>
            <li>Telefone / WhatsApp;</li>
            <li>Instituição / Empresa e Cargo;</li>
            <li>Segmento de atuação e mensagem com interesse técnico ou comercial.</li>
          </ul>

          <h2>3. Finalidade do Tratamento de Dados</h2>
          <p>
            Os dados coletados são utilizados exclusivamente para:
          </p>
          <ul>
            <li>Retornar contatos e solicitações de informações sobre o Nanofiberdressing, OncoMatrix e outras soluções;</li>
            <li>Envio de propostas comerciais e materiais técnico-científicos;</li>
            <li>Qualificação de parcerias de validação clínica e P&D;</li>
            <li>Cumprimento de obrigações legais e regulatórias.</li>
          </ul>

          <h2>4. Compartilhamento e Segurança</h2>
          <p>
            A BioSpin não comercializa nem compartilha dados pessoais com terceiros para fins publicitários. Os dados são armazenados em ambiente seguro com controle estrito de acesso e criptografia em trânsito (HTTPS/TLS).
          </p>

          <h2>5. Seus Direitos (LGPD)</h2>
          <p>
            Nos termos do art. 18 da LGPD, você possui o direito de confirmar a existência de tratamento, acessar seus dados, solicitar correção de dados incompletos ou requerer a exclusão de seus dados de nossa base de leads.
          </p>

          <h2>6. Contato com o Encarregado de Dados</h2>
          <p>
            Para exercer seus direitos ou esclarecer dúvidas sobre o tratamento de dados pessoais, entre em contato através do e-mail:{" "}
            <a href="mailto:contato@biospin.com.br" className="text-primary font-medium">
              contato@biospin.com.br
            </a>.
          </p>
        </div>
      </section>
    </div>
  );
}
