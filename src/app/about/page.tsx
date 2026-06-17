import StickyNavbar from "@/components/StickyNavbar";
import AtAGlanceSection from "@/components/sections/AtAGlanceSection";
import ClientsSection from "@/components/sections/ClientsSection";
import FooterSection from "@/components/sections/FooterSection";

export const metadata = {
  title: "About — Business Umbrella | 16 Years of Event Excellence",
  description:
    "Meet the team behind Saudi Arabia's leading event management company. 500+ events, 15+ countries, 16 years of transforming ideas into unforgettable experiences across the Middle East.",
  openGraph: {
    title: "About Business Umbrella | 16 Years of Event Excellence",
    description:
      "Meet the team behind Saudi Arabia's leading event management company. 500+ events, 15+ countries, 16 years of experience.",
    url: "https://umbrella.sa/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Business Umbrella | 16 Years of Event Excellence",
    description:
      "Meet the team behind Saudi Arabia's leading event management company. 500+ events, 15+ countries, 16 years of experience.",
  },
};

export default function AboutPage() {
  return (
    <main>
      <StickyNavbar />
      <div style={{ paddingTop: "80px" }} />
      <AtAGlanceSection />
      <ClientsSection />
      <FooterSection />
    </main>
  );
}
