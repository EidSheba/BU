import StickyNavbar from "@/components/StickyNavbar";
import FooterSection from "@/components/sections/FooterSection";
import ProjectsHero from "@/components/sections/ProjectsHero";
import ProjectsIndexSection from "@/components/sections/ProjectsIndexSection";

export const metadata = {
  title: "Projects — Business Umbrella | Portfolio of Events & Activations",
  description:
    "Explore Business Umbrella's portfolio: government conferences, world-class sporting events, cultural festivals, and brand activations across Saudi Arabia and the region.",
  openGraph: {
    title: "Projects — Business Umbrella | Portfolio of Events & Activations",
    description:
      "Government conferences, sporting events, cultural festivals, and brand activations across Saudi Arabia and the region.",
    url: "https://umbrella.sa/projects",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects — Business Umbrella | Portfolio of Events & Activations",
    description:
      "Government conferences, sporting events, cultural festivals, and brand activations across Saudi Arabia and the region.",
  },
};

export default function ProjectsPage() {
  return (
    <main>
      <StickyNavbar />
      <ProjectsHero />
      <ProjectsIndexSection />
      <FooterSection />
    </main>
  );
}
