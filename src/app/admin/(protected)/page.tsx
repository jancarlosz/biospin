import Link from "next/link";
import { db } from "@/lib/db";
import { FileText, Sparkles, FolderTree, ArrowRight, PlusCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Dashboard | Painel BioSpin",
};

export default async function AdminDashboardPage() {
  const [postsCount, solutionsCount, categoriesCount, recentPosts] = await Promise.all([
    db.post.count(),
    db.solution.count(),
    db.category.count(),
    db.post.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { category: true },
    }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-1">
          Bem-vindo ao painel de gestão de conteúdos e catálogo da BioSpin.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Total de Artigos</span>
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold text-slate-900">{postsCount}</span>
            <p className="text-xs text-slate-500 mt-1">Matérias e artigos cadastrados</p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/admin/posts"
              className="text-xs font-semibold text-primary hover:text-secondary flex items-center gap-1"
            >
              Gerenciar artigos <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Soluções no Catálogo</span>
            <div className="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold text-slate-900">{solutionsCount}</span>
            <p className="text-xs text-slate-500 mt-1">Dispositivos e biomateriais</p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/admin/solucoes"
              className="text-xs font-semibold text-secondary hover:text-primary flex items-center gap-1"
            >
              Ver catálogo <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Categorias de Conteúdo</span>
            <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
              <FolderTree className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold text-slate-900">{categoriesCount}</span>
            <p className="text-xs text-slate-500 mt-1">Classificações temáticas ativas</p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/admin/categorias"
              className="text-xs font-semibold text-slate-700 hover:text-primary flex items-center gap-1"
            >
              Organizar categorias <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">Últimos Posts Publicados</h2>
            <Link href="/admin/posts" className="text-xs text-primary font-medium hover:underline">
              Ver todos
            </Link>
          </div>
          {recentPosts.length === 0 ? (
            <p className="text-sm text-slate-500 py-6 text-center">Nenhum post recente cadastrado.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentPosts.map((post) => (
                <div key={post.id} className="py-3 flex items-center justify-between">
                  <div>
                    <Link
                      href={`/admin/posts/${post.id}`}
                      className="text-sm font-medium text-slate-900 hover:text-primary"
                    >
                      {post.title}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-sm">
                        {post.category?.name || "Sem categoria"}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          post.status === "PUBLISHED"
                            ? "bg-primary/10 text-primary"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {post.status === "PUBLISHED" ? "Publicado" : "Rascunho"}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="text-slate-400 hover:text-slate-600 p-1"
                    title="Ver no site público"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Ações Rápidas</h2>
          <div className="space-y-3">
            <Button className="w-full justify-start gap-2 bg-primary hover:bg-primary/90 text-primary-foreground" render={<Link href="/admin/posts/novo" />}>
              <PlusCircle className="w-4 h-4" /> Novo Post
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline" render={<Link href="/admin/solucoes/novo" />}>
              <PlusCircle className="w-4 h-4" /> Nova Solução
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline" render={<Link href="/" target="_blank" />}>
              <ExternalLink className="w-4 h-4" /> Abrir Site Público
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
