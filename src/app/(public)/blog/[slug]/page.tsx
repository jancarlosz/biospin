import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Share2 } from "lucide-react";
import { db } from "@/lib/db";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = await db.post.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!post) return { title: "Artigo não encontrado" };

  return {
    title: post.seoTitle || `${post.title} | Blog BioSpin`,
    description: post.seoDescription || post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = await db.post.findUnique({
    where: { slug: resolvedParams.slug, status: "PUBLISHED" },
    include: { category: true },
  });

  if (!post) {
    notFound();
  }

  // To build full URL for sharing
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://biospin.com.br";
  const postUrl = `${baseUrl}/blog/${post.slug}`;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header do Artigo */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
          <div className="absolute inset-0 bg-nanotech-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[130px] opacity-70 animate-float-slow" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[110px] opacity-60 animate-float-reverse" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 reveal-on-scroll">
          <Button variant="link" className="text-foreground/50 hover:text-primary mb-12 p-0 h-auto font-medium group inline-flex items-center" render={<Link href="/blog" />}>
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Voltar para o Blog
          </Button>

          <div className="flex items-center gap-4 mb-8">
            <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full border border-primary/20">
              {post.category.name}
            </span>
            {post.publishedAt && (
              <span className="flex items-center text-foreground/50 text-sm font-medium">
                <Calendar className="mr-2 h-4 w-4 text-secondary" />
                {format(new Date(post.publishedAt), "dd 'de' MMMM, yyyy", { locale: ptBR })}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold font-heading text-foreground mb-8 leading-[1.1] tracking-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl md:text-2xl text-foreground/60 leading-relaxed font-light border-l-4 border-secondary pl-6">
              {post.excerpt}
            </p>
          )}
        </div>
      </section>

      {/* Imagem de Capa (Opcional) */}
      {post.coverImageUrl && (
        <section className="pb-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full reveal-on-scroll">
          <div className="relative w-full h-[300px] md:h-[450px] rounded-[2rem] overflow-hidden bg-foreground/5 shadow-xl border border-border/50">
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
          </div>
        </section>
      )}

      {/* Corpo do Artigo */}
      <section className="pb-32 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div 
            className="prose prose-lg md:prose-xl max-w-none prose-headings:font-heading prose-headings:text-foreground prose-h2:text-4xl prose-h3:text-2xl prose-p:text-foreground/70 prose-p:font-light prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary/80 prose-li:text-foreground/70 prose-li:font-light prose-img:rounded-[2rem] prose-strong:text-foreground prose-strong:font-bold prose-blockquote:border-secondary prose-blockquote:bg-foreground/5 prose-blockquote:rounded-r-2xl prose-blockquote:py-2 prose-blockquote:px-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Compartilhamento */}
          <div className="mt-20 pt-10 border-t border-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center text-foreground/70 font-medium">
              <Share2 className="mr-3 h-5 w-5" /> Compartilhe este artigo
            </div>
            <div className="flex items-center gap-4">
              <a 
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(post.title)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center text-foreground/60 hover:bg-primary hover:text-white transition-colors"
                aria-label="Compartilhar no LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a 
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center text-foreground/60 hover:bg-primary hover:text-white transition-colors"
                aria-label="Compartilhar no Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center text-foreground/60 hover:bg-primary hover:text-white transition-colors"
                aria-label="Compartilhar no Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
