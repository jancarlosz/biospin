import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRight, Search, BookOpen, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/public/spotlight-card";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Blog BioSpin | Ciência e Bioeconomia Amazônica",
  description: "Novidades sobre nanotecnologia, bioativos amazônicos e inovação em saúde e cuidado.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; categoria?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q || "";
  const selectedCategory = resolvedSearchParams.categoria || "";

  const [posts, categories] = await Promise.all([
    db.post.findMany({
      where: {
        status: "PUBLISHED",
        ...(selectedCategory ? { category: { slug: selectedCategory } } : {}),
        ...(query
          ? {
              OR: [
                { title: { contains: query, mode: "insensitive" } },
                { excerpt: { contains: query, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      orderBy: {
        publishedAt: "desc",
      },
      include: {
        category: true,
      },
    }),
    db.category.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-28 overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
          <div className="absolute inset-0 bg-nanotech-grid-dark opacity-35 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[700px] h-[700px] bg-secondary/25 rounded-full blur-[130px] opacity-70 animate-float-slow" />
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[500px] h-[500px] bg-white/10 rounded-full blur-[110px] opacity-50 animate-float-reverse" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 reveal-on-scroll">
            <div className="max-w-3xl">
              <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 text-white border border-white/20 text-xs font-bold mb-6 tracking-wider uppercase backdrop-blur-sm">
                Ciência & Bioeconomia
              </span>
              <h1 className="text-5xl md:text-7xl font-heading tracking-tight mb-6 leading-[1.1]">
                <span className="font-light block mb-2">Blog &</span>
                <span className="font-bold">Pesquisa</span>
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/80 leading-relaxed font-light">
                Acompanhe as descobertas da BioSpin em nanotecnologia, bioativos e inovação em saúde regenerativa.
              </p>
            </div>

            <div className="w-full md:w-96 shrink-0">
              <form className="relative" action="/blog" method="GET">
                {selectedCategory && (
                  <input type="hidden" name="categoria" value={selectedCategory} />
                )}
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70" />
                <input
                  type="text"
                  name="q"
                  placeholder="Pesquisar artigos..."
                  defaultValue={query}
                  className="w-full pl-12 pr-4 py-4 rounded-full bg-white/15 border border-white/25 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 backdrop-blur-md text-sm transition-all shadow-lg"
                />
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter Chips */}
          {categories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-foreground/5">
              <span className="text-xs uppercase font-bold text-foreground/40 mr-2 flex items-center gap-1">
                <Tag className="h-3.5 w-3.5" /> Categorias:
              </span>
              <Link
                href={`/blog${query ? `?q=${encodeURIComponent(query)}` : ""}`}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-semibold transition-colors",
                  !selectedCategory
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-slate-100 text-foreground/70 hover:bg-slate-200"
                )}
              >
                Todas
              </Link>
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.slug;
                const href = `/blog?categoria=${cat.slug}${query ? `&q=${encodeURIComponent(query)}` : ""}`;
                return (
                  <Link
                    key={cat.id}
                    href={href}
                    className={cn(
                      "px-4 py-2 rounded-full text-xs font-semibold transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-slate-100 text-foreground/70 hover:bg-slate-200"
                    )}
                  >
                    {cat.name}
                  </Link>
                );
              })}
            </div>
          )}

          {query && (
            <div className="mb-10 flex items-center justify-between">
              <h2 className="text-xl font-medium text-foreground">
                Resultados para: <span className="font-bold">"{query}"</span>
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-foreground/60 hover:text-foreground"
                render={<Link href="/blog" />}
              >
                Limpar filtros
              </Button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.length > 0 ? (
              posts.map((post, idx) => (
                <div key={post.id} className={`reveal-on-scroll ${idx % 3 === 1 ? 'reveal-delay-100' : idx % 3 === 2 ? 'reveal-delay-200' : ''}`}>
                  <SpotlightCard className="h-full bg-background rounded-[2.5rem] p-4 transition-all duration-300 border border-foreground/5 hover:border-primary/20 flex flex-col">
                    <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full">
                      <div className="relative aspect-[16/10] bg-white rounded-[2rem] overflow-hidden mb-6">
                        {post.coverImageUrl ? (
                          <Image
                            src={post.coverImageUrl}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-foreground/40 bg-foreground/5">
                            <BookOpen className="h-12 w-12 opacity-20" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="px-3.5 py-1 bg-white/95 backdrop-blur-md text-xs font-bold uppercase tracking-wider rounded-full text-primary shadow-sm">
                            {post.category.name}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col flex-1 px-3 pb-3">
                        <div className="text-xs text-foreground/50 mb-3 font-medium tracking-wide">
                          {post.publishedAt ? format(new Date(post.publishedAt), "dd 'de' MMMM, yyyy", { locale: ptBR }) : ""}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-foreground/60 font-light line-clamp-3 mb-6 flex-1 text-base leading-relaxed">
                          {post.excerpt || "Leia mais sobre este artigo e as pesquisas da BioSpin..."}
                        </p>
                        <div className="mt-auto flex items-center text-sm font-semibold text-primary">
                          Ler matéria completa <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  </SpotlightCard>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-background rounded-[2.5rem] p-8 border border-foreground/5">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 text-primary">
                  <BookOpen className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Nenhum artigo publicado no momento</h3>
                <p className="text-foreground/60 font-light max-w-md mx-auto mb-8 text-base">
                  Nossos pesquisadores e time de P&D estão preparando conteúdos exclusivos sobre nanotecnologia e bioativos da floresta.
                </p>
                {(query || selectedCategory) && (
                  <Button variant="outline" className="rounded-full border-foreground/20" render={<Link href="/blog" />}>
                    Limpar filtros e ver todos
                  </Button>
                )}
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}

