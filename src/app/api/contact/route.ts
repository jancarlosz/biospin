import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { db } from "@/lib/db";

const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().optional(),
  company: z.string().optional(),
  role: z.string().optional(),
  segment: z.string().optional(),
  institution: z.string().optional(),
  interestType: z.string().optional(),
  subject: z.string().min(2, "Selecione um assunto"),
  message: z.string().min(10, "Mensagem deve ter no mínimo 10 caracteres"),
  requestQuote: z.boolean().default(false),
  consentLGPD: z.literal(true, {
    message: "O aceite dos termos de privacidade é obrigatório.",
  }),
  origin: z.string().optional(),
  bot_field: z.string().optional(),
});

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos.", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      phone,
      company,
      role,
      segment,
      institution,
      interestType,
      subject,
      message,
      requestQuote,
      origin,
      bot_field,
    } = parsed.data;

    // Honeypot check: silently succeed without saving
    if (bot_field) {
      return NextResponse.json({ success: true });
    }

    // Persist submission to DB
    await db.contactSubmission.create({
      data: {
        name,
        email,
        phone: phone ?? null,
        company: company ?? null,
        institution: institution ?? null,
        role: role ?? null,
        segment: segment ?? null,
        interestType: interestType ?? null,
        subject,
        message,
        requestQuote: requestQuote ?? false,
        origin: origin ?? null,
        consentLGPD: true,
        consentAt: new Date(),
      },
    });

    const recipientEmail =
      process.env.CONTACT_EMAIL_RECIPIENT || "contato@biospin.com.br";

    // Simulate if no real API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY não configurada. Simulando envio de e-mail:");
      console.log({
        to: recipientEmail,
        name,
        email,
        phone,
        company,
        role,
        segment,
        institution,
        interestType,
        subject,
        message,
        requestQuote,
        origin,
      });
      return NextResponse.json({ success: true });
    }

    // Send email via Resend
    await resend.emails.send({
      from: "BioSpin Site <onboarding@resend.dev>",
      to: recipientEmail,
      replyTo: email,
      subject: `[Lead BioSpin] ${subject} - ${name}${company ? ` (${company})` : ""}`,
      text: `Novo contato recebido pelo site BioSpin:\n\nNome: ${name}\nE-mail: ${email}\nTelefone/WhatsApp: ${phone || "Não informado"}\nEmpresa/Instituição: ${company || institution || "Não informada"}\nCargo: ${role || "Não informado"}\nSegmento / Interesse: ${segment || interestType || "Não especificado"}\nAssunto/Serviço: ${subject}\nSolicita Orçamento: ${requestQuote ? "SIM" : "NÃO"}\nOrigem do Lead (Página): ${origin || "Não identificada"}\n\nMensagem:\n${message}\n`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro no envio do contato:", error);
    return NextResponse.json(
      { error: "Erro interno ao processar a mensagem." },
      { status: 500 }
    );
  }
}
