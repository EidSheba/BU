import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bu-ngfj.vercel.app"),
  title: "Umberella — Creative Experiential Powerhouse",
  description: "Business Umbrella specializes in exhibitions, conferences, and live events — delivering end-to-end event management, creative production, and brand experiences across Saudi Arabia and the region.",
  openGraph: {
    title: "Umberella — Creative Experiential Powerhouse",
    description: "Business Umbrella specializes in exhibitions, conferences, and live events — delivering end-to-end event management, creative production, and brand experiences across Saudi Arabia and the region.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Umberella — Creative Experiential Powerhouse",
    description: "Business Umbrella specializes in exhibitions, conferences, and live events — delivering end-to-end event management, creative production, and brand experiences across Saudi Arabia and the region.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <head>
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
