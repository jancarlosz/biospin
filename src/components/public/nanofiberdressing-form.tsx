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
import { Loader2, ShieldCheck } from "lucide-react";

const nanofiberSchema = z.object({
  name: z.string().min(2, "Nome completo é obrigatório"),
  email: z.string().email("E-mail corporativo inválido"),
  phone: z.string().min(8, "Telefone ou WhatsApp é obrigatório"),
  role: z.string().min(2, "Cargo ou função é obrigatório"),
  company: z.string().min(2, "Nome da empresa ou hospital é obrigatório"),
  segment: z.string().min(2, "Selecione o segmento de atuação"),
  message: z.string().optional(),
  consentLGPD: z.literal(true, {
    message: "Você deve concordar com os termos de privacidade para enviar a solicitação",
  }),
  bot_field: z.string().optional(),
});

type NanofiberFormData = z.infer<typeof nanofiberSchema>;

export function NanofiberdressingForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<NanofiberFormData>({
    resolver: zodResolver(nanofiberSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "",
      company: "",
      segment: "",
      message: "",
      consentLGPD: true,
      bot_field: "",
    },
  });

  const onSubmit = async (data: NanofiberFormData) => {
    if (data.bot_field) {
      toast.success("Solicitação recebida com sucesso!");
      reset();
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        ...data,
        subject: `Interesse em Nanofiberdressing - ${data.company} (${data.segment})`,
        message: data.message?.trim() || "Solicitação de material técnico e contato para validação do Nanofiberdressing.",
        origin: "/solucoes/nanofiberdressing",
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erro ao processar a solicitação");
      }

      toast.success(
        "Solicitação enviada com sucesso! Nosso time técnico-comercial retornará em até 2 dias úteis."
      );
      reset({
        name: "",
        email: "",
        phone: "",
        role: "",
        company: "",
        segment: "",
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
      {/* Honeypot anti-spam */}
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
          <Label htmlFor="nano_name">Nome Completo *</Label>
          <Input
            id="nano_name"
            placeholder="Dr(a). Seu Nome"
            {...register("name")}
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="nano_email">E-mail Corporativo *</Label>
          <Input
            id="nano_email"
            type="email"
            placeholder="nome@hospital.com.br"
            {...register("email")}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="nano_phone">Telefone / WhatsApp *</Label>
          <Input
            id="nano_phone"
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
          <Label htmlFor="nano_role">Cargo / Função *</Label>
          <Input
            id="nano_role"
            placeholder="Ex: Diretor(a) Clínico(a), Enfermeiro(a)"
            {...register("role")}
            disabled={isLoading}
          />
          {errors.role && (
            <p className="text-xs text-red-500">{errors.role.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="nano_company">Empresa / Hospital / Clínica *</Label>
          <Input
            id="nano_company"
            placeholder="Nome da instituição"
            {...register("company")}
            disabled={isLoading}
          />
          {errors.company && (
            <p className="text-xs text-red-500">{errors.company.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Segmento de Atuação *</Label>
          <Select
            disabled={isLoading}
            onValueChange={(val) => {
              if (val) setValue("segment", val, { shouldValidate: true });
            }}
            value={watch("segment")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o segmento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Hospital/Clínica">Hospital / Clínica Especializada</SelectItem>
              <SelectItem value="Dispositivo Médico">Empresa de Dispositivos Médicos</SelectItem>
              <SelectItem value="Saúde Pública/SUS">Saúde Pública / Gestor SUS</SelectItem>
              <SelectItem value="Distribuição/Indústria">Distribuidor / Indústria Farmacêutica</SelectItem>
              <SelectItem value="Homecare">Homecare / Enfermagem Domiciliar</SelectItem>
              <SelectItem value="Outro">Outro segmento</SelectItem>
            </SelectContent>
          </Select>
          {errors.segment && (
            <p className="text-xs text-red-500">{errors.segment.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nano_message">
          Mensagem / Interesse Específico <span className="text-foreground/50 text-xs">(Opcional)</span>
        </Label>
        <Textarea
          id="nano_message"
          placeholder="Conte sobre sua instituição, protocolo de interesse ou interesse em validação clínica do Nanofiberdressing..."
          className="min-h-[100px]"
          {...register("message")}
          disabled={isLoading}
        />
      </div>

      {/* Consentimento LGPD */}
      <div className="space-y-2 pt-1">
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="nano_consent"
            {...register("consentLGPD")}
            disabled={isLoading}
            className="h-4 w-4 mt-0.5 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <Label
            htmlFor="nano_consent"
            className="font-normal text-xs text-foreground/70 cursor-pointer leading-tight"
          >
            Concordo com o tratamento dos dados corporativos fornecidos para contato técnico e envio de material científico do Nanofiberdressing, conforme a{" "}
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
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processando envio...
          </>
        ) : (
          "Solicitar Demonstração Técnica"
        )}
      </Button>
    </form>
  );
}
