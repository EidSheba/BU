import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import { LangProvider } from "@/contexts/LangContext";
import type { Lang } from "@/contexts/LangContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://umbrella.sa"),
  title: {
    default: "Business Umbrella | Event Management & Creative Agency — Saudi Arabia",
    template: "%s | Business Umbrella",
  },
  description:
    "16+ years crafting unforgettable events, conferences, brand activations, and live experiences across Saudi Arabia, UAE, and Egypt. Your vision, our execution.",
  openGraph: {
    siteName: "Business Umbrella",
    type: "website",
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Business Umbrella" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Business Umbrella",
  alternateName: "بيزنس أمبريلا",
  url: "https://umbrella.sa",
  logo: "https://umbrella.sa/images/bu_logo_4.png",
  email: "hello@businessumbrella.com",
  telephone: "+966541164491",
  address: {
    "@type": "PostalAddress",
    addressCountry: "SA",
    addressLocality: "Riyadh",
  },
  areaServed: ["SA", "AE", "EG"],
  sameAs: [],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const isAr = cookieStore.get("bu-lang")?.value === "ar";

  return (
    <html
      lang={isAr ? "ar" : "en"}
      dir={isAr ? "rtl" : "ltr"}
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link
          rel="preload"
          as="font"
          href="/fonts/Amazing Grotesk Demi.otf"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="video"
          href="/videos/backgroundVideo.mp4"
          type="video/mp4"
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <LangProvider initialLang={isAr ? "ar" : "en"}>
          {children}
          <WhatsAppButton />
        </LangProvider>
      </body>
    </html>
  );
}
