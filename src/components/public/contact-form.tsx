"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";
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
import { Loader2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(2, "Selecione um assunto"),
  message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres"),
  requestQuote: z.boolean(),
  consentLGPD: z.literal(true, {
    message: "Você deve concordar com os termos de privacidade para enviar a mensagem",
  }),
  origin: z.string().optional(),
  bot_field: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
      requestQuote: false,
      consentLGPD: true,
      origin: "",
      bot_field: "",
    },
  });

  useEffect(() => {
    // Set origin automatically from current location
    if (typeof window !== "undefined") {
      setValue("origin", window.location.pathname + window.location.search);
    }
  }, [setValue]);

  const onSubmit = async (data: ContactFormData) => {
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
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erro ao enviar a mensagem");
      }

      toast.success(
        "Mensagem enviada com sucesso! Nossa equipe responderá em até 2 dias úteis."
      );
      reset({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
        requestQuote: false,
        consentLGPD: true,
        origin: window.location.pathname,
        bot_field: "",
      });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Ocorreu um erro inesperado.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="bot_field">Não preencha este campo se for humano:</label>
        <input
          type="text"
          id="bot_field"
          {...register("bot_field")}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nome Completo</Label>
          <Input
            id="name"
            placeholder="Seu nome completo"
            {...register("name")}
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail Corporativo ou Pessoal</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            {...register("email")}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefone / WhatsApp</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(92) 99999-9999"
            {...register("phone")}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Empresa ou Instituição (Opcional)</Label>
          <Input
            id="company"
            placeholder="Nome da organização"
            {...register("company")}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Serviço ou Solução de Interesse</Label>
        <Select
          disabled={isLoading}
          onValueChange={(val) => {
            if (val) setValue("subject", val, { shouldValidate: true });
          }}
          value={watch("subject")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o assunto ou tecnologia" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Nanofiberdressing">Nanofiberdressing</SelectItem>
            <SelectItem value="OncoMatrix">OncoMatrix</SelectItem>
            <SelectItem value="Linha Cosmética">Linha Cosmética</SelectItem>
            <SelectItem value="Parceria/P&D">Parceria / P&D Científico</SelectItem>
            <SelectItem value="Investimento">Investimento / Fomento</SelectItem>
            <SelectItem value="Imprensa">Imprensa / Comunicação</SelectItem>
            <SelectItem value="Outro">Outro assunto</SelectItem>
          </SelectContent>
        </Select>
        {errors.subject && (
          <p className="text-sm text-red-500">{errors.subject.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Mensagem</Label>
        <Textarea
          id="message"
          placeholder="Descreva seu interesse, proposta de parceria ou dúvida técnica..."
          className="min-h-[120px]"
          {...register("message")}
          disabled={isLoading}
        />
        {errors.message && (
          <p className="text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      <div className="space-y-4 pt-1">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="requestQuote"
            {...register("requestQuote")}
            disabled={isLoading}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <Label htmlFor="requestQuote" className="font-normal cursor-pointer text-sm">
            Desejo solicitar uma cotação ou orçamento
          </Label>
        </div>

        {/* Consentimento LGPD (PROJECT-SPEC.md) */}
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="consentLGPD"
            {...register("consentLGPD")}
            disabled={isLoading}
            className="h-4 w-4 mt-0.5 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <Label
            htmlFor="consentLGPD"
            className="font-normal text-xs text-foreground/70 cursor-pointer leading-tight"
          >
            Concordo com o tratamento dos meus dados para fins de retorno e comunicação institucional, nos termos da{" "}
            <Link
              href="/privacidade"
              target="_blank"
              className="text-primary underline hover:text-primary/80"
            >
              Política de Privacidade (LGPD)
            </Link>.
          </Label>
        </div>
        {errors.consentLGPD && (
          <p className="text-xs text-red-500">{errors.consentLGPD.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full md:w-auto min-w-[220px] h-12 rounded-full text-base"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
          </>
        ) : (
          "Enviar Mensagem"
        )}
      </Button>
    </form>
  );
}

