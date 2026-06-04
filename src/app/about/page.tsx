import StickyNavbar from "@/components/StickyNavbar";
import FooterSection from "@/components/sections/FooterSection";

export const metadata = {
  title: "About — Umberella",
  description: "Learn more about Business Umbrella.",
};

export default function AboutPage() {
  return (
    <main>
      <StickyNavbar />
      <div style={{ minHeight: "100vh" }} />
      <FooterSection />
    </main>
  );
}
