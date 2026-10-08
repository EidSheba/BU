export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  title_ar: string;
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
    title: "Government conferences and sponsorships Riyadh 2024",
    title_ar: "مؤتمر الجهات الحكومية والرعاة المشاركين لموسم الرياض 2024",
        tagline: "Where policy meets production.",
    tagline_ar: "حيث تلتقي السياسة بالإنتاج.",
    overview:
      "The main stage is designed to host keynote speeches, performances, and major events, ensuring clear visibility for the audience and an elevated setting that enhances engagement.",
    overview_ar:
      "يتم تصميم المسرح الرئيسي لاستضافة الخطابات الرئيسية والعروض والأحداث المهمة، مما يضمن رؤية واضحة للجمهور ويوفر بيئة تزيد من التفاعل.",
    highlights: [
      "Main stage design for presentations and keynote speeches",
      "Main and side screens in various halls",
      "Integrated audio and lighting system",
      "Crowd management and organization",
    ],
    highlights_ar: [
      "تصميم المسرح الرئيسي لتقديم العروض والخطابات الرئيسية",
      "شاشات عرض رئيسية وجانبية في مختلف القاعات",
      "نظام صوتيات وضوئيات متكامل",
      "إدارة الحشود والتنظيم",
    ],
    heroImg: "/images/projects/government-conferences-sponsorships.jpg",
    gallery: [],
  },
  {
    id: "02",
    slug: "sata-liwan",
    title: "SATA Liwan",
    title_ar: "ليوان",
        tagline: "A gathering place for the future of transport.",
    tagline_ar: "ملتقى مستقبل النقل.",
    overview:
      "An external event called \"Translation Lounge\" was organized specifically for the Translation Association. During the event, guests were received at the airport and transportation to and from the venue was provided. The venue was equipped with a theater featuring high-quality lighting and sound systems. Hospitality corners and a dinner buffet were arranged, accompanied by live oud music. Finally, giveaways were distributed to the attendees.",
    overview_ar:
      "تم تنظيم فعالية خارجية بمسمى ليوان الترجمة والخاصة بجمعية الترجمة، تم خلالها استقبال الضيوف من المطار وتوفير المواصلات من وإلى الفعالية، وتم تجهيز الموقع بمسرح مجهز بالإضاءات والأنظمة الصوتية عالية الجودة، وتوفير ركن الضيافة وبوفيه العشاء على أنغام العزف الحي بالعود. ختاماً تم توزيع الهدايا على الحضور.",
    highlights: [
      "Welcoming guests with coffee, chocolates and premium dates",
      "Providing event coverage through photography",
      "Arranging for an oud player",
      "Providing giveaways for all attendees",
    ],
    highlights_ar: [
      "ترحيب بالضيوف بالقهوة والشكولاتة والتمور الفاخرة",
      "توفير تغطية للفعالية من خلال التصوير",
      "توفير عازف عود",
      "توفير هدايا لكافة الحضور",
    ],
    heroImg: "/images/projects/sata-liwan.jpg",
    gallery: ["/images/projects/sata-liwan-1.jpg", "/images/projects/sata-liwan-2.jpg"],
  },
  {
    id: "03",
    slug: "anime-key",
    title: "Anime Key",
    title_ar: "أنمي كي",
        tagline: "A universe of fandom, brought to life.",
    tagline_ar: "عالم من مجتمع المعجبين، أُحيي على أرض الواقع.",
    overview:
      "Our team worked hard with the Anime Key team from conception to make this special event a success. We have developed a meticulous and streamlined schedule for each stage, from designing and implementing the project to organizing and successfully running the event.",
    overview_ar:
      "عمل فريقنا بجدية مع فريق أنمي كي منذ البداية للوصول إلى نجاح هذه الفعالية المميزة. وضعنا خططاً دقيقة وجدولاً زمنياً محكماً لكل مرحلة من مراحل المشروع، من تصميم وتنفيذ المشروع حتى تنظيم الفعالية وتشغيلها بنجاح.",
    highlights: [
      "Designing and implementation of the museum, the VIP hall, the theater, and the entrance",
      "Execution of print, media, and woodwork manufacturing services",
      "Operating and maintaining security, safety, and cleanliness",
      "Managing entry and exit services for visitors",
      "Valet parking to facilitate access to the event",
    ],
    highlights_ar: [
      "تصميم وتنفيذ المتحف وصالة كبار الشخصيات والمسرح والمدخل",
      "تنفيذ المطبوعات وخدمات تصنيع الأخشاب والأعلام",
      "تشغيل الفعالية والمحافظة على الأمن والسلامة والنظافة",
      "إدارة خدمات الدخول والخروج للزوار",
      "خدمة صف السيارات لتسهيل الوصول إلى الفعالية",
    ],
    heroImg: "/images/projects/anime-key.jpg",
    gallery: ["/images/projects/anime-key-1.jpg", "/images/projects/anime-key-2.jpg"],
  },
  {
    id: "04",
    slug: "riyadh-season",
    title: "Riyadh Season",
    title_ar: "موسم الرياض",
        tagline: "Four thousand guests, one seamless journey.",
    tagline_ar: "أكثر من أربعة آلاف ضيف، رحلة واحدة سلسة.",
    overview:
      "Our company offered business and logistic support to the entirety of the Riyadh season guests which were over four thousand participants from all over the globe. To achieve memorable and seamless experiences for the kingdom’s guests, we had the following four departments working throughout the duration of the season.",
    overview_ar:
      "قدمت شركتنا الدعم التجاري واللوجستي لجميع ضيوف موسم الرياض الذين بلغ عددهم أكثر من أربعة آلاف مشارك من جميع أنحاء العالم. لتحقيق تجارب سلسة لا تُنسى لضيوف المملكة، عملت الأقسام الأربعة التالية على مدار الساعة طوال فترة الموسم.",
    highlights: [
      "A visa issuance department",
      "A coordination department",
      "An airport reception & assistance department",
      "A transportation department",
    ],
    highlights_ar: [
      "إدارة إصدار التأشيرات",
      "قسم التنسيق والحجوزات",
      "إدارة الاستقبال والمساعدة بالمطار",
      "قسم النقل والمواصلات",
    ],
    heroImg: "/images/projects/riyadh-season.jpg",
    gallery: ["/images/grid-event-4.jpg", "/images/grid-film-2.jpg", "/images/parallax-1.jpg"],
  },
  {
    id: "05",
    slug: "mada",
    title: "MADA",
    title_ar: "مدى",
        tagline: "Putting a national brand on the map — live.",
    tagline_ar: "وضع علامة وطنية على الخريطة — على أرض الواقع.",
    overview:
      "This project saw us work closely with our clients to bring to life their vision for the booths that were set up in multiple locations throughout the duration of the Riyadh season. We were also in charge of furnishing the booths with requested items such as branding, furniture, screens and lighting. Along with production, we also provided the following:",
    overview_ar:
      "جعلنا هذا المشروع نعمل عن كثب مع عملائنا لتحقيق رؤيتهم وأهدافهم للأكشاك التي أنشأناها في مواقع متعددة طوال فترة موسم الرياض. كما كنا مسؤولين عن تأثيث الأكشاك بالعناصر المطلوبة مثل العلامات التجارية والأثاث والشاشات والإضاءة. وإلى جانب الإنتاج، قدمنا أيضاً ما يلي:",
    highlights: [
      "Employees to work in the booths",
      "Promotional gift items",
      "Interactive games",
    ],
    highlights_ar: [
      "موظفين للعمل في الأكشاك",
      "هدايا ترويجية",
      "ألعاب تفاعلية للزوار",
    ],
    heroImg: "/images/projects/mada.jpg",
    gallery: ["/images/grid-media-2.jpg", "/images/grid-design-1.jpg", "/images/grid-creative-2.jpg"],
  },
  {
    id: "06",
    slug: "italian-super-cup",
    title: "Italian Super Cup",
    title_ar: "كأس السوبر الإيطالي",
        tagline: "Every delegation, welcomed from touchdown to final whistle.",
    tagline_ar: "كل وفد مُستقبَل من لحظة الوصول حتى صافرة النهاية.",
    overview:
      "Our company offered comprehensive logistics services to AC Milan, Juventus and The Italian Football Federation. Where we handled their airport welcoming, transport and accommodation throughout their stay. We also served as the welcoming party to all international fans who traveled to attend the final match.",
    overview_ar:
      "قدمت شركتنا الخدمات اللوجستية الشاملة لجميع الوفود الخاصة بكل من نادي أي سي ميلان ونادي يوفنتوس والاتحاد الإيطالي لكرة القدم، حيث قدمنا خدمات الترحيب والمساعدة في المطار وخدمات النقل والمواصلات اليومية وخدمات السكن طوال فترة إقامتهم. كما قمنا بدور الطرف الترحيبي لجميع المشجعين الدوليين الذين قدموا لحضور المباراة النهائية.",
    highlights: [
      "Organizers",
      "Airport Welcome",
      "Transportation",
      "Hotel Management",
    ],
    highlights_ar: [
      "المنظمون",
      "الترحيب والمساعدة في المطار",
      "وسائل النقل والمواصلات",
      "إدارة الفنادق",
    ],
    heroImg: "/images/projects/italian-super-cup.jpg",
    gallery: ["/images/grid-perf-3.jpg", "/images/parallax-2.jpg", "/images/grid-film-4.jpg"],
  },
  {
    id: "07",
    slug: "camel-club",
    title: "Camel Club",
    title_ar: "نادي الإبل",
        tagline: "Heritage, staged with modern precision.",
    tagline_ar: "إرث يُقدَّم بدقة عصرية.",
    overview:
      "One of the events that took place under the umbrella of King Abdulaziz Camel Club Festival was the Camel Club. We provided a team to welcome the guests at the airport as well as arrange their transportation to their respective destinations.",
    overview_ar:
      "من الفعاليات التي أقيمت تحت مظلة مهرجان الملك عبد العزيز للإبل. قام فريقنا بالترحيب ومساعدة الضيوف في المطار وكذلك ترتيب تنقلاتهم إلى وجهاتهم الخاصة.",
    highlights: [
      "Airport Booth Setup",
      "Welcome Team",
      "Transportation",
    ],
    highlights_ar: [
      "إعداد كشك في المطار",
      "فريق الترحيب والمساعدة",
      "وسائل النقل",
    ],
    heroImg: "/images/projects/camel-club.jpg",
    gallery: ["/images/projects/camel-club-1.jpg", "/images/projects/camel-club-2.jpg"],
  },
  {
    id: "08",
    slug: "rice-bull-riding-co",
    title: "Rice Bull Riding Co",
    title_ar: "رايس لركوب الثيران",
        tagline: "The first welcome sets the tone.",
    tagline_ar: "الترحيب الأول يصنع الانطباع.",
    overview:
      "A part of King Abdulaziz Camel Festival, The Rice Bull riding event saw us welcoming its contestants upon arrival by positioning a team of young capable Saudi ushers at the arrival terminals to ensure a smooth and pleasant experience.",
    overview_ar:
      "كجزء من مهرجان الملك عبد العزيز للإبل، شهدنا في حدث ركوب الثيران رايس بول الترحيب بالمتنافسين عند وصولهم من خلال وضع فريق من الشباب السعوديين المتمكنين في صالات الوصول لضمان تجربة سلسة وممتعة.",
    highlights: [
      "Welcoming Team",
      "Transportation",
    ],
    highlights_ar: [
      "فريق الترحيب",
      "وسائل النقل والمواصلات",
    ],
    heroImg: "/images/projects/rice-bull-riding-co.jpg",
    gallery: ["/images/projects/rice-bull-riding-co-1.jpg", "/images/projects/rice-bull-riding-co-2.jpg"],
  },
  {
    id: "09",
    slug: "world-nomad-games",
    title: "World Nomad Games",
    title_ar: "ألعاب الرحّالة العالمية",
        tagline: "Cultures from across the globe, on one field.",
    tagline_ar: "ثقافات من شتى أنحاء العالم على ملعب واحد.",
    overview:
      "The largest event in the King Abdulaziz Festival, World Nomad Games saw an array of participants from 75 countries congregate to compete in ethnic sports. Our involvement in the project which ran for almost 25 days, can be categorized into the following:",
    overview_ar:
      "أكبر حدث في مهرجان الملك عبد العزيز للإبل، شهدت ألعاب الرحّالة العالمية مشاركين من 75 دولة تجمعوا للتنافس في الرياضات العرقية. وتمتد مشاركتنا في المشروع، الذي استمر قرابة 25 يوماً، عبر ما يلي:",
    highlights: [
      "Welcoming Team",
      "Transportation Team",
      "Hotel Management Team",
      "Logistic coordination Team",
    ],
    highlights_ar: [
      "فريق الترحيب في المطار",
      "وسائل النقل والمواصلات",
      "فريق إدارة الفندق",
      "فريق التنسيق اللوجستي",
    ],
    heroImg: "/images/projects/world-nomad-games.jpg",
    gallery: ["/images/projects/world-nomad-games-1.jpg", "/images/projects/world-nomad-games-2.jpg"],
  },
  {
    id: "10",
    slug: "suse-experts-days",
    title: "SUSE Experts Days",
    title_ar: "أيام خبراء SUSE",
        tagline: "Deep tech conversations, delivered seamlessly.",
    tagline_ar: "محادثات تقنية عميقة، تُقدَّم بسلاسة.",
    overview:
      "We were in charge of the SUSE Expert Days event from start to finish, from securing the venue to the last gift item being handed out. For a seamless experience, we insured that every aspect was up to standard and of the utmost quality. The following is a breakdown of the services we provided.",
    overview_ar:
      "كان الحدث على عاتقنا من البداية، من تأمين وتجهيز المكان إلى آخر هدية تم تسليمها، وذلك للحصول على تجربة ثرية وسلسة وبأعلى جودة ممكنة، كما هو موضح بالخدمات التالية.",
    highlights: [
      "Venue Securement",
      "Design Adaptations",
      "Branding",
      "Registration",
      "Gift Items",
      "Post-Event reporting",
    ],
    highlights_ar: [
      "تأمين المكان",
      "التراخيص اللازمة",
      "العمل على التصاميم",
      "التسجيل",
      "الترحيب",
      "الهدايا الدعائية",
      "تقارير ما بعد المؤتمر",
    ],
    heroImg: "/images/projects/suse-experts-days.jpg",
    gallery: ["/images/projects/suse-experts-days-1.jpg", "/images/projects/suse-experts-days-2.jpg"],
  },
  {
    id: "11",
    slug: "sap",
    title: "SAP",
    title_ar: "SAP",
        tagline: "Enterprise software, made unforgettable.",
    tagline_ar: "برمجيات مؤسسية لا تُنسى.",
    overview:
      "The SAP Roadshow took place in more than one location, the first being in Riyadh. We provided comprehensive seminar management from beginning to end. The services we provided are as follows:",
    overview_ar:
      "تم تنظيم الندوة في أكثر من مدينة، وقمنا بإدارتها بشكل شامل من البداية إلى النهاية. وكانت الخدمات التي قدمناها على النحو التالي:",
    highlights: [
      "Venue Securement",
      "Branding",
      "Design Adaptations",
      "Registration",
      "Welcoming",
      "Gift Items",
      "Post-event Reporting",
    ],
    highlights_ar: [
      "تأمين المكان",
      "تعديلات التصاميم للطباعة",
      "التراخيص اللازمة",
      "التصاميم الدعائية",
      "التسجيل",
      "الترحيب",
      "الهدايا الدعائية",
      "تقارير ما بعد الندوة",
    ],
    heroImg: "/images/projects/sap.jpg",
    gallery: ["/images/projects/sap-1.jpg", "/images/projects/sap-2.jpg"],
  },
  {
    id: "12",
    slug: "chess-championship",
    title: "Chess Championship",
    title_ar: "بطولة الشطرنج",
        tagline: "Where the world's sharpest minds met the board.",
    tagline_ar: "حيث التقت أحدّ العقول بالرقعة.",
    overview:
      "The Chess Championship saw our production team work on the setup and ambiance of the space. Along with the use of organizers to ensure a seamless flow throughout the course of the event, we provided the following services:",
    overview_ar:
      "شهدت بطولة الشطرنج عمل فريق الإنتاج لدينا في إعداد وتهيئة المكان، إلى جانب وجود منظمين متمرسين لضمان سير الفعالية على أكمل وجه. وقدمنا الخدمات التالية:",
    highlights: [
      "Gift Items",
      "Trophies",
      "Backdrop production",
      "Lighting & Sound System",
    ],
    highlights_ar: [
      "الهدايا",
      "الجوائز",
      "تصنيع المواد المطبوعة كالباك دروب والبنرات وغيرها",
      "أنظمة الإضاءة والصوت",
    ],
    heroImg: "/images/projects/chess-championship.jpg",
    gallery: ["/images/projects/chess-championship-1.jpg", "/images/projects/chess-championship-2.jpg"],
  },
  {
    id: "13",
    slug: "hajj-hackathon",
    title: "Hajj Hackathon",
    title_ar: "هاكاثون الحج",
        tagline: "Innovation in service of millions of pilgrims.",
    tagline_ar: "الابتكار في خدمة ملايين الحجاج.",
    overview:
      "A nine-day affair, where over 850 organizers welcomed three thousand participants, arranged their accommodations and managed the competition area. Our organizers were available around the clock to transport the participants from the hall to the hotel and back.",
    overview_ar:
      "مدة الحدث تسعة أيام، أدارها طاقمنا البالغ عددهم 850 شخصاً بمهمات مختلفة من استقبال المشاركين وتأمين أماكن إقامتهم. وقام المنظمون بإدارة المنطقة بتواجدهم على مدار الساعة.",
    highlights: [
      "Airport Welcoming",
      "24 Hour Transportation",
      "Hotel Management",
      "Hall Coordination",
      "Umrah Organization",
    ],
    highlights_ar: [
      "الترحيب بالمطار",
      "مواصلات 24 ساعة",
      "إدارة الفندق",
      "تنسيق القاعة",
      "تنظيم عمرة",
    ],
    heroImg: "/images/projects/hajj-hackathon.jpg",
    gallery: ["/images/projects/hajj-hackathon-1.jpg"],
  },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return PROJECTS_DATA.find((p) => p.slug === slug);
}
