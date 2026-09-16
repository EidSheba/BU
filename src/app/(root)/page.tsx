import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import ScrollRevealText from "@/components/sections/ScrollRevealText";
import StorytellersCircles from "@/components/sections/StorytellersCircles";
import StackSection from "@/components/sections/StackSection";
import ArchitectSection from "@/components/sections/ArchitectSection";
import SecretSection from "@/components/sections/SecretSection";
import GridSection from "@/components/sections/GridSection";
import WorkSliderSection from "@/components/sections/WorkSliderSection";
import ComingExpoSection from "@/components/sections/ComingExpoSection";
import FooterSection from "@/components/sections/FooterSection";
import StickyNavbar from "@/components/StickyNavbar";

export const metadata: Metadata = {
  title: "Business Umbrella | Event Management & Creative Agency — Saudi Arabia",
  description:
    "Saudi Arabia's leading event management and creative agency. 500+ events, 15+ countries, 16 years of transforming visions into unforgettable live experiences, conferences, and brand activations.",
  openGraph: {
    title: "Business Umbrella | Event Management & Creative Agency",
    description:
      "Saudi Arabia's leading event management and creative agency. 500+ events, 15+ countries, 16 years of transforming visions into unforgettable live experiences.",
    url: "https://umbrella.sa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Umbrella | Event Management & Creative Agency",
    description:
      "Saudi Arabia's leading event management and creative agency. 500+ events, 15+ countries, 16 years of transforming visions into unforgettable live experiences.",
  },
};

export default function Home() {
  return (
    <main>
      <StickyNavbar />
      <HeroSection />
      <ComingExpoSection />
      <ScrollRevealText
        group2={["one umbrella", "endless ideas"]}
        group2_ar={["مظلة واحدة", "أفكار بلا حدود"]}
      />
      <StorytellersCircles />
      <StackSection />
      <ArchitectSection />
      <div className="secret-scroll-space">
        <SecretSection />
      </div>
      <GridSection />
      <WorkSliderSection />
      <FooterSection />
    </main>
  );
}
