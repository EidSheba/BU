import StickyNavbar from "@/components/StickyNavbar";
import FooterSection from "@/components/sections/FooterSection";
import ProjectsHero from "@/components/sections/ProjectsHero";
import ProjectsIndexSection from "@/components/sections/ProjectsIndexSection";

export const metadata = {
  title: "Projects — Business Umbrella",
  description:
    "A portfolio of flagship events, festivals, conferences, and brand activations delivered across the region.",
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
