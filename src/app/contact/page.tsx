import StickyNavbar from "@/components/StickyNavbar";
import ContactHero from "@/components/sections/ContactHero";
import ContactSection from "@/components/sections/ContactSection";
import FooterSection from "@/components/sections/FooterSection";

export const metadata = {
  title: "Contact — Business Umbrella",
  description:
    "Get in touch with Business Umbrella to start planning your next event, campaign, or partnership.",
};

export default function ContactPage() {
  return (
    <main>
      <StickyNavbar />
      <ContactHero />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
