import type { Bi } from "@/components/providers/LanguageProvider";

/**
 * Single source of truth for every string on the page. Spanish is authored
 * verbatim from the foundation brief; English is a working translation to
 * refine. Components resolve leaves with `tr()` from the LanguageProvider.
 */

export const brand = {
  legalName: "Mujer Influencia Actual Foundation, Inc.",
  short: "MÍA",
  hashtag: "#JuntosSomosMásFuertes",
  jurisdiction: {
    es: "Florida Nonprofit Corporation",
    en: "Florida Nonprofit Corporation",
  } as Bi,
  // Placeholders — swap when the foundation confirms.
  email: "info@miafoundation.org",
  socials: {
    instagram: "#",
    facebook: "#",
    linkedin: "#",
  },
};

export const content = {
  hero: {
    hashtag: "#JuntosSomosMásFuertes",
    title: {
      es: "La influencia que transforma vidas.",
      en: "The influence that transforms lives.",
    },
    subtitle: {
      es: "Construimos una comunidad global que inspira liderazgo, crea oportunidades y transforma influencia en legado.",
      en: "We build a global community that inspires leadership, creates opportunities, and turns influence into legacy.",
    },
    body: {
      es: "Empoderamos a mujeres, hombres, jóvenes y comunidades en situación de vulnerabilidad mediante programas de educación, liderazgo y acción humanitaria.",
      en: "We empower women, men, youth, and vulnerable communities through programs in education, leadership, and humanitarian action.",
    },
    donate: { es: "Donar Ahora", en: "Donate Now" },
    ally: { es: "Conviértete en Aliado", en: "Become an Ally" },
    imageLabel: {
      es: "HERO — Fotografía horizontal de gran impacto. Personas reales de la comunidad MÍA. Liderazgo, unión, esperanza, diversidad y propósito.",
      en: "HERO — High-impact horizontal photo. Real people from the MÍA community. Leadership, unity, hope, diversity, purpose.",
    },
    trust: [
      { es: "Desde 2020", en: "Since 2020" },
      { es: "+5,000 miembros de la comunidad", en: "+5,000 community members" },
      { es: "Presencia en 24 países", en: "Present in 24 countries" },
      {
        es: "Sin fines de lucro registrada en Florida",
        en: "Nonprofit registered in Florida",
      },
    ] as Bi[],
  },

  why: {
    chapter: { es: "¿Por qué MÍA?", en: "Why MÍA?" },
    imageLabel: {
      es: "Karen junto a miembros de la comunidad MÍA.",
      en: "Karen with members of the MÍA community.",
    },
    title: {
      es: "Nacemos de una comunidad, una trayectoria y un propósito.",
      en: "Born from a community, a journey, and a purpose.",
    },
    paragraphs: [
      {
        es: "Desde 2020, MÍA ha construido una comunidad internacional que conecta a líderes, empresarios, emprendedores y profesionales comprometidos con el liderazgo, la colaboración y el propósito.",
        en: "Since 2020, MÍA has built an international community connecting leaders, business owners, entrepreneurs, and professionals committed to leadership, collaboration, and purpose.",
      },
      {
        es: "A través de eventos, reconocimientos y alianzas estratégicas, hemos creado una red que inspira crecimiento, fortalece conexiones y genera oportunidades para transformar vidas.",
        en: "Through events, recognitions, and strategic alliances, we've created a network that inspires growth, strengthens connections, and generates opportunities to transform lives.",
      },
      {
        es: "Hoy, esa trayectoria evoluciona con la creación de Mujer Influencia Actual Foundation, una organización sin fines de lucro que convierte esa comunidad en programas de educación, liderazgo y acción humanitaria para beneficiar a mujeres, hombres, jóvenes y comunidades en situación de vulnerabilidad.",
        en: "Today, that journey evolves with the creation of Mujer Influencia Actual Foundation, a nonprofit that turns that community into programs of education, leadership, and humanitarian action to benefit women, men, youth, and vulnerable communities.",
      },
    ] as Bi[],
    quote: {
      es: "No nacemos de una idea. Nacemos de una comunidad, una trayectoria y un propósito que hoy se transforman en acción.",
      en: "We are not born from an idea. We are born from a community, a journey, and a purpose that today become action.",
    },
  },

  mission: {
    chapter: { es: "Nuestra Misión", en: "Our Mission" },
    motto: {
      es: "Transformando influencia en legado.",
      en: "Transforming influence into legacy.",
    },
    missionLabel: { es: "Misión", en: "Mission" },
    mission: {
      es: "Empoderar a mujeres, hombres y jóvenes mediante programas de educación, liderazgo, desarrollo profesional e impacto social, creando oportunidades que inspiren el crecimiento, fortalezcan el servicio a los demás y generen un cambio positivo y sostenible en las comunidades donde servimos.",
      en: "To empower women, men, and youth through programs of education, leadership, professional development, and social impact — creating opportunities that inspire growth, strengthen service to others, and generate positive, sustainable change in the communities we serve.",
    },
    visionLabel: { es: "Visión", en: "Vision" },
    vision: {
      es: "Ser una organización sin fines de lucro reconocida internacionalmente por transformar vidas a través de la educación, el liderazgo, la colaboración y la acción social, construyendo una comunidad global donde mujeres, hombres y jóvenes se conviertan en agentes de cambio y dejen un legado positivo para las futuras generaciones.",
      en: "To be a nonprofit recognized internationally for transforming lives through education, leadership, collaboration, and social action — building a global community where women, men, and youth become agents of change and leave a positive legacy for future generations.",
    },
    valuesLabel: { es: "Valores", en: "Values" },
    values: [
      { es: "Liderazgo con Propósito", en: "Purposeful Leadership" },
      { es: "Integridad", en: "Integrity" },
      { es: "Empoderamiento", en: "Empowerment" },
      { es: "Educación", en: "Education" },
      { es: "Colaboración", en: "Collaboration" },
    ] as Bi[],
  },

  matters: {
    chapter: {
      es: "¿Por qué importa nuestro trabajo?",
      en: "Why our work matters",
    },
    imageLabel: {
      es: "Fotografía documental auténtica que transmite dignidad y esperanza.",
      en: "Authentic documentary photograph conveying dignity and hope.",
    },
    title: {
      es: "Toda persona merece la oportunidad de crecer.",
      en: "Everyone deserves the chance to grow.",
    },
    paragraphs: [
      {
        es: "Creemos que todas las personas merecen la oportunidad de aprender, crecer y desarrollar su máximo potencial.",
        en: "We believe everyone deserves the opportunity to learn, grow, and reach their full potential.",
      },
      {
        es: "Sin embargo, miles de niños y jóvenes aún enfrentan barreras para acceder a educación y oportunidades que transformen su futuro.",
        en: "Yet thousands of children and young people still face barriers to the education and opportunities that would transform their future.",
      },
      {
        es: "Muchas mujeres continúan encontrando obstáculos para desarrollar su liderazgo y alcanzar su independencia económica.",
        en: "Many women still encounter obstacles to developing their leadership and achieving economic independence.",
      },
      {
        es: "Las comunidades más vulnerables necesitan algo más que buenas intenciones: necesitan aliados comprometidos que conviertan la solidaridad en acciones concretas.",
        en: "The most vulnerable communities need more than good intentions — they need committed allies who turn solidarity into concrete action.",
      },
    ] as Bi[],
  },

  programs: {
    chapter: { es: "Nuestros Programas", en: "Our Programs" },
    title: {
      es: "Tres pilares que convierten la comunidad en acción.",
      en: "Three pillars that turn community into action.",
    },
    lede: {
      es: "A través de tres pilares estratégicos, MÍA transforma la fuerza de su comunidad en acciones concretas.",
      en: "Through three strategic pillars, MÍA transforms the strength of its community into concrete action.",
    },
    items: [
      {
        tag: { es: "01", en: "01" },
        title: {
          es: "Liderazgo y Empoderamiento",
          en: "Leadership & Empowerment",
        },
        body: {
          es: "Impulsamos el liderazgo, el desarrollo personal, las mentorías, el reconocimiento y las oportunidades de crecimiento.",
          en: "We drive leadership, personal development, mentorship, recognition, and opportunities for growth.",
        },
      },
      {
        tag: { es: "02", en: "02" },
        title: {
          es: "Educación y Desarrollo Profesional",
          en: "Education & Professional Development",
        },
        body: {
          es: "Promovemos educación, formación profesional, capacitaciones, mentorías y oportunidades de aprendizaje continuo.",
          en: "We promote education, professional training, workshops, mentorship, and continuous learning opportunities.",
        },
      },
      {
        tag: { es: "03", en: "03" },
        title: {
          es: "Impacto Social y Apoyo Humanitario",
          en: "Social Impact & Humanitarian Support",
        },
        body: {
          es: "Desarrollamos iniciativas humanitarias, programas comunitarios y acciones de apoyo dirigidas a niños, jóvenes y familias en situación de vulnerabilidad.",
          en: "We develop humanitarian initiatives, community programs, and support actions for children, youth, and families in vulnerable situations.",
        },
      },
    ],
  },

  campaign: {
    chapter: { es: "Campaña Actual", en: "Current Campaign" },
    kicker: { es: "La Causa que Nos Une", en: "The Cause That Unites Us" },
    title: {
      es: "Porque toda vida merece una nueva oportunidad.",
      en: "Because every life deserves a new opportunity.",
    },
    imageLabel: {
      es: "Fotografía real relacionada con la Gala de Influencia Miami 2026.",
      en: "Real photo related to the Miami 2026 Influence Gala.",
    },
    paragraphs: [
      {
        es: "La Gala de Influencia Miami 2026 representa mucho más que una noche de reconocimientos. Es el encuentro de líderes, empresas y aliados comprometidos con un propósito común: transformar la influencia en acciones que generen esperanza, oportunidades y un legado para las futuras generaciones.",
        en: "The Miami 2026 Influence Gala represents far more than a night of recognitions. It's the gathering of leaders, companies, and allies committed to a common purpose: turning influence into actions that generate hope, opportunity, and a legacy for future generations.",
      },
      {
        es: "Los fondos recaudados durante la gala serán destinados, a través del programa de Impacto Social y Apoyo Humanitario de MÍA, a iniciativas dirigidas a niños afectados por el terremoto ocurrido en Venezuela. En alianza con organizaciones que trabajan directamente en las comunidades, impulsaremos acciones orientadas a contribuir a su bienestar, recuperación y acceso a nuevas oportunidades.",
        en: "Funds raised during the gala will be directed, through MÍA's Social Impact & Humanitarian Support program, to initiatives for children affected by the earthquake in Venezuela. In alliance with organizations working directly in the communities, we will drive actions to support their well-being, recovery, and access to new opportunities.",
      },
      {
        es: "Creemos que la verdadera influencia no se mide por el reconocimiento que recibimos, sino por las vidas que somos capaces de transformar. Cada empresa, aliado y persona que decide unirse a esta causa contribuye a construir un futuro con más esperanza, dignidad y oportunidades para quienes más lo necesitan.",
        en: "We believe true influence is measured not by the recognition we receive, but by the lives we're able to transform. Every company, ally, and person who joins this cause helps build a future with more hope, dignity, and opportunity for those who need it most.",
      },
    ] as Bi[],
    invite: {
      es: "Hoy te invitamos a ser parte de este propósito y demostrar que, juntos somos más fuertes.",
      en: "Today we invite you to be part of this purpose and show that, together we are stronger.",
    },
    button: {
      es: "Conviértete en un Aliado de Impacto",
      en: "Become an Impact Ally",
    },
  },

  numbers: {
    chapter: { es: "Nuestra Comunidad en Números", en: "Our Community in Numbers" },
    stats: [
      {
        value: 5000,
        prefix: "+",
        label: { es: "Miembros de la comunidad", en: "Community members" },
      },
      {
        value: 24,
        prefix: "",
        label: { es: "Países conectados", en: "Countries connected" },
      },
    ],
    quote: {
      es: "Desde 2020 construimos relaciones, impulsamos líderes y creamos oportunidades para servir a nuestras comunidades.",
      en: "Since 2020 we've built relationships, empowered leaders, and created opportunities to serve our communities.",
    },
  },

  timeline: {
    chapter: { es: "Nuestra Historia", en: "Our Story" },
    title: {
      es: "De una comunidad a un legado.",
      en: "From a community to a legacy.",
    },
    milestones: [
      {
        year: "2020",
        text: { es: "Nace la comunidad MÍA.", en: "The MÍA community is born." },
      },
      {
        year: "2023",
        text: {
          es: "Los programas de reconocimiento comienzan su expansión internacional.",
          en: "The recognition programs begin their international expansion.",
        },
      },
      {
        year: "2026",
        text: {
          es: "Se crea Mujer Influencia Actual Foundation.",
          en: "Mujer Influencia Actual Foundation is created.",
        },
      },
      {
        year: { es: "Hoy", en: "Today" },
        text: {
          es: "Impulsamos programas educativos, de liderazgo y acción humanitaria.",
          en: "We drive educational, leadership, and humanitarian programs.",
        },
      },
    ],
  },

  leadership: {
    chapter: { es: "Fundadoras y Junta Directiva", en: "Founders & Board of Directors" },
    intro: {
      es: "MÍA está liderada por un equipo fundador y una Junta Directiva comprometidos con la transparencia, el servicio y el desarrollo de nuestras comunidades.",
      en: "MÍA is led by a founding team and a Board of Directors committed to transparency, service, and the development of our communities.",
    },
    foundingLabel: { es: "Equipo Fundador", en: "Founding Team" },
    boardLabel: { es: "Junta Directiva", en: "Board of Directors" },
    photoHint: { es: "Foto", en: "Photo" },
  },

  governance: {
    chapter: { es: "Transparencia y Gobernanza", en: "Transparency & Governance" },
    title: {
      es: "Cada donación, gestionada con responsabilidad.",
      en: "Every donation, managed responsibly.",
    },
    items: [
      {
        es: "Mujer Influencia Actual Foundation, Inc. — Organización sin fines de lucro registrada en el Estado de Florida.",
        en: "Mujer Influencia Actual Foundation, Inc. — Nonprofit organization registered in the State of Florida.",
      },
      {
        es: "Solicitud del estatus 501(c)(3) en proceso.",
        en: "501(c)(3) status application pending.",
      },
      {
        es: "Compromiso con una gestión ética, transparente y responsable de cada donación recibida.",
        en: "Committed to the ethical, transparent, and responsible management of every donation received.",
      },
    ] as Bi[],
  },

  collaborate: {
    chapter: { es: "¿Cómo puedes colaborar?", en: "How can you help?" },
    lede: {
      es: "Hay muchas formas de formar parte de la misión de MÍA.",
      en: "There are many ways to be part of MÍA's mission.",
    },
    items: [
      {
        title: { es: "Donar", en: "Donate" },
        body: {
          es: "Apoya directamente nuestros programas.",
          en: "Support our programs directly.",
        },
      },
      {
        title: { es: "Convertirte en Sponsor", en: "Become a Sponsor" },
        body: {
          es: "Impulsa nuestros eventos y campañas.",
          en: "Power our events and campaigns.",
        },
      },
      {
        title: { es: "Ser Aliado", en: "Become an Ally" },
        body: {
          es: "Organizaciones, empresas y líderes comunitarios son bienvenidos.",
          en: "Organizations, companies, and community leaders are welcome.",
        },
      },
      {
        title: { es: "Grants & Funding", en: "Grants & Funding" },
        body: {
          es: "Información para fundaciones y organismos financiadores.",
          en: "Information for foundations and funding bodies.",
        },
      },
    ],
  },

  closing: {
    imageLabel: {
      es: "La fotografía más emotiva de la página: unión, esperanza y comunidad.",
      en: "The most moving photo on the page: unity, hope, and community.",
    },
    quote: {
      es: "Juntos construimos oportunidades, formamos líderes y dejamos un legado para las futuras generaciones.",
      en: "Together we build opportunities, shape leaders, and leave a legacy for future generations.",
    },
    button: { es: "Donar Hoy", en: "Donate Today" },
    institutional: {
      es: "Porque las comunidades más fuertes nacen cuando personas, organizaciones y empresas deciden trabajar unidas por un propósito común.",
      en: "Because the strongest communities are born when people, organizations, and companies decide to work together for a common purpose.",
    },
  },

  footer: {
    tagline: {
      es: "Transformando influencia en legado.",
      en: "Transforming influence into legacy.",
    },
    contactLabel: { es: "Contacto", en: "Contact" },
    emailLabel: { es: "Correo electrónico", en: "Email" },
    socialLabel: { es: "Redes sociales", en: "Social media" },
    privacy: { es: "Política de Privacidad", en: "Privacy Policy" },
    terms: { es: "Términos y Condiciones", en: "Terms & Conditions" },
    rights: {
      es: "Todos los derechos reservados.",
      en: "All rights reserved.",
    },
    placeholderNote: {
      es: "Correo y redes sociales por confirmar.",
      en: "Email and social links to be confirmed.",
    },
  },
} as const;
