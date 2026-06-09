import StickyNavbar from "@/components/StickyNavbar";
import FooterSection from "@/components/sections/FooterSection";
import ServicesHero from "@/components/sections/ServicesHero";
import ServicesListSection from "@/components/sections/ServicesListSection";
import ServicesShowcase from "@/components/sections/ServicesShowcase";

export const metadata = {
  title: "Services — Business Umbrella",
  description:
    "Our comprehensive suite of event management, entertainment, and creative services.",
};

export default function ServicesPage() {
  return (
    <main>
      <StickyNavbar />
      <ServicesHero />
      <ServicesListSection />
      <ServicesShowcase />
      <FooterSection />
    </main>
  );
}
