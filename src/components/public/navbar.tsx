"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre a BioSpin" },
  { href: "/solucoes", label: "Soluções" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDarkHero =
    !isScrolled &&
    !isMobileMenuOpen &&
    (pathname === "/sobre" ||
      pathname === "/blog" ||
      pathname.startsWith("/solucoes"));

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm border-b border-border"
          : isMobileMenuOpen
          ? "bg-background border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="flex items-center transition-opacity hover:opacity-90 py-2"
            >
              <Image
                src={isDarkHero ? "/branco-biospin-horizontal.png" : "/logo-biospin-horizontal.png"}
                alt="BioSpin Nanotech"
                width={190}
                height={50}
                className="h-10 md:h-11 w-auto object-contain transition-all duration-300"
                priority
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    isDarkHero
                      ? isActive
                        ? "text-white font-semibold bg-white/20 backdrop-blur-md"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                      : isActive
                      ? "text-primary font-semibold bg-primary/5"
                      : "text-foreground/75 hover:text-primary hover:bg-foreground/5"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/5592999999999?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20BioSpin%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar no WhatsApp"
              className={cn(
                "w-10 h-10 rounded-full border flex items-center justify-center transition-all",
                isDarkHero
                  ? "border-white/20 text-white hover:bg-white/15 hover:border-white/40"
                  : "border-foreground/10 text-foreground/70 hover:text-green-600 hover:border-green-500/40 hover:bg-green-50/50"
              )}
              title="Falar no WhatsApp"
            >
              <FaWhatsapp className="h-4 w-4" />
            </a>
            <Button
              className={cn(
                "rounded-full px-5 transition-all",
                isDarkHero
                  ? "bg-white text-primary hover:bg-white/90 shadow-md font-semibold"
                  : ""
              )}
              render={<Link href="/contato" />}
            >
              Fale Conosco
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="https://wa.me/5592999999999?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20BioSpin%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar no WhatsApp"
              className={cn(
                "p-2 transition-colors",
                isDarkHero ? "text-white hover:text-white/80" : "text-foreground/70 hover:text-green-600"
              )}
            >
              <FaWhatsapp className="h-5 w-5" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "p-2 focus:outline-none transition-colors",
                isDarkHero ? "text-white hover:text-white/80" : "text-foreground hover:text-primary"
              )}
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-foreground/10 shadow-xl absolute w-full left-0">
          <div className="px-4 pt-3 pb-6 space-y-1">
            {navLinks.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-base font-medium rounded-xl transition-colors",
                    isActive
                      ? "text-primary font-semibold bg-primary/10"
                      : "text-foreground/80 hover:bg-gray-50"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-4 px-2">
              <Button
                render={
                  <Link
                    href="/contato"
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                }
                className="w-full rounded-xl h-12"
              >
                Fale Conosco
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

