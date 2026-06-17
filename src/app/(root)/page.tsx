import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import ScrollRevealText from "@/components/sections/ScrollRevealText";
import StorytellersCircles from "@/components/sections/StorytellersCircles";
import StackSection from "@/components/sections/StackSection";
import ParallaxBanner from "@/components/sections/ParallaxBanner";
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
        group1={["we are not just", "a creative agency"]}
        group2={["we are strategy-led", "storytellers"]}
        group1_ar={["لسنا مجرد", "وكالة إبداعية"]}
        group2_ar={["نقود بالاستراتيجية", "رواة القصص"]}
      />
      <StorytellersCircles />
      <StackSection />
      <ParallaxBanner
        image="/images/parallax-1.jpg"
        text="Business Umbrella"
        arText="بيزنس أمبريلا"
      />
      <ParallaxBanner
        image="/images/parallax-2.jpg"
        text="We Create"
        arText="نخلق"
      />
      <ParallaxBanner
        image="/images/parallax-3.jpg"
        text="We Inspire"
        arText="نُلهم"
      />
      <ParallaxBanner
        image="/images/parallax-4.jpg"
        text="We Deliver"
        arText="نُنجز"
        textColor="#ffffff"
      />
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
