import StickyNavbar from "@/components/StickyNavbar";
import FooterSection from "@/components/sections/FooterSection";
import ServicesTitle from "@/components/sections/ServicesTitle";
import ServicesListSection from "@/components/sections/ServicesListSection";

export const metadata = {
  title: "Services — Business Umbrella | Event Management, Creative & More",
  description:
    "Explore Business Umbrella's full range of services: event management, entertainment, conferences, team building, design studio, event production, and more across Saudi Arabia.",
  openGraph: {
    title: "Services — Business Umbrella | Event Management & Creative",
    description:
      "Full-service event management, entertainment, design, and brand activation across Saudi Arabia, UAE, and Egypt.",
    url: "https://umbrella.sa/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — Business Umbrella | Event Management & Creative",
    description:
      "Full-service event management, entertainment, design, and brand activation across Saudi Arabia, UAE, and Egypt.",
  },
};

export default function ServicesPage() {
  return (
    <main>
      <StickyNavbar />
      <ServicesTitle />
      <ServicesListSection />
      <FooterSection />
    </main>
  );
}
