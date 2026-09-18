import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ExternalLink, ShieldCheck, Sparkles } from "lucide-react";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const userName = session.user.name ?? "Administrador";
  const userEmail = session.user.email ?? "";

  return (
    <div className="min-h-screen flex bg-slate-50/80 text-slate-800 antialiased">
      {/* Fixed/Sticky Modern Sidebar */}
      <AdminSidebar userName={userName} userEmail={userEmail} />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span>BioSpin</span>
              <span>/</span>
              <span className="text-slate-800 font-bold">Painel de Controle</span>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200/60">
              <Sparkles className="w-3 h-3 text-blue-600" />
              Deeptech Admin
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-blue-700 hover:bg-blue-50/60 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
            >
              <span>Ver site público</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-200">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-slate-500 font-medium">Online</span>
            </div>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      <Toaster richColors position="top-right" />
    </div>
  );
}
