export interface ServiceData {
  id: string;
  slug: string;
  title: string;
  title_ar: string;
  tagline: string;
  tagline_ar: string;
  overview: string;
  overview_ar: string;
  features: string[];
  features_ar: string[];
  heroImg: string;
  gallery: string[];
}

export const SERVICES_DATA: ServiceData[] = [
  {
    id: "01",
    slug: "event-management",
    title: "Event Management",
    title_ar: "إدارة الفعاليات",
    tagline: "Precision. Creativity. Flawless execution.",
    tagline_ar: "دقة. إبداع. تنفيذ لا تشوبه شائبة.",
    overview:
      "We take full ownership of your event from the first brief to the final bow. Our end-to-end management covers every detail — logistics, timelines, vendor coordination, on-site operations — so you can stay focused on your audience while we make the magic happen behind the scenes.",
    overview_ar:
      "نتولى إدارة فعاليتك بالكامل من اللحظة الأولى حتى الخطوة الأخيرة. تشمل إدارتنا الشاملة كل التفاصيل — اللوجستيات والجداول الزمنية وتنسيق الموردين والعمليات الميدانية — لتتفرغ لجمهورك بينما نصنع السحر خلف الكواليس.",
    features: [
      "Event concept & creative direction",
      "Budget planning & financial oversight",
      "Vendor sourcing & contract negotiation",
      "Full on-site production management",
      "Risk assessment & contingency planning",
      "Post-event reporting & analytics",
    ],
    features_ar: [
      "مفهوم الفعالية والإخراج الإبداعي",
      "تخطيط الميزانية والإشراف المالي",
      "استقطاب الموردين والتفاوض على العقود",
      "إدارة الإنتاج الميداني الكامل",
      "تقييم المخاطر والتخطيط للطوارئ",
      "تقارير ما بعد الفعالية والتحليلات",
    ],
    heroImg: "/images/grid-event-1.jpg",
    gallery: ["/images/grid-event-2.jpg", "/images/grid-event-3.jpg", "/images/grid-event-4.jpg"],
  },
  {
    id: "02",
    slug: "entertainment",
    title: "Entertainment",
    title_ar: "الترفيه",
    tagline: "Acts that electrify. Moments that endure.",
    tagline_ar: "عروض تُبهر. لحظات تدوم.",
    overview:
      "From headline musical acts and stand-up comedy to immersive theatrical performances, we curate world-class entertainment that transforms any gathering into an unforgettable experience. We source, manage, and deliver talent that fits your brand and moves your audience.",
    overview_ar:
      "من الفعاليات الموسيقية الكبرى والكوميديا الارتجالية إلى العروض المسرحية الغامرة، ننسّق ترفيهاً عالمي المستوى يحوّل أي تجمّع إلى تجربة لا تُنسى. نستقطب المواهب وننسّقها ونسلّمها بما يتناسب مع علامتك التجارية ويأسر جمهورك.",
    features: [
      "Artist & performer sourcing",
      "Contract negotiation & rider management",
      "Stage & technical requirements coordination",
      "MC & host bookings",
      "Live band & DJ curation",
      "Surprise & special entertainment activations",
    ],
    features_ar: [
      "استقطاب الفنانين والمؤدين",
      "التفاوض على العقود وإدارة المتطلبات",
      "تنسيق متطلبات المسرح والتقنية",
      "حجوزات مقدّمي البرامج والمضيفين",
      "اختيار الفرق الموسيقية الحية",
      "تفعيلات الترفيه الاستثنائية والمفاجآت",
    ],
    heroImg: "/images/grid-perf-1.jpg",
    gallery: ["/images/grid-perf-2.jpg", "/images/grid-perf-3.jpg", "/images/grid-perf-4.jpg"],
  },
  {
    id: "03",
    slug: "event-personnel",
    title: "Event Personnel",
    title_ar: "كوادر الفعاليات",
    tagline: "The right people, in the right place.",
    tagline_ar: "الشخص المناسب في المكان المناسب.",
    overview:
      "Every great event runs on great people. We supply fully trained, professional event staff — from brand ambassadors and hosts to security teams and technical crew. Our personnel are briefed, uniformed, and ready to represent your brand with excellence.",
    overview_ar:
      "يقوم كل فعالية ناجحة على أكتاف كوادر متميزة. نوفر طاقماً احترافياً مؤهلاً بالكامل — من سفراء العلامة التجارية والمضيفين إلى فرق الأمن وطاقم التقنية. كوادرنا مُجهّزون ومُوحَّدون وجاهزون لتمثيل علامتك التجارية بأعلى مستويات التميز.",
    features: [
      "Brand ambassadors & hostesses",
      "Registration & welcome desk teams",
      "Security & crowd controllers",
      "Technical & AV support crew",
      "Bilingual & multilingual staff",
      "Supervisory & floor management teams",
    ],
    features_ar: [
      "سفراء العلامة التجارية والمضيفون",
      "فرق التسجيل ومكاتب الاستقبال",
      "فرق الأمن ومراقبة الحشود",
      "طاقم الدعم التقني والسمعي البصري",
      "كوادر ثنائية ومتعددة اللغات",
      "فرق الإشراف وإدارة الأرضية",
    ],
    heroImg: "/images/grid-event-2.jpg",
    gallery: ["/images/grid-event-3.jpg", "/images/grid-event-4.jpg", "/images/grid-event-5.jpg"],
  },
  {
    id: "04",
    slug: "crowd-management",
    title: "Crowd Management",
    title_ar: "إدارة الحشود",
    tagline: "Safety by design. Control with care.",
    tagline_ar: "السلامة بالتصميم. السيطرة بالاحترافية.",
    overview:
      "Managing thousands of people requires precision planning and real-time decision-making. We engineer crowd flow, entry systems, and emergency protocols that prioritize safety without compromising the guest experience — at any scale.",
    overview_ar:
      "إدارة آلاف الأشخاص تستلزم تخطيطاً دقيقاً وقرارات فورية. نهندس تدفق الحشود وأنظمة الدخول وبروتوكولات الطوارئ بما يضمن السلامة دون التأثير على تجربة الضيوف — في أي نطاق.",
    features: [
      "Crowd flow mapping & access design",
      "Entry & exit system management",
      "Emergency evacuation planning",
      "Real-time crowd monitoring",
      "Barrier & queue management",
      "Coordination with local authorities",
    ],
    features_ar: [
      "تخطيط تدفق الحشود وتصميم ممرات الوصول",
      "إدارة أنظمة الدخول والخروج",
      "تخطيط إخلاء الطوارئ",
      "مراقبة الحشود في الوقت الفعلي",
      "إدارة الحواجز والطوابير",
      "التنسيق مع الجهات الأمنية المحلية",
    ],
    heroImg: "/images/grid-event-3.jpg",
    gallery: ["/images/grid-event-1.jpg", "/images/grid-event-4.jpg", "/images/parallax-1.jpg"],
  },
  {
    id: "05",
    slug: "conferences-seminars",
    title: "Conferences & Seminars",
    title_ar: "المؤتمرات والندوات",
    tagline: "Ideas deserve the perfect stage.",
    tagline_ar: "الأفكار تستحق المنصة المثالية.",
    overview:
      "We design and deliver professional conferences and seminars that inspire, educate, and connect. From intimate executive summits to large-scale industry forums — we handle everything from speaker management to technical production and delegate experience.",
    overview_ar:
      "نصمم ونُنفّذ مؤتمرات وندوات احترافية تُلهم وتُعلّم وتربط. من القمم التنفيذية الصغيرة إلى المنتديات الصناعية الكبرى — نتولى كل شيء من إدارة المتحدثين إلى الإنتاج التقني وتجربة المشاركين.",
    features: [
      "Conference concept & agenda design",
      "Speaker sourcing & management",
      "AV & simultaneous interpretation setup",
      "Delegate registration & management",
      "Breakout session coordination",
      "Post-conference content capture",
    ],
    features_ar: [
      "تصميم مفهوم المؤتمر وجدول الأعمال",
      "استقطاب المتحدثين وإدارتهم",
      "إعداد منظومة الترجمة الفورية والسمعي البصري",
      "تسجيل المشاركين وإدارتهم",
      "تنسيق الجلسات المتخصصة",
      "توثيق محتوى المؤتمر بعد انتهائه",
    ],
    heroImg: "/images/grid-event-5.jpg",
    gallery: ["/images/grid-event-1.jpg", "/images/grid-event-2.jpg", "/images/parallax-2.jpg"],
  },
  {
    id: "06",
    slug: "team-building",
    title: "Team Building",
    title_ar: "بناء الفرق",
    tagline: "Build teams. Build culture. Build success.",
    tagline_ar: "ابنِ فرقاً. ابنِ ثقافة. ابنِ نجاحاً.",
    overview:
      "Exceptional organisations are built on exceptional teams. We design immersive team-building experiences that foster trust, sharpen collaboration, and ignite motivation — from outdoor adventures to indoor workshops and corporate games.",
    overview_ar:
      "المؤسسات الاستثنائية تُبنى على فرق استثنائية. نصمم تجارب بناء فرق غامرة تُعزز الثقة وتصقل التعاون وتُشعل الدافعية — من المغامرات الميدانية إلى ورش العمل الداخلية والألعاب المؤسسية.",
    features: [
      "Custom activity design & facilitation",
      "Indoor & outdoor challenge programmes",
      "Leadership & communication workshops",
      "Cross-departmental bonding experiences",
      "Cultural engagement programmes",
      "Measurable outcome reporting",
    ],
    features_ar: [
      "تصميم الأنشطة المخصصة وتيسيرها",
      "برامج التحديات الداخلية والخارجية",
      "ورش القيادة والتواصل الفعّال",
      "تجارب التواصل بين الأقسام",
      "برامج الانخراط الثقافي",
      "تقارير النتائج القابلة للقياس",
    ],
    heroImg: "/images/grid-event-4.jpg",
    gallery: ["/images/grid-event-2.jpg", "/images/grid-event-5.jpg", "/images/parallax-3.jpg"],
  },
  {
    id: "07",
    slug: "venue-sourcing",
    title: "Venue Sourcing",
    title_ar: "توفير الأماكن",
    tagline: "The right space changes everything.",
    tagline_ar: "المكان المناسب يُغيّر كل شيء.",
    overview:
      "Location sets the tone for every event. We leverage an exclusive network of venues — from iconic landmarks and luxury hotels to unconventional spaces and private estates — to find the perfect match for your event vision, capacity, and budget.",
    overview_ar:
      "الموقع يحدد طابع كل فعالية. نستفيد من شبكتنا الحصرية من الأماكن — من المعالم الأيقونية والفنادق الفاخرة إلى الفضاءات غير التقليدية والمجمعات الخاصة — لإيجاد المكان المثالي الذي يناسب رؤيتك وسعتك وميزانيتك.",
    features: [
      "Venue research & shortlisting",
      "Site visits & assessment",
      "Contract & rate negotiation",
      "Exclusive venue partnerships",
      "Virtual & hybrid venue options",
      "International venue sourcing",
    ],
    features_ar: [
      "بحث الأماكن وإعداد القائمة المختصرة",
      "زيارات الموقع والتقييم",
      "التفاوض على العقود والأسعار",
      "شراكات حصرية مع الأماكن",
      "خيارات الفعاليات الافتراضية والهجينة",
      "استقطاب أماكن دولية",
    ],
    heroImg: "/images/parallax-2.jpg",
    gallery: ["/images/parallax-1.jpg", "/images/parallax-3.jpg", "/images/parallax-4.jpg"],
  },
  {
    id: "08",
    slug: "event-marketing",
    title: "Event Marketing",
    title_ar: "تسويق الفعاليات",
    tagline: "Reach the right people. Make noise that matters.",
    tagline_ar: "الوصول للجمهور المناسب. ضجيج يصنع فارقاً.",
    overview:
      "A great event deserves a great audience. We build integrated marketing campaigns that create buzz before, during, and after your event — combining digital strategy, content creation, influencer partnerships, and PR to maximise reach and impact.",
    overview_ar:
      "الفعالية الرائعة تستحق جمهوراً رائعاً. نبني حملات تسويقية متكاملة تصنع الضجة قبل الفعالية وخلالها وبعدها — بدمج الاستراتيجية الرقمية وصناعة المحتوى وشراكات المؤثرين والعلاقات العامة لتعظيم النطاق والأثر.",
    features: [
      "Pre-event digital campaigns",
      "Social media strategy & management",
      "Influencer & media partnerships",
      "Email & CRM marketing",
      "Live event coverage & content",
      "Post-event reporting & ROI analysis",
    ],
    features_ar: [
      "حملات رقمية ما قبل الفعالية",
      "استراتيجية ومنصات التواصل الاجتماعي",
      "شراكات المؤثرين والإعلام",
      "التسويق عبر البريد الإلكتروني وإدارة قواعد البيانات",
      "التغطية المباشرة للفعالية وإنتاج المحتوى",
      "تقارير ما بعد الفعالية وتحليل العائد على الاستثمار",
    ],
    heroImg: "/images/parallax-3.jpg",
    gallery: ["/images/grid-media-2.jpg", "/images/grid-media-3.jpg", "/images/grid-media-4.jpg"],
  },
  {
    id: "09",
    slug: "event-production",
    title: "Event Production",
    title_ar: "إنتاج الفعاليات",
    tagline: "Technical excellence. Seamless delivery.",
    tagline_ar: "تميّز تقني. تسليم سلس.",
    overview:
      "We bring your vision to life with cutting-edge production — from stage design and lighting rigs to high-resolution AV systems and live streaming. Our technical teams work quietly behind the scenes so your event shines in the spotlight.",
    overview_ar:
      "نُحيّي رؤيتك بإنتاج متطور — من تصميم المسارح ومنصات الإضاءة إلى أنظمة السمعي البصري عالية الدقة والبث المباشر. تعمل فرقنا التقنية بصمت خلف الكواليس ليكون حفلك في دائرة الضوء دائماً.",
    features: [
      "Stage & set design & build",
      "Lighting design & operation",
      "Sound systems & audio engineering",
      "LED & projection mapping",
      "Live streaming & broadcast",
      "Technical rehearsal & on-site management",
    ],
    features_ar: [
      "تصميم المسرح والديكور وتركيبه",
      "تصميم وتشغيل الإضاءة",
      "أنظمة الصوت والهندسة الصوتية",
      "شاشات LED ومابينج الإسقاط",
      "البث المباشر والإذاعة",
      "التجهيز التقني والإدارة الميدانية",
    ],
    heroImg: "/images/grid-film-1.jpg",
    gallery: ["/images/grid-film-2.jpg", "/images/grid-film-3.jpg", "/images/parallax-1.jpg"],
  },
  {
    id: "10",
    slug: "design-studio",
    title: "Design Studio",
    title_ar: "استوديو التصميم",
    tagline: "Visual worlds that live beyond the event.",
    tagline_ar: "عوالم بصرية تتجاوز حدود الفعالية.",
    overview:
      "Our creative studio designs the visual identity of your event from the ground up — brand guidelines, environmental graphics, stage backdrops, digital assets, printed collateral, and everything in between. We make your event look as extraordinary as it feels.",
    overview_ar:
      "يصمم استوديونا الإبداعي الهوية البصرية لفعاليتك من الصفر — من المبادئ التوجيهية للعلامة التجارية والرسومات البيئية وخلفيات المسرح إلى الأصول الرقمية والمطبوعات وما هو أبعد من ذلك. نجعل فعاليتك تبدو استثنائية بقدر ما تُشعرك.",
    features: [
      "Event branding & visual identity",
      "Stage backdrop & environmental design",
      "Digital assets & motion graphics",
      "Print & signage production",
      "Venue dressing & décor concepts",
      "Post-event design assets",
    ],
    features_ar: [
      "هوية بصرية وعلامة تجارية للفعالية",
      "خلفيات المسرح والتصميم البيئي",
      "الأصول الرقمية والجرافيك المتحرك",
      "الطباعة وإنتاج اللافتات",
      "تزيين المكان وتصميم الديكور",
      "الأصول التصميمية ما بعد الفعالية",
    ],
    heroImg: "/images/grid-design-1.jpg",
    gallery: ["/images/grid-design-2.jpg", "/images/grid-design-3.jpg", "/images/grid-creative-1.jpg"],
  },
  {
    id: "11",
    slug: "event-giveaways",
    title: "Event Giveaways",
    title_ar: "هدايا الفعاليات",
    tagline: "Gifts they keep. Brands they remember.",
    tagline_ar: "هدايا يحتفظون بها. علامات لا تُنسى.",
    overview:
      "The right giveaway extends your brand long after the event ends. We design and produce custom branded merchandise — from premium gift sets and sustainable products to high-impact experiential giveaways — that leave a lasting impression.",
    overview_ar:
      "الهدية المناسبة تمدّ حضور علامتك التجارية طويلاً بعد انتهاء الفعالية. نصمم وننتج البضائع المخصصة بعلامتك التجارية — من طقم الهدايا الفاخرة والمنتجات الصديقة للبيئة إلى الهدايا ذات الأثر الاستثنائي — التي تترك انطباعاً دائماً.",
    features: [
      "Custom merchandise design",
      "Branded packaging & presentation",
      "Sustainable & eco-friendly options",
      "Bulk production & quality control",
      "On-site distribution management",
      "Premium & VIP gift curation",
    ],
    features_ar: [
      "تصميم البضائع المخصصة",
      "التغليف والعرض بالعلامة التجارية",
      "خيارات مستدامة وصديقة للبيئة",
      "الإنتاج بكميات كبيرة وضبط الجودة",
      "إدارة التوزيع الميداني",
      "تنسيق هدايا البريميوم وكبار الشخصيات",
    ],
    heroImg: "/images/grid-creative-1.jpg",
    gallery: ["/images/grid-creative-2.jpg", "/images/grid-creative-3.jpg", "/images/grid-design-4.jpg"],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES_DATA.find((s) => s.slug === slug);
}
