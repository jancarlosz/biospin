import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Login | Painel Administrativo BioSpin",
};

export default async function AdminLoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/admin");
  }

  return (
    <div className="min-h-[100dvh] w-full bg-slate-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-[400px]">
        {/* Main Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="text-center mb-6">
            <Link href="/" className="inline-block transition-opacity hover:opacity-90">
              <Image
                src="/logo-biospin-horizontal.png"
                alt="BioSpin Nanotech"
                width={170}
                height={44}
                className="h-8 sm:h-9 w-auto object-contain mx-auto mb-4"
                priority
              />
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">
              Painel Administrativo
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Informe suas credenciais para gerenciar a plataforma.
            </p>
          </div>

          <LoginForm />
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] sm:text-xs text-slate-400 mt-5">
          © {new Date().getFullYear()} BioSpin Nanotecnologia Biomédica.
        </p>
      </div>
    </div>
  );
}
