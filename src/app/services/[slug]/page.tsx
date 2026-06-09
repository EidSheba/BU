import { notFound } from "next/navigation";
import { SERVICES_DATA, getServiceBySlug } from "@/data/services";
import StickyNavbar from "@/components/StickyNavbar";
import FooterSection from "@/components/sections/FooterSection";
import ServiceDetail from "@/components/sections/ServiceDetail";

export function generateStaticParams() {
  return SERVICES_DATA.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} — Business Umbrella`,
    description: service.overview,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <main>
      <StickyNavbar />
      <ServiceDetail service={service} />
      <FooterSection />
    </main>
  );
}
