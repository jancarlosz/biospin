import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { ScrollRevealProvider } from "@/components/public/scroll-reveal-provider";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScrollRevealProvider>
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </ScrollRevealProvider>
  );
}
