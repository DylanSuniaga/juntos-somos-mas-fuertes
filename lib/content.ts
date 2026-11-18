import type { Bi } from "@/components/providers/LanguageProvider";

/**
 * Single source of truth for every string on the page. Spanish is authored
 * verbatim from the foundation brief; English is a working translation to
 * refine. Components resolve leaves with `tr()` from the LanguageProvider.
 *
 * Copy revision 2026-07-22 — folded in the foundation's CORRECCIONES pass
 * (history now starts in 2012, not 2020; gala CTAs unified; volunteer section
 * added; contact details confirmed).
 */

export const brand = {
  legalName: "Mujer Influencia Actual Foundation, Inc.",
  short: "MÍA",
  /** Header lockup next to the mark — the foundation asked for the full name. */
  wordmark: "MUJER INFLUENCIA ACTUAL FOUNDATION",
  hashtag: "#JuntosSomosMásFuertes",
  jurisdiction: {
    es: "Florida Nonprofit Corporation",
    en: "Florida Nonprofit Corporation",
  } as Bi,
  email: "info@mujerinfluenciaactualfoundation.org",
  /**
   * Pending — Karen to confirm which number to publish. Set it to a string
   * (e.g. "+1 305 555 0000") and the footer contact row renders automatically.
   */
  phone: null as string | null,
  /** `null` = the foundation has no page yet → rendered as plain text, no link. */
  socials: {
    instagram: "https://www.instagram.com/miainfluencia/",
    linkedin: "https://www.linkedin.com/company/mia-mujer-influencia-actual/",
    facebook: null as string | null,
  },
};

/**
 * Dubraska's Gala sales landing page. It isn't live yet, so every gala CTA
 * ("Sé parte de este legado" / "Conviértete en aliado") scrolls down to the
 * on-page contact form instead (2026-07-27) — submissions are captured via
 * Resend and emailed to the foundation. Set this to the URL when the landing
 * ships and all CTAs follow it (opening in a new tab); no other edit needed.
 */
const GALA_LANDING_URL: string | null = null;

export const links = {
  /** Every "gala" CTA points here — the contact form anchor until the landing ships. */
  gala: GALA_LANDING_URL ?? "#contacto",
  galaIsLive: GALA_LANDING_URL !== null,
  volunteer:
    "https://docs.google.com/forms/d/e/1FAIpQLSdnWbqsHkAq1WAqDshYuHDV0PSCoc2-YW6Y-LJxYXXYSPaSIQ/viewform",
  /** Gala venue on Google Maps (Martin's Event Center, Inglewood). */
  venueMap:
    "https://www.google.com/maps/search/?api=1&query=Martin%27s+Event+Center+3215+W+Manchester+Blvd+Inglewood+CA+90305",
};

export const content = {
  hero: {
    hashtag: "#JuntosSomosMásFuertes",
    title: {
      es: "La influencia que transforma vidas.",
      en: "The influence that transforms lives.",
    },
    subtitle: {
      es: "Somos una organización sin fines de lucro que convierte el liderazgo y la educación en acciones que fortalecen a las personas, las comunidades y las nuevas generaciones.",
      en: "We are a nonprofit that turns leadership and education into action — strengthening people, communities, and the generations to come.",
    },
    body: {
      es: "Empoderamos a mujeres, hombres, jóvenes y comunidades en situación de vulnerabilidad mediante programas de educación, liderazgo y acción humanitaria.",
      en: "We empower women, men, youth, and vulnerable communities through programs in education, leadership, and humanitarian action.",
    },
    donate: { es: "Donar Ahora", en: "Donate Now" },
    ally: { es: "Conviértete en Aliado", en: "Become an Ally" },
    imageLabel: {
      es: "Taller infantil, Canadá 2015 — programas educativos de la comunidad MÍA.",
      en: "Children's workshop, Canada 2015 — educational programs from the MÍA community.",
    },
    /** Trust bar: a figure over a short qualifier. */
    trust: [
      {
        value: { es: "Desde 2012", en: "Since 2012" },
        label: { es: "Construyendo comunidad", en: "Building community" },
      },
      {
        value: { es: "23+", en: "23+" },
        label: { es: "Eventos con propósito", en: "Events with purpose" },
      },
      {
        value: { es: "24 países", en: "24 countries" },
        label: { es: "Presencia internacional", en: "International presence" },
      },
      {
        value: { es: "5,000+", en: "5,000+" },
        label: { es: "Miembros de la comunidad", en: "Community members" },
      },
    ],
  },

  /** 01 · IDENTIDAD — what the name, the wing, and the red stand for. */
  essence: {
    chapter: { es: "Identidad", en: "Identity" },
    title: { es: "Nuestra Esencia", en: "Our Essence" },
    items: [
      {
        lead: { es: "El nombre", en: "The name" },
        body: {
          es: "“MÍA” es la abreviatura de Mujer Influencia Actual. Representa una comunidad que inspira liderazgo, promueve la educación y crea oportunidades para fortalecer a las personas y construir comunidades más fuertes, sin distinción de género.",
          en: "“MÍA” stands for Mujer Influencia Actual. It represents a community that inspires leadership, promotes education, and creates opportunities to strengthen people and build stronger communities — without distinction of gender.",
        },
      },
      {
        lead: { es: "El ala", en: "The wing" },
        body: {
          es: "Representa elevación, libertad y esperanza. Simboliza nuestra convicción de que cada persona puede elevarse, romper límites y alcanzar su máximo potencial.",
          en: "It represents elevation, freedom, and hope. It symbolizes our conviction that every person can rise, break through limits, and reach their full potential.",
        },
      },
      {
        lead: { es: "El color rojo", en: "The color red" },
        body: {
          es: "El rojo representa la pasión por servir, la valentía para liderar y el compromiso de actuar con propósito. Es el color que inspira cada acción que emprendemos para construir un futuro con mayores oportunidades.",
          en: "Red represents the passion to serve, the courage to lead, and the commitment to act with purpose. It is the color behind every action we take to build a future with greater opportunity.",
        },
      },
    ],
  },

  /** 02 · NUESTRA HISTORIA */
  why: {
    chapter: { es: "Nuestra Historia", en: "Our Story" },
    imageLabel: {
      es: "Karen Gisella Mairena, fundadora y presidenta de MÍA.",
      en: "Karen Gisella Mairena, founder and president of MÍA.",
    },
    title: {
      es: "Nacemos de una historia, una comunidad y una trayectoria con propósito.",
      en: "Born from a story, a community, and a journey with purpose.",
    },
    paragraphs: [
      {
        es: "Desde 2012, MÍA ha impulsado iniciativas que han unido a personas, organizaciones y comunidades alrededor del liderazgo, la educación y el servicio. A través de eventos, programas y actividades con propósito, hemos construido una comunidad internacional comprometida con generar oportunidades y fortalecer el desarrollo de las personas.",
        en: "Since 2012, MÍA has driven initiatives that bring people, organizations, and communities together around leadership, education, and service. Through purposeful events, programs, and activities, we have built an international community committed to creating opportunity and strengthening people's development.",
      },
      {
        es: "Con 23 iniciativas realizadas en distintos países, MÍA ha consolidado una trayectoria basada en la colaboración, el reconocimiento y la creación de espacios que inspiran, conectan y fortalecen a las comunidades.",
        en: "With 23 initiatives carried out across different countries, MÍA has built a track record grounded in collaboration, recognition, and the creation of spaces that inspire, connect, and strengthen communities.",
      },
      {
        es: "En 2026, esa trayectoria evoluciona con la creación de Mujer Influencia Actual Foundation, consolidando una visión de liderazgo inclusivo que promueve la educación y el servicio como pilares para transformar vidas.",
        en: "In 2026, that journey evolves with the creation of Mujer Influencia Actual Foundation, consolidating a vision of inclusive leadership that champions education and service as the pillars for transforming lives.",
      },
      {
        es: "Hoy, transformamos esa experiencia en programas que generan oportunidades, fortalecen a las personas e impulsan el desarrollo comunitario para construir un mejor futuro para las nuevas generaciones.",
        en: "Today, we turn that experience into programs that create opportunity, strengthen people, and drive community development to build a better future for the generations to come.",
      },
    ] as Bi[],
    /**
     * Invitation to the founder's story video. `embedUrl` stays null until the
     * foundation films it — the block renders as an inert placeholder plate.
     */
    video: {
      title: { es: "Conoce cómo nació MÍA", en: "See how MÍA began" },
      body: {
        es: "Nuestra fundadora comparte la historia que dio origen a este movimiento y el camino que nos ha traído hasta aquí.",
        en: "Our founder shares the story behind this movement and the road that brought us here.",
      },
      pending: { es: "Video próximamente", en: "Video coming soon" },
      embedUrl: null as string | null,
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
      es: "Encuentro de liderazgo de la comunidad MÍA.",
      en: "A MÍA community leadership gathering.",
    },
    title: {
      es: "Toda persona merece la oportunidad de crecer.",
      en: "Everyone deserves the chance to grow.",
    },
    paragraphs: [
      {
        es: "Creemos que el talento está en todas partes, pero las oportunidades no.",
        en: "We believe talent is everywhere — opportunity is not.",
      },
      {
        es: "Cuando una persona tiene acceso a educación, liderazgo y una comunidad que cree en ella, descubre herramientas para crecer, servir e inspirar a otros.",
        en: "When someone has access to education, leadership, and a community that believes in them, they find the tools to grow, to serve, and to inspire others.",
      },
      {
        es: "Por eso trabajamos para abrir caminos donde antes había barreras, fortalecer capacidades y acompañar a quienes desean construir un mejor futuro para sí mismos y para sus comunidades.",
        en: "That is why we work to open paths where there were barriers, to build capability, and to walk alongside those who want to build a better future for themselves and their communities.",
      },
      {
        es: "Porque cuando una persona crece, su influencia trasciende y su legado permanece.",
        en: "Because when a person grows, their influence carries further — and their legacy remains.",
      },
    ] as Bi[],
  },

  programs: {
    chapter: { es: "Nuestros Programas", en: "Our Programs" },
    title: {
      es: "Tres pilares, una misma misión.",
      en: "Three pillars, one mission.",
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
          es: "Impulsamos el desarrollo del liderazgo, la mentoría y el crecimiento personal para que mujeres, hombres y jóvenes fortalezcan sus capacidades, inspiren a otros y se conviertan en agentes de cambio dentro de sus comunidades.",
          en: "We drive leadership development, mentorship, and personal growth so that women, men, and youth strengthen their capabilities, inspire others, and become agents of change within their communities.",
        },
      },
      {
        tag: { es: "02", en: "02" },
        title: {
          es: "Educación y Desarrollo Profesional",
          en: "Education & Professional Development",
        },
        body: {
          es: "Promovemos el acceso a la educación, la formación y el desarrollo de habilidades que amplían las oportunidades académicas, profesionales y de crecimiento para las nuevas generaciones.",
          en: "We promote access to education, training, and skills development that widen academic, professional, and growth opportunities for the next generations.",
        },
      },
      {
        tag: { es: "03", en: "03" },
        title: {
          es: "Impacto Social y Apoyo Humanitario",
          en: "Social Impact & Humanitarian Support",
        },
        body: {
          es: "Fortalecemos comunidades mediante iniciativas de apoyo humanitario, alianzas estratégicas y acciones solidarias que promueven el bienestar, la resiliencia y nuevas oportunidades para quienes más lo necesitan.",
          en: "We strengthen communities through humanitarian support, strategic alliances, and acts of solidarity that advance well-being, resilience, and new opportunities for those who need them most.",
        },
      },
    ],
  },

  campaign: {
    chapter: { es: "Campaña Actual", en: "Current Campaign" },
    kicker: { es: "La Causa que Nos Une", en: "The Cause That Unites Us" },
    title: {
      es: "La influencia también se comparte.",
      en: "Influence is meant to be shared.",
    },
    imageLabel: {
      es: "Niños y familias afectados por el doble terremoto en Venezuela.",
      en: "Children and families affected by the double earthquake in Venezuela.",
    },
    paragraphs: [
      {
        es: "Desde sus inicios, la Gala de Influencia ha reunido a líderes, profesionales, empresarios, emprendedores y agentes de cambio para reconocer a quienes inspiran con su trayectoria y contribuyen al desarrollo de sus comunidades. A lo largo de los años, cada edición ha apoyado una causa con propósito. En esta edición, ese compromiso da un nuevo paso al destinar los fondos recaudados a uno de los programas de Mujer Influencia Actual Foundation, fortaleciendo el alcance y la sostenibilidad de esa labor social.",
        en: "Since its beginnings, the Influence Gala has brought together leaders, professionals, business owners, entrepreneurs, and changemakers to honor those who inspire through their work and contribute to their communities. Over the years, every edition has supported a cause with purpose. This edition, that commitment takes a further step: the funds raised go to one of Mujer Influencia Actual Foundation's programs, strengthening the reach and sustainability of that social work.",
      },
      {
        es: "Los fondos recaudados durante la Gala de Reconocimiento MÍA Mujer Influencia Actual California 2027 serán destinados al programa de Impacto Social y Apoyo Humanitario de Mujer Influencia Actual Foundation para apoyar iniciativas dirigidas a niños, niñas y jóvenes en condición de vulnerabilidad afectados por el doble terremoto ocurrido en Venezuela. En alianza con organizaciones que trabajan directamente en las comunidades, contribuiremos a impulsar acciones que fortalezcan su bienestar, acompañen su recuperación y generen nuevas oportunidades para su futuro.",
        en: "Funds raised during the MÍA Mujer Influencia Actual Recognition Gala California 2027 will go to Mujer Influencia Actual Foundation's Social Impact & Humanitarian Support program, backing initiatives for vulnerable children and young people affected by the double earthquake in Venezuela. Partnering with organizations working directly in those communities, we will help drive actions that strengthen their well-being, support their recovery, and open new opportunities for their future.",
      },
    ] as Bi[],
    /** Triptych under the campaign copy. */
    images: [
      {
        src: "/images/campaign-1.jpg",
        label: {
          es: "Familias afectadas por el doble terremoto en Venezuela.",
          en: "Families affected by the double earthquake in Venezuela.",
        },
      },
      {
        src: "/images/campaign-2.jpg",
        label: {
          es: "Ayuda humanitaria — Unidos por Venezuela.",
          en: "Humanitarian aid — United for Venezuela.",
        },
      },
      {
        src: "/images/campaign-3.jpg",
        label: {
          es: "Acceso a educación para niños, niñas y jóvenes.",
          en: "Access to education for children and young people.",
        },
      },
    ],
    /** Next gala — date, time and venue (from Karen, 2026-11-17). */
    event: {
      name: {
        es: "Gala de Reconocimiento MÍA Mujer Influencia Actual · California 2027",
        en: "MÍA Mujer Influencia Actual Recognition Gala · California 2027",
      },
      dateLabel: { es: "Fecha", en: "Date" },
      date: { es: "Jueves 28 de enero de 2027", en: "Thursday, January 28, 2027" },
      timeLabel: { es: "Hora", en: "Time" },
      time: { es: "6:30 p. m. – 10:00 p. m.", en: "6:30 PM – 10:00 PM" },
      venueLabel: { es: "Lugar", en: "Venue" },
      venue: "Martin's Event Center",
      address: "3215 W Manchester Blvd, Inglewood, CA 90305",
      mapCta: { es: "Ver en el mapa", en: "View on map" },
    },
    /**
     * Upcoming events calendar (from Karen, 2026-11-17). Month-only dates are
     * unconfirmed days — replace with the exact date when the foundation sends it.
     * Honduras deliberately omitted (not confirmed).
     */
    calendar: {
      title: { es: "Próximas Galas", en: "Upcoming Galas" },
      items: [
        {
          date: { es: "28 de enero, 2027", en: "January 28, 2027" },
          name: { es: "Gala de Reconocimiento MÍA · California", en: "MÍA Recognition Gala · California" },
          place: "Martin's Event Center · Inglewood, CA",
        },
        {
          date: { es: "Febrero 2027", en: "February 2027" },
          name: { es: "Congreso MÍA", en: "MÍA Congress" },
          place: null,
        },
        {
          date: { es: "Abril 2027", en: "April 2027" },
          name: { es: "Gala de Reconocimiento MÍA · Canadá", en: "MÍA Recognition Gala · Canada" },
          place: null,
        },
        {
          date: { es: "13 de mayo, 2027", en: "May 13, 2027" },
          name: { es: "Gala de Reconocimiento MÍA · Miami", en: "MÍA Recognition Gala · Miami" },
          place: "Diamond Venue at Doral · Doral, FL",
        },
        {
          date: { es: "Julio 2027", en: "July 2027" },
          name: { es: "Gala de Reconocimiento MÍA · Guatemala", en: "MÍA Recognition Gala · Guatemala" },
          place: null,
        },
      ] as { date: Bi; name: Bi; place: string | null }[],
    },
    invite: {
      es: "Hoy te invitamos a sumarte a esta causa y demostrar que, juntos, somos más fuertes.",
      en: "Today we invite you to join this cause and show that, together, we are stronger.",
    },
    button: {
      es: "Sé parte de este legado",
      en: "Be part of this legacy",
    },
  },

  /** 07 · NUESTRA TRAYECTORIA — rendered as a horizontal timeline. */
  timeline: {
    chapter: { es: "Nuestra Trayectoria", en: "Our Journey" },
    title: {
      es: "De una comunidad a un legado.",
      en: "From a community to a legacy.",
    },
    milestones: [
      {
        year: "2012",
        label: { es: "Primera iniciativa", en: "First initiative" },
        text: {
          es: "Comienza el camino de MÍA con su primera iniciativa comunitaria.",
          en: "MÍA's road begins with its first community initiative.",
        },
      },
      {
        year: "2015",
        label: { es: "Programas infantiles", en: "Children's programs" },
        text: {
          es: "Se desarrollan programas educativos y actividades para niños y familias.",
          en: "Educational programs and activities for children and families take shape.",
        },
      },
      {
        year: "2019",
        label: { es: "Espacios de liderazgo", en: "Leadership spaces" },
        text: {
          es: "La comunidad continúa creciendo con eventos y espacios de liderazgo.",
          en: "The community keeps growing through events and leadership spaces.",
        },
      },
      {
        year: "2023–2025",
        label: { es: "Comunidad global", en: "Global community" },
        text: {
          es: "MÍA expande su presencia internacional con iniciativas en distintos países.",
          en: "MÍA expands its international presence with initiatives across countries.",
        },
      },
      {
        year: "2026",
        label: { es: "Nace la Fundación", en: "The Foundation is born" },
        text: {
          es: "Nace Mujer Influencia Actual Foundation, consolidando más de una década de trayectoria en liderazgo, educación y servicio.",
          en: "Mujer Influencia Actual Foundation is born, consolidating over a decade of work in leadership, education, and service.",
        },
      },
    ],
  },

  leadership: {
    chapter: { es: "Nuestro Liderazgo", en: "Our Leadership" },
    title: {
      es: "Fundadoras y Junta Directiva",
      en: "Founders & Board of Directors",
    },
    intro: {
      es: "Mujer Influencia Actual Foundation está liderada por un equipo fundador y una Junta Directiva comprometidos con la transparencia, el servicio y el fortalecimiento de las comunidades a las que servimos.",
      en: "Mujer Influencia Actual Foundation is led by a founding team and a Board of Directors committed to transparency, service, and strengthening the communities we serve.",
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
        es: "Gobernanza responsable a través de una Junta Directiva comprometida con la misión de la Fundación.",
        en: "Responsible governance through a Board of Directors committed to the Foundation's mission.",
      },
      {
        es: "Gestión ética y transparente de las donaciones, alianzas y programas que impulsamos.",
        en: "Ethical, transparent management of the donations, alliances, and programs we drive.",
      },
      {
        es: "Compromiso con la rendición de cuentas para fortalecer la confianza de nuestros aliados, patrocinadores y comunidad.",
        en: "A commitment to accountability that strengthens the trust of our allies, sponsors, and community.",
      },
    ] as Bi[],
  },

  /** Volunteer call — sits after the closing CTA and points at the Google Form. */
  volunteer: {
    chapter: { es: "Voluntariado", en: "Volunteer" },
    title: {
      es: "También puedes generar un cambio.",
      en: "You can create change too.",
    },
    body: {
      es: "Comparte tu tiempo, tu experiencia y tu talento para fortalecer los programas e iniciativas de Mujer Influencia Actual Foundation.",
      en: "Share your time, your experience, and your talent to strengthen the programs and initiatives of Mujer Influencia Actual Foundation.",
    },
    button: { es: "Quiero ser voluntario", en: "I want to volunteer" },
  },

  /**
   * Nominee registration form (Karen, 2026-11-17) — people sign up to be
   * nominated at one of the foundation's galas. One form for every gala; the
   * gala list mirrors the four galas in campaign.calendar. Fields are Karen's
   * minimum spec; Dubraska may add more.
   */
  nomination: {
    kicker: { es: "Inscripción", en: "Registration" },
    title: {
      es: "Nomínate a la Gala de Reconocimiento MÍA",
      en: "Get nominated for the MÍA Recognition Gala",
    },
    body: {
      es: "Si tu trayectoria inspira y transforma tu comunidad, queremos conocerte. Completa el formulario y el equipo de MÍA se pondrá en contacto contigo.",
      en: "If your work inspires and transforms your community, we want to meet you. Fill out the form and the MÍA team will be in touch.",
    },
    fields: {
      firstName: { es: "Nombre", en: "First name" },
      lastName: { es: "Apellido", en: "Last name" },
      email: { es: "Correo electrónico", en: "Email" },
      gala: { es: "Gala / país donde te nominas", en: "Gala / country you're applying for" },
      bio: { es: "Biografía", en: "Biography" },
    },
    bioHint: {
      es: "Cuéntanos quién eres, a qué te dedicas y el impacto de tu trabajo.",
      en: "Tell us who you are, what you do, and the impact of your work.",
    },
    galas: [
      { es: "California — enero 2027", en: "California — January 2027" },
      { es: "Canadá — abril 2027", en: "Canada — April 2027" },
      { es: "Miami — mayo 2027", en: "Miami — May 2027" },
      { es: "Guatemala — julio 2027", en: "Guatemala — July 2027" },
    ] as Bi[],
    submit: { es: "Enviar inscripción", en: "Submit registration" },
    sending: { es: "Enviando…", en: "Sending…" },
    success: {
      es: "¡Gracias! Recibimos tu inscripción y el equipo de MÍA te contactará pronto.",
      en: "Thank you! We received your registration and the MÍA team will contact you soon.",
    },
    error: {
      es: "No se pudo enviar. Escríbenos directamente a",
      en: "Couldn't send. Please email us directly at",
    },
    /** Shown on send failure — the real inbox (info@ has no mailbox yet). */
    fallbackEmail: "oficial@miainfluencia.com",
  },

  contact: {
    chapter: { es: "Contáctanos", en: "Contact us" },
    title: {
      es: "¿Quieres apoyar la causa?",
      en: "Want to support the cause?",
    },
    body: {
      es: "Cuéntanos cómo te gustaría sumarte —como aliado, patrocinador o donante de la Gala— y el equipo de MÍA te responderá directamente.",
      en: "Tell us how you'd like to get involved —as an ally, sponsor, or Gala donor— and the MÍA team will reply to you directly.",
    },
    fields: {
      name: { es: "Nombre", en: "Name" },
      email: { es: "Correo electrónico", en: "Email" },
      phone: { es: "Teléfono (opcional)", en: "Phone (optional)" },
      org: { es: "Empresa / organización (opcional)", en: "Company / organization (optional)" },
      interest: { es: "Me interesa", en: "I'm interested in" },
      message: { es: "Mensaje", en: "Message" },
    },
    interests: {
      gala: { es: "Patrocinar / asistir a la Gala", en: "Sponsoring / attending the Gala" },
      ally: { es: "Ser aliado u organización asociada", en: "Becoming an ally or partner org" },
      donate: { es: "Donar a la fundación", en: "Donating to the foundation" },
      other: { es: "Otro", en: "Other" },
    },
    submit: { es: "Enviar mensaje", en: "Send message" },
    sending: { es: "Enviando…", en: "Sending…" },
    success: {
      es: "¡Gracias! Recibimos tu mensaje y te responderemos pronto.",
      en: "Thank you! We received your message and will reply soon.",
    },
    error: {
      es: "No se pudo enviar. Escríbenos directamente a",
      en: "Couldn't send. Please email us directly at",
    },
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
    button: { es: "Sé parte de este legado", en: "Be part of this legacy" },
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
    phoneLabel: { es: "Teléfono", en: "Phone" },
    socialLabel: { es: "Redes sociales", en: "Social media" },
    privacy: { es: "Política de Privacidad", en: "Privacy Policy" },
    terms: { es: "Términos y Condiciones", en: "Terms & Conditions" },
    rights: {
      es: "Todos los derechos reservados.",
      en: "All rights reserved.",
    },
  },
} as const;
