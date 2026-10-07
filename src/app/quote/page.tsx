import type { Metadata } from "next";
import StickyNavbar from "@/components/StickyNavbar";
import QuoteHero from "@/components/sections/QuoteHero";
import QuoteFormSection from "@/components/sections/QuoteFormSection";
import FooterSection from "@/components/sections/FooterSection";

export const metadata: Metadata = {
  title: "Request a Quote — Business Umbrella",
  description:
    "Request a tailored quotation for your exhibition booth, event, conference or brand activation from Business Umbrella.",
};

export default function QuotePage() {
  return (
    <main>
      <StickyNavbar />
      <QuoteHero />
      <QuoteFormSection />
      <FooterSection />
    </main>
  );
}
