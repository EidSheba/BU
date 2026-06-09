import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Umberella — Creative Experiential Powerhouse",
  description: "A world-class creative agency delivering extraordinary live experiences.",
  openGraph: {
    title: "Umberella — Creative Experiential Powerhouse",
    description: "A world-class creative agency delivering extraordinary live experiences.",
    images: [{ url: "/images/bu_logo_4.png" }],
  },
  twitter: {
    card: "summary",
    title: "Umberella — Creative Experiential Powerhouse",
    description: "A world-class creative agency delivering extraordinary live experiences.",
    images: ["/images/bu_logo_4.png"],
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
