import HeroSection from "@/components/sections/HeroSection";
import ScrollRevealText from "@/components/sections/ScrollRevealText";
import StorytellersCircles from "@/components/sections/StorytellersCircles";
import StackSection from "@/components/sections/StackSection";
import ParallaxBanner from "@/components/sections/ParallaxBanner";
import ArchitectSection from "@/components/sections/ArchitectSection";
import SecretSection from "@/components/sections/SecretSection";
import GridSection from "@/components/sections/GridSection";
import WorkSliderSection from "@/components/sections/WorkSliderSection";
import FooterSection from "@/components/sections/FooterSection";
import StickyNavbar from "@/components/StickyNavbar";

export default function Home() {
  return (
    <main>
      <StickyNavbar />
      <HeroSection />
      <ScrollRevealText
        group1={["we are not just", "a creative agency"]}
        group2={["we are strategy-led", "storytellers"]}
      />
      <StorytellersCircles />
      <StackSection />
      <ParallaxBanner
        image="/images/parallax-1.jpg"
        text="Business Umbrella"
      />
      <ParallaxBanner
        image="/images/parallax-2.jpg"
        text="We Create"
      />
      <ParallaxBanner
        image="/images/parallax-3.jpg"
        text="We Inspire"
      />
      <ParallaxBanner
        image="/images/parallax-4.jpg"
        text="We Deliver"
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
