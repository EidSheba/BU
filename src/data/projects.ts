export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  location: string;
  tagline: string;
  overview: string;
  highlights: string[];
  heroImg: string;
  gallery: string[];
}

export const PROJECTS_DATA: ProjectData[] = [
  {
    id: "01",
    slug: "government-conferences-sponsorships",
    title: "Government Conferences & Sponsorships",
    client: "Government Sector Partners",
    category: "Conferences & Seminars",
    year: "2025",
    location: "Riyadh, KSA",
    tagline: "Where policy meets production.",
    overview:
      "A standing programme of high-level government conferences and sponsorship activations. We manage everything from delegate protocol and stage production to partner branding and on-ground logistics — delivering the precision and discretion that public-sector engagements demand.",
    highlights: [
      "Multi-ministry delegate coordination",
      "Sponsor branding & partner activation zones",
      "Full protocol & VIP logistics management",
      "End-to-end production & stage design",
    ],
    heroImg: "/images/grid-event-1.jpg",
    gallery: ["/images/grid-event-2.jpg", "/images/grid-film-1.jpg", "/images/parallax-1.jpg"],
  },
  {
    id: "02",
    slug: "sata-liwan",
    title: "SATA Liwan",
    client: "Saudi Authority for Transport Affairs",
    category: "Conferences & Seminars",
    year: "2025",
    location: "Riyadh, KSA",
    tagline: "A gathering place for the future of transport.",
    overview:
      "Liwan brought together regulators, operators, and innovators shaping the Kingdom's transport landscape. We designed and produced the full event experience — from the exhibition floor to the keynote stage — creating a space where industry conversations could genuinely move forward.",
    highlights: [
      "Dedicated exhibition & networking zones",
      "Keynote & panel stage production",
      "Delegate registration & badge systems",
      "Live session recording & highlight reels",
    ],
    heroImg: "/images/grid-event-5.jpg",
    gallery: ["/images/grid-design-3.jpg", "/images/grid-media-3.jpg", "/images/parallax-2.jpg"],
  },
  {
    id: "03",
    slug: "anime-key",
    title: "Anime Key",
    client: "Anime Key Entertainment",
    category: "Entertainment",
    year: "2024",
    location: "Jeddah, KSA",
    tagline: "A universe of fandom, brought to life.",
    overview:
      "An immersive pop-culture festival celebrating anime, gaming, and cosplay culture for a new generation of fans. We built the experience from the ground up — themed zones, stage performances, guest appearances, and a programme that kept the energy electric from open to close.",
    highlights: [
      "Themed activation zones & cosplay stages",
      "Guest artist & voice-actor appearances",
      "Gaming arenas & interactive installations",
      "Full crowd flow & ticketing operations",
    ],
    heroImg: "/images/grid-perf-1.jpg",
    gallery: ["/images/grid-perf-2.jpg", "/images/grid-creative-1.jpg", "/images/grid-media-1.jpg"],
  },
  {
    id: "04",
    slug: "riyadh-2024",
    title: "Riyadh 2024",
    client: "Riyadh Municipality",
    category: "Event Management",
    year: "2024",
    location: "Riyadh, KSA",
    tagline: "A city-wide celebration, engineered end to end.",
    overview:
      "A flagship city programme marking a milestone year for the capital — spanning concerts, public installations, and civic celebrations across multiple districts. We owned the full production calendar, coordinating dozens of moving parts into one cohesive citywide moment.",
    highlights: [
      "Multi-venue programme spanning 8 districts",
      "Public safety & crowd flow engineering",
      "Civic partnership & permit management",
      "Citywide content capture & media rollout",
    ],
    heroImg: "/images/grid-event-3.jpg",
    gallery: ["/images/grid-event-4.jpg", "/images/grid-film-2.jpg", "/images/parallax-1.jpg"],
  },
  {
    id: "05",
    slug: "mada",
    title: "MADA",
    client: "Saudi Payments (MADA)",
    category: "Event Marketing",
    year: "2024",
    location: "Riyadh, KSA",
    tagline: "Putting a national brand on the map — live.",
    overview:
      "A nationwide brand activation campaign for one of the Kingdom's most recognised payment networks. We crafted the on-ground experience and integrated digital storytelling that brought the brand closer to everyday moments across malls, campuses, and community events.",
    highlights: [
      "Roadshow activation across 10 cities",
      "Interactive brand experience booths",
      "Influencer & community partnership network",
      "Real-time campaign performance reporting",
    ],
    heroImg: "/images/grid-media-1.jpg",
    gallery: ["/images/grid-media-2.jpg", "/images/grid-design-1.jpg", "/images/grid-creative-2.jpg"],
  },
  {
    id: "06",
    slug: "italian-super-cup",
    title: "Italian Super Cup",
    client: "Saudi Sports Company (SSC)",
    category: "Crowd Management",
    year: "2024",
    location: "Riyadh, KSA",
    tagline: "World-class football. Flawless match-day execution.",
    overview:
      "Hosting an international football showpiece meant zero margin for error. We engineered match-day operations end to end — entry systems, fan zones, hospitality logistics, and real-time crowd monitoring — delivering a stadium experience that matched the prestige of the fixture.",
    highlights: [
      "60,000-capacity match-day operations",
      "VIP & hospitality lounge management",
      "Real-time crowd monitoring command centre",
      "Joint coordination with international federations",
    ],
    heroImg: "/images/grid-event-3.jpg",
    gallery: ["/images/grid-perf-3.jpg", "/images/parallax-2.jpg", "/images/grid-film-4.jpg"],
  },
  {
    id: "07",
    slug: "camel-club",
    title: "Camel Club",
    client: "Saudi Camel Club",
    category: "Event Management",
    year: "2023",
    location: "Riyadh, KSA",
    tagline: "Heritage, staged with modern precision.",
    overview:
      "A celebration of one of the Kingdom's most treasured traditions, reimagined for a modern audience. We managed the full event production — from arena logistics and broadcast coordination to hospitality villages — honouring heritage while delivering a world-class spectator experience.",
    highlights: [
      "Arena production & broadcast coordination",
      "VIP hospitality village design & operations",
      "Heritage programming & cultural curation",
      "On-site logistics for 50,000+ visitors",
    ],
    heroImg: "/images/parallax-2.jpg",
    gallery: ["/images/grid-event-2.jpg", "/images/grid-design-2.jpg", "/images/parallax-4.jpg"],
  },
  {
    id: "08",
    slug: "rice-bull-riding-co",
    title: "Rice Bull Riding Co",
    client: "Rice Bull Riding Co",
    category: "Entertainment",
    year: "2023",
    location: "Al-Kharj, KSA",
    tagline: "An adrenaline spectacle, built from the ground up.",
    overview:
      "A first-of-its-kind extreme sports entertainment series brought to the region. We built the arena infrastructure, curated the rider line-up, and produced a high-energy show experience — complete with live commentary, pyrotechnics, and a soundtrack that kept the crowd on its feet.",
    highlights: [
      "Custom arena & rider safety infrastructure",
      "International rider sourcing & logistics",
      "Live show production with pyrotechnics & FX",
      "Broadcast-ready multi-camera coverage",
    ],
    heroImg: "/images/grid-perf-4.jpg",
    gallery: ["/images/grid-perf-5.jpg", "/images/grid-film-3.jpg", "/images/parallax-3.jpg"],
  },
  {
    id: "09",
    slug: "world-nomad-games",
    title: "World Nomad Games",
    client: "Ministry of Sport",
    category: "Conferences & Seminars",
    year: "2023",
    location: "Riyadh, KSA",
    tagline: "Cultures from across the globe, on one field.",
    overview:
      "An international showcase of traditional sport and nomadic culture, hosting delegations from dozens of nations. We delivered the full operational backbone — delegation logistics, ceremony production, and a cultural programme that turned competition into cross-cultural celebration.",
    highlights: [
      "Delegations from 40+ nations hosted",
      "Opening & closing ceremony production",
      "Multilingual delegate services & logistics",
      "Cultural exhibition & heritage pavilions",
    ],
    heroImg: "/images/grid-event-5.jpg",
    gallery: ["/images/grid-creative-5.jpg", "/images/grid-design-5.jpg", "/images/grid-perf-2.jpg"],
  },
  {
    id: "10",
    slug: "suse-experts-days",
    title: "SUSE Experts Days",
    client: "SUSE",
    category: "Conferences & Seminars",
    year: "2022",
    location: "Riyadh, KSA",
    tagline: "Deep tech conversations, delivered seamlessly.",
    overview:
      "A regional gathering of enterprise IT leaders and open-source experts. We handled the full delegate journey — from technical breakout rooms and live demo stages to networking experiences — giving a highly specialised audience an event experience as polished as their craft.",
    highlights: [
      "Technical breakout & live-demo stage builds",
      "Enterprise delegate hosting & concierge",
      "Hybrid streaming for global attendees",
      "Partner showcase & networking lounge design",
    ],
    heroImg: "/images/grid-film-3.jpg",
    gallery: ["/images/grid-design-1.jpg", "/images/grid-event-1.jpg", "/images/parallax-4.jpg"],
  },
  {
    id: "11",
    slug: "sap",
    title: "SAP",
    client: "SAP Middle East",
    category: "Event Marketing",
    year: "2022",
    location: "Riyadh, KSA",
    tagline: "Enterprise software, made unforgettable.",
    overview:
      "A regional roadshow and launch campaign introducing SAP's latest enterprise solutions to the Saudi market. We blended sharp brand storytelling with a live activation experience — product demos, executive briefings, and a campaign that translated complex technology into a compelling story.",
    highlights: [
      "Executive briefing centre design & operations",
      "Live product demo zones & theatre sessions",
      "Integrated digital & on-ground campaign",
      "C-suite hospitality & networking programme",
    ],
    heroImg: "/images/grid-creative-1.jpg",
    gallery: ["/images/grid-media-4.jpg", "/images/grid-design-2.jpg", "/images/grid-creative-2.jpg"],
  },
  {
    id: "12",
    slug: "chess-champions",
    title: "Chess Champions",
    client: "Saudi Chess Federation",
    category: "Conferences & Seminars",
    year: "2021",
    location: "Riyadh, KSA",
    tagline: "Where the world's sharpest minds met the board.",
    overview:
      "An elite chess championship bringing together grandmasters from across the globe. We produced the tournament environment from the playing hall to the live broadcast studio — balancing the hush of competitive focus with a spectator experience built for a global streaming audience.",
    highlights: [
      "Tournament hall design & player operations",
      "Live broadcast studio & commentary booths",
      "International grandmaster hospitality",
      "Real-time digital scoring & fan engagement",
    ],
    heroImg: "/images/grid-design-3.jpg",
    gallery: ["/images/grid-film-1.jpg", "/images/grid-media-3.jpg", "/images/grid-design-4.jpg"],
  },
  {
    id: "13",
    slug: "hajj-hackathon",
    title: "Hajj Hackathon",
    client: "Ministry of Hajj and Umrah",
    category: "Team Building",
    year: "2021",
    location: "Makkah, KSA",
    tagline: "Innovation in service of millions of pilgrims.",
    overview:
      "A high-stakes innovation sprint challenging teams to solve real operational problems faced during Hajj season. We designed the competition format, ran the judging programme, and produced an environment that turned an intense 48-hour challenge into a launchpad for real solutions.",
    highlights: [
      "48-hour innovation sprint format design",
      "Mentor & judging panel programme management",
      "Live pitch stage & demo-day production",
      "Cross-sector team logistics & hosting",
    ],
    heroImg: "/images/grid-event-4.jpg",
    gallery: ["/images/grid-creative-4.jpg", "/images/grid-design-4.jpg", "/images/parallax-3.jpg"],
  },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return PROJECTS_DATA.find((p) => p.slug === slug);
}
