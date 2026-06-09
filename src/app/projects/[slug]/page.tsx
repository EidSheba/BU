import { notFound } from "next/navigation";
import { PROJECTS_DATA, getProjectBySlug } from "@/data/projects";
import StickyNavbar from "@/components/StickyNavbar";
import FooterSection from "@/components/sections/FooterSection";
import ProjectDetail from "@/components/sections/ProjectDetail";

export function generateStaticParams() {
  return PROJECTS_DATA.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Business Umbrella`,
    description: project.overview,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <main>
      <StickyNavbar />
      <ProjectDetail project={project} />
      <FooterSection />
    </main>
  );
}
