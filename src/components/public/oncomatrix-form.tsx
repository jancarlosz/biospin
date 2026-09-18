"use client";

import { useState } from "react";
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

const oncomatrixSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("E-mail institucional inválido"),
  phone: z.string().min(8, "Telefone é obrigatório"),
  institution: z.string().min(2, "Instituição ou hospital é obrigatório"),
  role: z.string().min(2, "Cargo ou especialidade é obrigatório"),
  interestType: z.string().min(2, "Selecione o tipo de interesse"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
  consentLGPD: z.literal(true, {
    message: "Você deve concordar com os termos de privacidade para enviar",
  }),
  bot_field: z.string().optional(),
});

type OncomatrixFormData = z.infer<typeof oncomatrixSchema>;

export function OncomatrixForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<OncomatrixFormData>({
    resolver: zodResolver(oncomatrixSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      institution: "",
      role: "",
      interestType: "",
      message: "",
      consentLGPD: true,
      bot_field: "",
    },
  });

  const onSubmit = async (data: OncomatrixFormData) => {
    if (data.bot_field) {
      toast.success("Solicitação recebida com sucesso!");
      reset();
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.institution,
        institution: data.institution,
        role: data.role,
        interestType: data.interestType,
        subject: `Interesse em OncoMatrix - ${data.institution} (${data.interestType})`,
        message: data.message,
        origin: "/solucoes/oncomatrix",
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erro ao processar a mensagem");
      }

      toast.success(
        "Mensagem enviada com sucesso! Nossa equipe científica e de projetos retornará em até 2 dias úteis."
      );
      reset({
        name: "",
        email: "",
        phone: "",
        institution: "",
        role: "",
        interestType: "",
        message: "",
        consentLGPD: true,
        bot_field: "",
      });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Ocorreu um erro ao enviar.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="bot_field">Não preencha este campo:</label>
        <input
          type="text"
          id="bot_field"
          {...register("bot_field")}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="onco_name">Nome *</Label>
          <Input
            id="onco_name"
            placeholder="Seu nome completo"
            {...register("name")}
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="onco_email">E-mail Institucional *</Label>
          <Input
            id="onco_email"
            type="email"
            placeholder="pesquisador@instituicao.org"
            {...register("email")}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="onco_phone">Telefone / WhatsApp *</Label>
          <Input
            id="onco_phone"
            type="tel"
            placeholder="(92) 99999-9999"
            {...register("phone")}
            disabled={isLoading}
          />
          {errors.phone && (
            <p className="text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="onco_inst">Instituição / Hospital / Centro de Pesquisa *</Label>
          <Input
            id="onco_inst"
            placeholder="Nome da instituição"
            {...register("institution")}
            disabled={isLoading}
          />
          {errors.institution && (
            <p className="text-xs text-red-500">{errors.institution.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="onco_role">Cargo / Especialidade *</Label>
          <Input
            id="onco_role"
            placeholder="Ex: Cirurgião Oncológico, Pesquisador, Gestor SUS"
            {...register("role")}
            disabled={isLoading}
          />
          {errors.role && (
            <p className="text-xs text-red-500">{errors.role.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Tipo de Interesse *</Label>
          <Select
            disabled={isLoading}
            onValueChange={(val) => {
              if (val) setValue("interestType", val, { shouldValidate: true });
            }}
            value={watch("interestType")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo de interesse" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Parceria clínica">Parceria Clínica / Validação em Hospital</SelectItem>
              <SelectItem value="Pesquisa/P&D">Pesquisa Técnico-Científica / P&D</SelectItem>
              <SelectItem value="Saúde Pública/SUS">Incorporação SUS / Saúde Pública</SelectItem>
              <SelectItem value="Investimento">Investimento em Deep Tech / Fomento</SelectItem>
              <SelectItem value="Outro">Outro interesse</SelectItem>
            </SelectContent>
          </Select>
          {errors.interestType && (
            <p className="text-xs text-red-500">{errors.interestType.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="onco_message">Mensagem / Proposta de Parceria *</Label>
        <Textarea
          id="onco_message"
          placeholder="Compartilhe como sua organização deseja colaborar, validar ou investir no desenvolvimento do OncoMatrix..."
          className="min-h-[110px]"
          {...register("message")}
          disabled={isLoading}
        />
        {errors.message && (
          <p className="text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Consentimento LGPD */}
      <div className="space-y-2 pt-1">
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="onco_consent"
            {...register("consentLGPD")}
            disabled={isLoading}
            className="h-4 w-4 mt-0.5 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <Label
            htmlFor="onco_consent"
            className="font-normal text-xs text-foreground/70 cursor-pointer leading-tight"
          >
            Concordo com o tratamento dos dados fornecidos para contato sobre o desenvolvimento do biomaterial OncoMatrix, conforme a{" "}
            <Link href="/privacidade" target="_blank" className="text-primary underline">
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
        className="w-full h-12 rounded-full text-base font-medium shadow-sm"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processando mensagem...
          </>
        ) : (
          "Enviar Proposta de Parceria"
        )}
      </Button>
    </form>
  );
}
