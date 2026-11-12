"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, ArrowRight, CheckCircle2 } from "lucide-react";

const techContactSchema = z.object({
  nome: z.string().min(2, "Por favor, informe seu nome"),
  email: z.string().email("E-mail profissional inválido"),
  instituicao: z.string().min(2, "Informe sua instituição ou empresa"),
  interesse: z.string().min(2, "Selecione um assunto"),
  mensagem: z.string().min(20, "A mensagem deve ter pelo menos 20 caracteres"),
  aceite: z.boolean().refine((val) => val === true, {
    message: "Você deve concordar com os termos de privacidade para enviar a mensagem",
  }),
  bot_field: z.string().optional(),
});

type TechContactFormData = z.infer<typeof techContactSchema>;

export function TechContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [statusText, setStatusText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<TechContactFormData>({
    resolver: zodResolver(techContactSchema),
    defaultValues: {
      nome: "",
      email: "",
      instituicao: "",
      interesse: "",
      mensagem: "",
      aceite: false,
      bot_field: "",
    },
  });

  const onSubmit = async (data: TechContactFormData) => {
    if (data.bot_field) {
      toast.success("Mensagem enviada com sucesso!");
      reset();
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.nome,
          email: data.email,
          company: data.instituicao,
          institution: data.instituicao,
          subject: `[Tecnologia] ${data.interesse}`,
          interestType: data.interesse,
          message: data.mensagem,
          origin: "/tecnologia",
          consentLGPD: data.aceite,
        }),
      });

      if (!response.ok) {
        const resJson = await response.json().catch(() => ({}));
        throw new Error(resJson.error || "Erro ao enviar mensagem");
      }

      setStatusText("Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.");
      toast.success("Mensagem enviada com sucesso!");
      reset({
        nome: "",
        email: "",
        instituicao: "",
        interesse: "",
        mensagem: "",
        aceite: false,
        bot_field: "",
      });
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Ocorreu um erro ao enviar sua mensagem. Tente novamente.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Honeypot */}
      <input
        type="text"
        {...register("bot_field")}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="nome">Seu nome *</Label>
          <Input
            id="nome"
            autoComplete="name"
            {...register("nome")}
            placeholder="Como podemos chamar você?"
            disabled={isLoading}
          />
          {errors.nome && (
            <p className="text-sm text-red-500">{errors.nome.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail profissional *</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
            placeholder="voce@instituicao.com"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="instituicao">Instituição ou empresa *</Label>
        <Input
          id="instituicao"
          autoComplete="organization"
          {...register("instituicao")}
          placeholder="Onde você atua?"
          disabled={isLoading}
        />
        {errors.instituicao && (
          <p className="text-sm text-red-500">{errors.instituicao.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="interesse">Interesse *</Label>
        <Select
          disabled={isLoading}
          onValueChange={(val) => {
            if (typeof val === "string") {
              setValue("interesse", val, { shouldValidate: true });
            }
          }}
        >
          <SelectTrigger id="interesse">
            <SelectValue placeholder="Selecione um assunto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Parceria científica">Parceria científica</SelectItem>
            <SelectItem value="Codesenvolvimento">Codesenvolvimento</SelectItem>
            <SelectItem value="Informações institucionais">Informações institucionais</SelectItem>
            <SelectItem value="Outro assunto">Outro assunto</SelectItem>
          </SelectContent>
        </Select>
        {errors.interesse && (
          <p className="text-sm text-red-500">{errors.interesse.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="mensagem">Sua mensagem *</Label>
        <Textarea
          id="mensagem"
          rows={4}
          {...register("mensagem")}
          placeholder="Compartilhe o contexto e o objetivo da conversa."
          className="min-h-[120px]"
          disabled={isLoading}
        />
        {errors.mensagem && (
          <p className="text-sm text-red-500">{errors.mensagem.message}</p>
        )}
      </div>

      <div className="space-y-4 pt-1">
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="aceite"
            {...register("aceite")}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary"
            disabled={isLoading}
          />
          <Label htmlFor="aceite" className="text-xs text-foreground/70 leading-relaxed font-normal cursor-pointer">
            Concordo com o envio dos meus dados para contato conforme a Política de Privacidade.
          </Label>
        </div>
        {errors.aceite && (
          <p className="text-sm text-red-500">{errors.aceite.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading || !watch("aceite")}
        size="lg"
        className="w-full text-base h-14 rounded-full font-semibold shadow-md group"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando mensagem...
          </>
        ) : (
          <>
            <span>Enviar mensagem</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </Button>

      {statusText && (
        <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-xs text-primary font-medium flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
          <span>{statusText}</span>
        </div>
      )}
    </form>
  );
}
