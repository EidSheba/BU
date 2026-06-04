import StickyNavbar from "@/components/StickyNavbar";
import AtAGlanceSection from "@/components/sections/AtAGlanceSection";
import FooterSection from "@/components/sections/FooterSection";

export const metadata = {
  title: "About — Umberella",
  description: "Learn more about Business Umbrella.",
};

export default function AboutPage() {
  return (
    <main>
      <StickyNavbar />
      <div style={{ paddingTop: "80px" }} />
      <AtAGlanceSection />
      <FooterSection />
    </main>
  );
}
