import type { Metadata } from "next";
import StickyNavbar from "@/components/StickyNavbar";
import CareerHero from "@/components/sections/CareerHero";
import CareerFormSection from "@/components/sections/CareerFormSection";
import FooterSection from "@/components/sections/FooterSection";

export const metadata: Metadata = {
  title: "Careers — Business Umbrella",
  description:
    "Join the Business Umbrella team. We're hiring creative directors, event producers, marketers, and more. Explore open positions in Riyadh, KSA.",
};

export default function CareerPage() {
  return (
    <main>
      <StickyNavbar />
      <CareerHero />
      <CareerFormSection />
      <FooterSection />
    </main>
  );
}
