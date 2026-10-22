"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export function TechContactForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    instituicao: "",
    interesse: "",
    mensagem: "",
    aceite: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.aceite) {
      alert("Por favor, confirme o termo de ciência antes de prosseguir.");
      return;
    }

    const text =
      "BIOSPIN — BRIEFING DE CONTATO & PESQUISA\n\n" +
      `NOME: ${formData.nome}\n\n` +
      `E-MAIL: ${formData.email}\n\n` +
      `INSTITUIÇÃO / EMPRESA: ${formData.instituicao}\n\n` +
      `INTERESSE: ${formData.interesse}\n\n` +
      `MENSAGEM:\n${formData.mensagem}\n\n` +
      "-------------------------------------------\n" +
      `Data: ${new Date().toLocaleDateString("pt-BR")}\n` +
      "Documento gerado para compartilhamento com a equipe da BioSpin.";

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `briefing-biospin-${formData.nome.toLowerCase().replace(/\s+/g, "-") || "contato"}.txt`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);

    setStatus("Briefing gerado com sucesso! Compartilhe o arquivo baixado com a equipe da BioSpin.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-[11px] font-semibold text-foreground/80 uppercase tracking-wider mb-2">
            Seu nome
          </label>
          <input
            type="text"
            required
            autoComplete="name"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            placeholder="Como podemos chamar você?"
            className="w-full py-3 bg-transparent border-0 border-b border-foreground/25 focus:border-primary focus:outline-none text-foreground text-sm placeholder:text-foreground/40 transition-colors rounded-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-foreground/80 uppercase tracking-wider mb-2">
            E-mail profissional
          </label>
          <input
            type="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="voce@instituicao.com"
            className="w-full py-3 bg-transparent border-0 border-b border-foreground/25 focus:border-primary focus:outline-none text-foreground text-sm placeholder:text-foreground/40 transition-colors rounded-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-foreground/80 uppercase tracking-wider mb-2">
          Instituição ou empresa
        </label>
        <input
          type="text"
          required
          autoComplete="organization"
          value={formData.instituicao}
          onChange={(e) => setFormData({ ...formData, instituicao: e.target.value })}
          placeholder="Onde você atua?"
          className="w-full py-3 bg-transparent border-0 border-b border-foreground/25 focus:border-primary focus:outline-none text-foreground text-sm placeholder:text-foreground/40 transition-colors rounded-none"
        />
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-foreground/80 uppercase tracking-wider mb-2">
          Interesse
        </label>
        <div className="relative">
          <select
            required
            value={formData.interesse}
            onChange={(e) => setFormData({ ...formData, interesse: e.target.value })}
            className="w-full py-3 bg-transparent border-0 border-b border-foreground/25 focus:border-primary focus:outline-none text-foreground text-sm appearance-none transition-colors rounded-none pr-8 cursor-pointer"
          >
            <option value="" disabled className="text-foreground/50">
              Selecione um assunto
            </option>
            <option value="Parceria científica" className="text-foreground">
              Parceria científica
            </option>
            <option value="Codesenvolvimento" className="text-foreground">
              Codesenvolvimento
            </option>
            <option value="Informações institucionais" className="text-foreground">
              Informações institucionais
            </option>
            <option value="Outro assunto" className="text-foreground">
              Outro assunto
            </option>
          </select>
          <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-foreground/50 text-xs">
            ▼
          </span>
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-foreground/80 uppercase tracking-wider mb-2">
          Sua mensagem
        </label>
        <textarea
          rows={4}
          required
          minLength={15}
          value={formData.mensagem}
          onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
          placeholder="Compartilhe o contexto e o objetivo da conversa."
          className="w-full py-3 bg-transparent border-0 border-b border-foreground/25 focus:border-primary focus:outline-none text-foreground text-sm placeholder:text-foreground/40 transition-colors resize-y rounded-none"
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer pt-2 group">
        <input
          type="checkbox"
          required
          checked={formData.aceite}
          onChange={(e) => setFormData({ ...formData, aceite: e.target.checked })}
          className="mt-1 h-4 w-4 rounded border-foreground/30 text-primary focus:ring-primary accent-[#00058B]"
        />
        <span className="text-xs text-foreground/70 leading-relaxed font-light group-hover:text-foreground transition-colors">
          Entendo que o briefing será baixado no meu dispositivo e deverá ser compartilhado por mim.
        </span>
      </label>

      <button
        type="submit"
        className="w-full py-4 px-6 bg-primary hover:bg-primary/95 text-white text-xs font-semibold tracking-wider rounded transition-all duration-200 hover:-translate-y-0.5 shadow-sm flex items-center justify-between mt-4 group"
      >
        <span>Baixar briefing de contato</span>
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>

      {status && (
        <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded text-xs text-primary font-medium animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-secondary flex-shrink-0" />
          <span>{status}</span>
        </div>
      )}
    </form>
  );
}
