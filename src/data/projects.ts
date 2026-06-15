export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  title_ar: string;
  client: string;
  category: string;
  category_ar: string;
  year: string;
  location: string;
  tagline: string;
  tagline_ar: string;
  overview: string;
  overview_ar: string;
  highlights: string[];
  highlights_ar: string[];
  heroImg: string;
  gallery: string[];
}

export const PROJECTS_DATA: ProjectData[] = [
  {
    id: "01",
    slug: "government-conferences-sponsorships",
    title: "Government Conferences & Sponsorships",
    title_ar: "مؤتمرات حكومية ورعايات",
    client: "Government Sector Partners",
    category: "Conferences & Seminars",
    category_ar: "مؤتمرات وندوات",
    year: "2025",
    location: "Riyadh, KSA",
    tagline: "Where policy meets production.",
    tagline_ar: "حيث تلتقي السياسة بالإنتاج.",
    overview:
      "A standing programme of high-level government conferences and sponsorship activations. We manage everything from delegate protocol and stage production to partner branding and on-ground logistics — delivering the precision and discretion that public-sector engagements demand.",
    overview_ar:
      "برنامج دائم من المؤتمرات الحكومية رفيعة المستوى وتفعيلات الرعاية. ندير كل شيء من بروتوكولات الوفود وإنتاج المسرح إلى هوية الشركاء التجارية واللوجستيات الميدانية — بالدقة والسرية اللازمتين للمشاركات الحكومية.",
    highlights: [
      "Multi-ministry delegate coordination",
      "Sponsor branding & partner activation zones",
      "Full protocol & VIP logistics management",
      "End-to-end production & stage design",
    ],
    highlights_ar: [
      "تنسيق وفود متعددة الوزارات",
      "هوية الجهات الراعية ومناطق تفعيل الشراكات",
      "إدارة كاملة للبروتوكول ولوجستيات كبار الشخصيات",
      "إنتاج شامل وتصميم المسرح",
    ],
    heroImg: "/images/grid-event-1.jpg",
    gallery: ["/images/grid-event-2.jpg", "/images/grid-film-1.jpg", "/images/parallax-1.jpg"],
  },
  {
    id: "02",
    slug: "sata-liwan",
    title: "SATA Liwan",
    title_ar: "ليوان",
    client: "Saudi Authority for Transport Affairs",
    category: "Conferences & Seminars",
    category_ar: "مؤتمرات وندوات",
    year: "2025",
    location: "Riyadh, KSA",
    tagline: "A gathering place for the future of transport.",
    tagline_ar: "ملتقى مستقبل النقل.",
    overview:
      "Liwan brought together regulators, operators, and innovators shaping the Kingdom's transport landscape. We designed and produced the full event experience — from the exhibition floor to the keynote stage — creating a space where industry conversations could genuinely move forward.",
    overview_ar:
      "جمع ليوان المنظمين والمشغلين والمبتكرين الذين يشكّلون مشهد النقل في المملكة. صمّمنا وأنتجنا التجربة الكاملة للفعالية — من أرضية المعرض إلى مسرح الكلمات الرئيسية — مبنياً على منصة تُمكّن الحوار من التقدم.",
    highlights: [
      "Dedicated exhibition & networking zones",
      "Keynote & panel stage production",
      "Delegate registration & badge systems",
      "Live session recording & highlight reels",
    ],
    highlights_ar: [
      "مناطق العرض والتواصل المخصصة",
      "إنتاج مسرح الجلسات الرئيسية والحوارية",
      "أنظمة تسجيل المشاركين والشارات",
      "تسجيل الجلسات المباشرة ومقاطع الإبراز",
    ],
    heroImg: "/images/grid-event-5.jpg",
    gallery: ["/images/grid-design-3.jpg", "/images/grid-media-3.jpg", "/images/parallax-2.jpg"],
  },
  {
    id: "03",
    slug: "anime-key",
    title: "Anime Key",
    title_ar: "أنيمي كي",
    client: "Anime Key Entertainment",
    category: "Entertainment",
    category_ar: "ترفيه",
    year: "2024",
    location: "Jeddah, KSA",
    tagline: "A universe of fandom, brought to life.",
    tagline_ar: "عالم من مجتمع المعجبين، أُحيي على أرض الواقع.",
    overview:
      "An immersive pop-culture festival celebrating anime, gaming, and cosplay culture for a new generation of fans. We built the experience from the ground up — themed zones, stage performances, guest appearances, and a programme that kept the energy electric from open to close.",
    overview_ar:
      "مهرجان ثقافي شعبي غامر يحتفي بالأنيمي والألعاب والكوسبلاي لجيل جديد من المعجبين. بنينا التجربة من الصفر — مناطق تيمات وعروض مسرحية وظهورات ضيوف مميزة وبرنامج أبقى الطاقة متقدة من الافتتاح حتى الإغلاق.",
    highlights: [
      "Themed activation zones & cosplay stages",
      "Guest artist & voice-actor appearances",
      "Gaming arenas & interactive installations",
      "Full crowd flow & ticketing operations",
    ],
    highlights_ar: [
      "مناطق التفعيل الموضوعية ومسارح الكوسبلاي",
      "ضيوف الفنانين وممثلو الأصوات",
      "ساحات الألعاب والتركيبات التفاعلية",
      "عمليات تدفق الحشود والتذاكر",
    ],
    heroImg: "/images/grid-perf-1.jpg",
    gallery: ["/images/grid-perf-2.jpg", "/images/grid-creative-1.jpg", "/images/grid-media-1.jpg"],
  },
  {
    id: "04",
    slug: "riyadh-2024",
    title: "Riyadh 2024",
    title_ar: "الرياض 2024",
    client: "Riyadh Municipality",
    category: "Event Management",
    category_ar: "إدارة الفعاليات",
    year: "2024",
    location: "Riyadh, KSA",
    tagline: "A city-wide celebration, engineered end to end.",
    tagline_ar: "احتفال مدينة كاملة، مهندَس من الألف إلى الياء.",
    overview:
      "A flagship city programme marking a milestone year for the capital — spanning concerts, public installations, and civic celebrations across multiple districts. We owned the full production calendar, coordinating dozens of moving parts into one cohesive citywide moment.",
    overview_ar:
      "برنامج مدينة ترسيخي يحتفل بعام استثنائي للعاصمة — يشمل حفلات موسيقية ومنشآت عامة واحتفالات مدنية في مناطق متعددة. أدرنا تقويم الإنتاج الكامل، منسّقين عشرات المحاور المتحركة في لحظة مدينية متكاملة.",
    highlights: [
      "Multi-venue programme spanning 8 districts",
      "Public safety & crowd flow engineering",
      "Civic partnership & permit management",
      "Citywide content capture & media rollout",
    ],
    highlights_ar: [
      "برنامج متعدد الأماكن في 8 أحياء",
      "هندسة السلامة العامة وتدفق الحشود",
      "إدارة الشراكة المدنية والتصاريح",
      "توثيق المحتوى على مستوى المدينة والإطلاق الإعلامي",
    ],
    heroImg: "/images/grid-event-3.jpg",
    gallery: ["/images/grid-event-4.jpg", "/images/grid-film-2.jpg", "/images/parallax-1.jpg"],
  },
  {
    id: "05",
    slug: "mada",
    title: "MADA",
    title_ar: "مدى",
    client: "Saudi Payments (MADA)",
    category: "Event Marketing",
    category_ar: "تسويق الفعاليات",
    year: "2024",
    location: "Riyadh, KSA",
    tagline: "Putting a national brand on the map — live.",
    tagline_ar: "وضع علامة وطنية على الخريطة — على أرض الواقع.",
    overview:
      "A nationwide brand activation campaign for one of the Kingdom's most recognised payment networks. We crafted the on-ground experience and integrated digital storytelling that brought the brand closer to everyday moments across malls, campuses, and community events.",
    overview_ar:
      "حملة تفعيل علامة تجارية وطنية لأحد أكثر شبكات الدفع شهرة في المملكة. صغنا التجربة الميدانية والسرد الرقمي المتكامل الذي قرّب العلامة التجارية من اللحظات اليومية عبر المجمعات والحرم الجامعية والتجمعات المجتمعية.",
    highlights: [
      "Roadshow activation across 10 cities",
      "Interactive brand experience booths",
      "Influencer & community partnership network",
      "Real-time campaign performance reporting",
    ],
    highlights_ar: [
      "جولة تفعيل في 10 مدن",
      "أكشاك تجربة العلامة التجارية التفاعلية",
      "شبكة شراكات المؤثرين والمجتمع",
      "تقارير أداء الحملة في الوقت الفعلي",
    ],
    heroImg: "/images/grid-media-1.jpg",
    gallery: ["/images/grid-media-2.jpg", "/images/grid-design-1.jpg", "/images/grid-creative-2.jpg"],
  },
  {
    id: "06",
    slug: "italian-super-cup",
    title: "Italian Super Cup",
    title_ar: "كأس السوبر الإيطالي",
    client: "Saudi Sports Company (SSC)",
    category: "Crowd Management",
    category_ar: "إدارة الحشود",
    year: "2024",
    location: "Riyadh, KSA",
    tagline: "World-class football. Flawless match-day execution.",
    tagline_ar: "كرة قدم عالمية. تنفيذ يوم المباراة لا يشوبه خطأ.",
    overview:
      "Hosting an international football showpiece meant zero margin for error. We engineered match-day operations end to end — entry systems, fan zones, hospitality logistics, and real-time crowd monitoring — delivering a stadium experience that matched the prestige of the fixture.",
    overview_ar:
      "استضافة مباراة كروية دولية استعراضية لم تُبِح هامشاً للخطأ. هندسنا عمليات يوم المباراة من الألف إلى الياء — أنظمة الدخول ومناطق المشجعين ولوجستيات الضيافة ومراقبة الحشود الفورية — لتقديم تجربة ملعب ترقى لمكانة المباراة.",
    highlights: [
      "60,000-capacity match-day operations",
      "VIP & hospitality lounge management",
      "Real-time crowd monitoring command centre",
      "Joint coordination with international federations",
    ],
    highlights_ar: [
      "عمليات يوم المباراة بطاقة 60,000",
      "إدارة كبار الشخصيات وصالة الضيافة",
      "مركز قيادة مراقبة الحشود الفورية",
      "التنسيق المشترك مع الاتحادات الدولية",
    ],
    heroImg: "/images/grid-event-3.jpg",
    gallery: ["/images/grid-perf-3.jpg", "/images/parallax-2.jpg", "/images/grid-film-4.jpg"],
  },
  {
    id: "07",
    slug: "camel-club",
    title: "Camel Club",
    title_ar: "نادي الهجن",
    client: "Saudi Camel Club",
    category: "Event Management",
    category_ar: "إدارة الفعاليات",
    year: "2023",
    location: "Riyadh, KSA",
    tagline: "Heritage, staged with modern precision.",
    tagline_ar: "إرث يُقدَّم بدقة عصرية.",
    overview:
      "A celebration of one of the Kingdom's most treasured traditions, reimagined for a modern audience. We managed the full event production — from arena logistics and broadcast coordination to hospitality villages — honouring heritage while delivering a world-class spectator experience.",
    overview_ar:
      "احتفاء بأحد أعز تقاليد المملكة، مُعاد ابتكاره لجمهور معاصر. أدرنا الإنتاج الكامل — من لوجستيات الساحة وتنسيق البث إلى قرى الضيافة — موقّرين الإرث مع تقديم تجربة متفرج عالمية المستوى.",
    highlights: [
      "Arena production & broadcast coordination",
      "VIP hospitality village design & operations",
      "Heritage programming & cultural curation",
      "On-site logistics for 50,000+ visitors",
    ],
    highlights_ar: [
      "إنتاج الساحة وتنسيق البث",
      "تصميم وتشغيل قرية ضيافة كبار الشخصيات",
      "البرامج التراثية والتنسيق الثقافي",
      "لوجستيات ميدانية لأكثر من 50,000 زائر",
    ],
    heroImg: "/images/parallax-2.jpg",
    gallery: ["/images/grid-event-2.jpg", "/images/grid-design-2.jpg", "/images/parallax-4.jpg"],
  },
  {
    id: "08",
    slug: "rice-bull-riding-co",
    title: "Rice Bull Riding Co",
    title_ar: "رايس لركوب الثيران",
    client: "Rice Bull Riding Co",
    category: "Entertainment",
    category_ar: "ترفيه",
    year: "2023",
    location: "Al-Kharj, KSA",
    tagline: "An adrenaline spectacle, built from the ground up.",
    tagline_ar: "استعراض أدرينالين، بُني من الصفر.",
    overview:
      "A first-of-its-kind extreme sports entertainment series brought to the region. We built the arena infrastructure, curated the rider line-up, and produced a high-energy show experience — complete with live commentary, pyrotechnics, and a soundtrack that kept the crowd on its feet.",
    overview_ar:
      "سلسلة ترفيهية رياضية متطرفة الأولى من نوعها في المنطقة. بنينا البنية التحتية للساحة، وانتقينا ركاباً من الدرجة الأولى، وأنتجنا عرضاً حياً عالي الطاقة — مكتملاً بتعليق حي ومؤثرات نارية وموسيقى أبقت الجمهور على أصابع قدميه.",
    highlights: [
      "Custom arena & rider safety infrastructure",
      "International rider sourcing & logistics",
      "Live show production with pyrotechnics & FX",
      "Broadcast-ready multi-camera coverage",
    ],
    highlights_ar: [
      "ساحة مخصصة وبنية تحتية لسلامة الركاب",
      "استقطاب ركاب دوليين ولوجستياتهم",
      "إنتاج عرض حي بمؤثرات نارية وتقنية خاصة",
      "تغطية متعددة الكاميرات جاهزة للبث",
    ],
    heroImg: "/images/grid-perf-4.jpg",
    gallery: ["/images/grid-perf-5.jpg", "/images/grid-film-3.jpg", "/images/parallax-3.jpg"],
  },
  {
    id: "09",
    slug: "world-nomad-games",
    title: "World Nomad Games",
    title_ar: "ألعاب الرحّالة العالمية",
    client: "Ministry of Sport",
    category: "Conferences & Seminars",
    category_ar: "مؤتمرات وندوات",
    year: "2023",
    location: "Riyadh, KSA",
    tagline: "Cultures from across the globe, on one field.",
    tagline_ar: "ثقافات من شتى أنحاء العالم على ملعب واحد.",
    overview:
      "An international showcase of traditional sport and nomadic culture, hosting delegations from dozens of nations. We delivered the full operational backbone — delegation logistics, ceremony production, and a cultural programme that turned competition into cross-cultural celebration.",
    overview_ar:
      "استعراض دولي للرياضات التقليدية والثقافة البدوية، يستضيف وفوداً من عشرات الأمم. قدمنا العمود الفقري التشغيلي الكامل — لوجستيات الوفود وإنتاج الحفلات وبرنامج ثقافي حوّل التنافس إلى احتفاء بالتبادل الحضاري.",
    highlights: [
      "Delegations from 40+ nations hosted",
      "Opening & closing ceremony production",
      "Multilingual delegate services & logistics",
      "Cultural exhibition & heritage pavilions",
    ],
    highlights_ar: [
      "استضافة وفوداً من أكثر من 40 أمة",
      "إنتاج حفلَي الافتتاح والختام",
      "خدمات الوفود ولوجستياتهم متعددة اللغات",
      "المعرض الثقافي وأجنحة التراث",
    ],
    heroImg: "/images/grid-event-5.jpg",
    gallery: ["/images/grid-creative-5.jpg", "/images/grid-design-5.jpg", "/images/grid-perf-2.jpg"],
  },
  {
    id: "10",
    slug: "suse-experts-days",
    title: "SUSE Experts Days",
    title_ar: "أيام خبراء SUSE",
    client: "SUSE",
    category: "Conferences & Seminars",
    category_ar: "مؤتمرات وندوات",
    year: "2022",
    location: "Riyadh, KSA",
    tagline: "Deep tech conversations, delivered seamlessly.",
    tagline_ar: "محادثات تقنية عميقة، تُقدَّم بسلاسة.",
    overview:
      "A regional gathering of enterprise IT leaders and open-source experts. We handled the full delegate journey — from technical breakout rooms and live demo stages to networking experiences — giving a highly specialised audience an event experience as polished as their craft.",
    overview_ar:
      "تجمّع إقليمي لقادة تقنية المعلومات المؤسسية وخبراء المصادر المفتوحة. تولّينا الرحلة الكاملة للمشارك — من غرف العروض التقنية المتخصصة ومسارح العروض الحية إلى تجارب التواصل — مانحين جمهوراً متخصصاً تجربة فعالية مصقولة كبراعتهم.",
    highlights: [
      "Technical breakout & live-demo stage builds",
      "Enterprise delegate hosting & concierge",
      "Hybrid streaming for global attendees",
      "Partner showcase & networking lounge design",
    ],
    highlights_ar: [
      "بناء مسارح التجارب التقنية والعروض الحية",
      "استضافة وفود المؤسسات وخدمة الكونسيرج",
      "البث الهجين لحضور عالمي",
      "تصميم صالة الشراكة والتواصل",
    ],
    heroImg: "/images/grid-film-3.jpg",
    gallery: ["/images/grid-design-1.jpg", "/images/grid-event-1.jpg", "/images/parallax-4.jpg"],
  },
  {
    id: "11",
    slug: "sap",
    title: "SAP",
    title_ar: "SAP",
    client: "SAP Middle East",
    category: "Event Marketing",
    category_ar: "تسويق الفعاليات",
    year: "2022",
    location: "Riyadh, KSA",
    tagline: "Enterprise software, made unforgettable.",
    tagline_ar: "برمجيات مؤسسية لا تُنسى.",
    overview:
      "A regional roadshow and launch campaign introducing SAP's latest enterprise solutions to the Saudi market. We blended sharp brand storytelling with a live activation experience — product demos, executive briefings, and a campaign that translated complex technology into a compelling story.",
    overview_ar:
      "جولة إقليمية وحملة إطلاق لتقديم أحدث حلول SAP المؤسسية للسوق السعودية. مزجنا السرد القوي للعلامة التجارية مع تجربة تفعيل حية — عروض المنتجات والإحاطات التنفيذية وحملة ترجمت التقنية المعقدة إلى قصة مقنعة.",
    highlights: [
      "Executive briefing centre design & operations",
      "Live product demo zones & theatre sessions",
      "Integrated digital & on-ground campaign",
      "C-suite hospitality & networking programme",
    ],
    highlights_ar: [
      "تصميم وتشغيل مركز الإحاطات التنفيذية",
      "مناطق العروض الحية وجلسات المسرح",
      "حملة رقمية وميدانية متكاملة",
      "برنامج ضيافة وتواصل لكبار المسؤولين التنفيذيين",
    ],
    heroImg: "/images/grid-creative-1.jpg",
    gallery: ["/images/grid-media-4.jpg", "/images/grid-design-2.jpg", "/images/grid-creative-2.jpg"],
  },
  {
    id: "12",
    slug: "chess-champions",
    title: "Chess Champions",
    title_ar: "أبطال الشطرنج",
    client: "Saudi Chess Federation",
    category: "Conferences & Seminars",
    category_ar: "مؤتمرات وندوات",
    year: "2021",
    location: "Riyadh, KSA",
    tagline: "Where the world's sharpest minds met the board.",
    tagline_ar: "حيث التقت أحدّ العقول بالرقعة.",
    overview:
      "An elite chess championship bringing together grandmasters from across the globe. We produced the tournament environment from the playing hall to the live broadcast studio — balancing the hush of competitive focus with a spectator experience built for a global streaming audience.",
    overview_ar:
      "بطولة شطرنج نخبوية تجمع الأساتذة الكبار من أرجاء العالم. أنتجنا بيئة البطولة كاملة من قاعة اللعب إلى استوديو البث المباشر — موازنين صمت التركيز التنافسي مع تجربة متفرج مبنية لجمهور بث عالمي.",
    highlights: [
      "Tournament hall design & player operations",
      "Live broadcast studio & commentary booths",
      "International grandmaster hospitality",
      "Real-time digital scoring & fan engagement",
    ],
    highlights_ar: [
      "تصميم قاعة البطولة وتشغيل لعب اللاعبين",
      "استوديو البث المباشر وكبائن التعليق",
      "ضيافة الأساتذة الكبار الدوليين",
      "النقاط الرقمية الفورية وتفاعل المشجعين",
    ],
    heroImg: "/images/grid-design-3.jpg",
    gallery: ["/images/grid-film-1.jpg", "/images/grid-media-3.jpg", "/images/grid-design-4.jpg"],
  },
  {
    id: "13",
    slug: "hajj-hackathon",
    title: "Hajj Hackathon",
    title_ar: "هاكاثون الحج",
    client: "Ministry of Hajj and Umrah",
    category: "Team Building",
    category_ar: "بناء الفرق",
    year: "2021",
    location: "Makkah, KSA",
    tagline: "Innovation in service of millions of pilgrims.",
    tagline_ar: "الابتكار في خدمة ملايين الحجاج.",
    overview:
      "A high-stakes innovation sprint challenging teams to solve real operational problems faced during Hajj season. We designed the competition format, ran the judging programme, and produced an environment that turned an intense 48-hour challenge into a launchpad for real solutions.",
    overview_ar:
      "سباق ابتكاري ماراثوني يتحدى الفرق لحل مشكلات تشغيلية حقيقية خلال موسم الحج. صمّمنا تنسيق المنافسة وأدرنا برنامج التحكيم وأنتجنا بيئة تحوّلت فيها مهمة 48 ساعة مكثفة إلى منصة إطلاق لحلول حقيقية.",
    highlights: [
      "48-hour innovation sprint format design",
      "Mentor & judging panel programme management",
      "Live pitch stage & demo-day production",
      "Cross-sector team logistics & hosting",
    ],
    highlights_ar: [
      "تصميم تنسيق ماراثون الابتكار 48 ساعة",
      "إدارة برنامج المرشدين وهيئة التحكيم",
      "مسرح العروض الحية ونتائج يوم العرض",
      "لوجستيات واستضافة الفرق متعددة القطاعات",
    ],
    heroImg: "/images/grid-event-4.jpg",
    gallery: ["/images/grid-creative-4.jpg", "/images/grid-design-4.jpg", "/images/parallax-3.jpg"],
  },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return PROJECTS_DATA.find((p) => p.slug === slug);
}
