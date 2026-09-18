import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://biospin.com.br";
const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BioSpin | Nanotecnologia e Bioativos da Amazônia para Saúde e Beleza",
    template: "%s | BioSpin",
  },
  description:
    "A BioSpin transforma bioativos amazônicos em nanotecnologia para saúde e beleza: curativos regenerativos, biomateriais médicos e cosméticos sustentáveis.",
  keywords: [
    "BioSpin",
    "nanotecnologia",
    "bioativos da Amazônia",
    "biomateriais",
    "curativo regenerativo",
    "Nanofiberdressing",
    "OncoMatrix",
    "deeptech",
    "saúde",
  ],
  authors: [{ name: "BioSpin" }],
  creator: "BioSpin",
  publisher: "BioSpin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "BioSpin",
    title: "BioSpin | Nanotecnologia e Bioativos da Amazônia para Saúde e Beleza",
    description:
      "Transformamos bioativos amazônicos em nanotecnologia de ponta para saúde e beleza: curativos regenerativos, biomateriais médicos e cosméticos sustentáveis.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BioSpin — Deep Tech Amazônica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BioSpin | Nanotecnologia e Bioativos da Amazônia",
    description:
      "Transformamos bioativos amazônicos em nanotecnologia de ponta para saúde e beleza.",
    images: ["/og-image.jpg"],
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={cn("antialiased", inter.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-screen flex flex-col font-sans">
        {children}
        <Toaster richColors position="top-right" />
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}

