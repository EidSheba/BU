export interface ServiceData {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  overview: string;
  features: string[];
  heroImg: string;
  gallery: string[];
}

export const SERVICES_DATA: ServiceData[] = [
  {
    id: "01",
    slug: "event-management",
    title: "Event Management",
    tagline: "Precision. Creativity. Flawless execution.",
    overview:
      "We take full ownership of your event from the first brief to the final bow. Our end-to-end management covers every detail — logistics, timelines, vendor coordination, on-site operations — so you can stay focused on your audience while we make the magic happen behind the scenes.",
    features: [
      "Event concept & creative direction",
      "Budget planning & financial oversight",
      "Vendor sourcing & contract negotiation",
      "Full on-site production management",
      "Risk assessment & contingency planning",
      "Post-event reporting & analytics",
    ],
    heroImg: "/images/grid-event-1.jpg",
    gallery: ["/images/grid-event-2.jpg", "/images/grid-event-3.jpg", "/images/grid-event-4.jpg"],
  },
  {
    id: "02",
    slug: "entertainment",
    title: "Entertainment",
    tagline: "Acts that electrify. Moments that endure.",
    overview:
      "From headline musical acts and stand-up comedy to immersive theatrical performances, we curate world-class entertainment that transforms any gathering into an unforgettable experience. We source, manage, and deliver talent that fits your brand and moves your audience.",
    features: [
      "Artist & performer sourcing",
      "Contract negotiation & rider management",
      "Stage & technical requirements coordination",
      "MC & host bookings",
      "Live band & DJ curation",
      "Surprise & special entertainment activations",
    ],
    heroImg: "/images/grid-perf-1.jpg",
    gallery: ["/images/grid-perf-2.jpg", "/images/grid-perf-3.jpg", "/images/grid-perf-4.jpg"],
  },
  {
    id: "03",
    slug: "event-personnel",
    title: "Event Personnel",
    tagline: "The right people, in the right place.",
    overview:
      "Every great event runs on great people. We supply fully trained, professional event staff — from brand ambassadors and hosts to security teams and technical crew. Our personnel are briefed, uniformed, and ready to represent your brand with excellence.",
    features: [
      "Brand ambassadors & hostesses",
      "Registration & welcome desk teams",
      "Security & crowd controllers",
      "Technical & AV support crew",
      "Bilingual & multilingual staff",
      "Supervisory & floor management teams",
    ],
    heroImg: "/images/grid-event-2.jpg",
    gallery: ["/images/grid-event-3.jpg", "/images/grid-event-4.jpg", "/images/grid-event-5.jpg"],
  },
  {
    id: "04",
    slug: "crowd-management",
    title: "Crowd Management",
    tagline: "Safety by design. Control with care.",
    overview:
      "Managing thousands of people requires precision planning and real-time decision-making. We engineer crowd flow, entry systems, and emergency protocols that prioritize safety without compromising the guest experience — at any scale.",
    features: [
      "Crowd flow mapping & access design",
      "Entry & exit system management",
      "Emergency evacuation planning",
      "Real-time crowd monitoring",
      "Barrier & queue management",
      "Coordination with local authorities",
    ],
    heroImg: "/images/grid-event-3.jpg",
    gallery: ["/images/grid-event-1.jpg", "/images/grid-event-4.jpg", "/images/parallax-1.jpg"],
  },
  {
    id: "05",
    slug: "conferences-seminars",
    title: "Conferences & Seminars",
    tagline: "Ideas deserve the perfect stage.",
    overview:
      "We design and deliver professional conferences and seminars that inspire, educate, and connect. From intimate executive summits to large-scale industry forums — we handle everything from speaker management to technical production and delegate experience.",
    features: [
      "Conference concept & agenda design",
      "Speaker sourcing & management",
      "AV & simultaneous interpretation setup",
      "Delegate registration & management",
      "Breakout session coordination",
      "Post-conference content capture",
    ],
    heroImg: "/images/grid-event-5.jpg",
    gallery: ["/images/grid-event-1.jpg", "/images/grid-event-2.jpg", "/images/parallax-2.jpg"],
  },
  {
    id: "06",
    slug: "team-building",
    title: "Team Building",
    tagline: "Build teams. Build culture. Build success.",
    overview:
      "Exceptional organisations are built on exceptional teams. We design immersive team-building experiences that foster trust, sharpen collaboration, and ignite motivation — from outdoor adventures to indoor workshops and corporate games.",
    features: [
      "Custom activity design & facilitation",
      "Indoor & outdoor challenge programmes",
      "Leadership & communication workshops",
      "Cross-departmental bonding experiences",
      "Cultural engagement programmes",
      "Measurable outcome reporting",
    ],
    heroImg: "/images/grid-event-4.jpg",
    gallery: ["/images/grid-event-2.jpg", "/images/grid-event-5.jpg", "/images/parallax-3.jpg"],
  },
  {
    id: "07",
    slug: "venue-sourcing",
    title: "Venue Sourcing",
    tagline: "The right space changes everything.",
    overview:
      "Location sets the tone for every event. We leverage an exclusive network of venues — from iconic landmarks and luxury hotels to unconventional spaces and private estates — to find the perfect match for your event vision, capacity, and budget.",
    features: [
      "Venue research & shortlisting",
      "Site visits & assessment",
      "Contract & rate negotiation",
      "Exclusive venue partnerships",
      "Virtual & hybrid venue options",
      "International venue sourcing",
    ],
    heroImg: "/images/parallax-2.jpg",
    gallery: ["/images/parallax-1.jpg", "/images/parallax-3.jpg", "/images/parallax-4.jpg"],
  },
  {
    id: "08",
    slug: "event-marketing",
    title: "Event Marketing",
    tagline: "Reach the right people. Make noise that matters.",
    overview:
      "A great event deserves a great audience. We build integrated marketing campaigns that create buzz before, during, and after your event — combining digital strategy, content creation, influencer partnerships, and PR to maximise reach and impact.",
    features: [
      "Pre-event digital campaigns",
      "Social media strategy & management",
      "Influencer & media partnerships",
      "Email & CRM marketing",
      "Live event coverage & content",
      "Post-event reporting & ROI analysis",
    ],
    heroImg: "/images/parallax-3.jpg",
    gallery: ["/images/grid-media-2.jpg", "/images/grid-media-3.jpg", "/images/grid-media-4.jpg"],
  },
  {
    id: "09",
    slug: "event-production",
    title: "Event Production",
    tagline: "Technical excellence. Seamless delivery.",
    overview:
      "We bring your vision to life with cutting-edge production — from stage design and lighting rigs to high-resolution AV systems and live streaming. Our technical teams work quietly behind the scenes so your event shines in the spotlight.",
    features: [
      "Stage & set design & build",
      "Lighting design & operation",
      "Sound systems & audio engineering",
      "LED & projection mapping",
      "Live streaming & broadcast",
      "Technical rehearsal & on-site management",
    ],
    heroImg: "/images/grid-film-1.jpg",
    gallery: ["/images/grid-film-2.jpg", "/images/grid-film-3.jpg", "/images/parallax-1.jpg"],
  },
  {
    id: "10",
    slug: "design-studio",
    title: "Design Studio",
    tagline: "Visual worlds that live beyond the event.",
    overview:
      "Our creative studio designs the visual identity of your event from the ground up — brand guidelines, environmental graphics, stage backdrops, digital assets, printed collateral, and everything in between. We make your event look as extraordinary as it feels.",
    features: [
      "Event branding & visual identity",
      "Stage backdrop & environmental design",
      "Digital assets & motion graphics",
      "Print & signage production",
      "Venue dressing & décor concepts",
      "Post-event design assets",
    ],
    heroImg: "/images/grid-design-1.jpg",
    gallery: ["/images/grid-design-2.jpg", "/images/grid-design-3.jpg", "/images/grid-creative-1.jpg"],
  },
  {
    id: "11",
    slug: "event-giveaways",
    title: "Event Giveaways",
    tagline: "Gifts they keep. Brands they remember.",
    overview:
      "The right giveaway extends your brand long after the event ends. We design and produce custom branded merchandise — from premium gift sets and sustainable products to high-impact experiential giveaways — that leave a lasting impression.",
    features: [
      "Custom merchandise design",
      "Branded packaging & presentation",
      "Sustainable & eco-friendly options",
      "Bulk production & quality control",
      "On-site distribution management",
      "Premium & VIP gift curation",
    ],
    heroImg: "/images/grid-creative-1.jpg",
    gallery: ["/images/grid-creative-2.jpg", "/images/grid-creative-3.jpg", "/images/grid-design-4.jpg"],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES_DATA.find((s) => s.slug === slug);
}
