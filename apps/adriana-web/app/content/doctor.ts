export type Credential = {
  title: string;
  institution: string;
  year?: string;
};

export const doctorProfile = {
  fullName: "Adriana Varela Nariño",
  displayName: "Dra. Adriana Varela",
  profession: "Médica Cirujana",
  location: "Pereira, Colombia",
  summary:
    "Médica cirujana con formación complementaria en dermato-oncología, medicina estética, tecnologías basadas en energía, medicina funcional y medicina biorreguladora de sistemas.",
  philosophy: {
    headline: "No creo en tratamientos aislados ni en soluciones universales.",
    introduction: [
      "Creo en una medicina que integra ciencia, prevención y regeneración para cuidar la salud y la belleza de forma responsable.",
      "A lo largo de mi trayectoria he entendido que la verdadera transformación no ocurre cuando tratamos únicamente un síntoma o un signo del envejecimiento, sino cuando comprendemos a la persona de manera integral.",
      "Por eso mi práctica médica se fundamenta en tres pilares que se complementan entre sí: Medicina Regenerativa, Medicina Funcional y Medicina Estética. Juntas me permiten diseñar protocolos personalizados para ayudarte a sentirte mejor, verte mejor y envejecer de una forma saludable, natural y segura.",
    ],
    pillars: [
      {
        number: "01",
        title: "Medicina Regenerativa",
        tagline: "Regenerar desde el origen",
        paragraphs: [
          "Creo profundamente en la capacidad que tiene el organismo para repararse cuando recibe los estímulos adecuados.",
          "La Medicina Regenerativa busca potenciar esos mecanismos naturales de recuperación mediante terapias que favorecen la regeneración celular y mejoran la calidad de los tejidos.",
        ],
      },
      {
        number: "02",
        title: "Medicina Funcional",
        tagline: "La salud comienza desde adentro",
        paragraphs: [
          "Para mí, cada paciente es único. Antes de tratar una consecuencia, me interesa comprender qué está ocurriendo en el organismo.",
          "La Medicina Funcional me permite evaluar factores como la inflamación, la alimentación, el sueño, el estrés, la salud intestinal, el metabolismo y los hábitos de vida que pueden estar influyendo tanto en tu bienestar como en el proceso de envejecimiento.",
          "Cuando optimizamos la salud interna, los cambios también se reflejan en el exterior.",
        ],
      },
      {
        number: "03",
        title: "Medicina Estética",
        tagline: "Resaltar tu belleza, no cambiar quién eres",
        paragraphs: [
          "Entiendo la Medicina Estética como una herramienta para preservar la armonía y acompañar el proceso natural del envejecimiento, nunca para transformar la identidad de una persona.",
          "Por eso realizo tratamientos personalizados, mínimamente invasivos y respaldados por tecnología médica de alta calidad, siempre buscando resultados elegantes, naturales y acordes con tus rasgos.",
        ],
      },
    ],
  },
  credentials: [
    {
      title: "Médica Cirujana",
      institution: "Universidad Nacional de Colombia",
      year: "2011",
    },
    {
      title: "Internado especial en Dermato-Oncología",
      institution: "Instituto Nacional de Cancerología",
    },
    {
      title: "Diplomado en Medicina Estética",
      institution: "Fundación Universitaria de Ciencias de la Salud (FUCS)",
    },
    {
      title: "Maestría en Tratamientos Estéticos",
      institution: "ELBS, España",
    },
    {
      title: "Diplomado en Tecnologías Basadas en Energía",
      institution: "Universidad Nacional de Colombia",
    },
    {
      title: "Diplomado en Medicina Funcional",
      institution: "AMF · IFM",
    },
    {
      title: "Diplomado en Medicina Biorreguladora de Sistemas",
      institution: "Pontificia Universidad Javeriana",
    },
  ] satisfies Credential[],
  professionalRoles: [
    {
      role: "Speaker",
      organization: "Neauvia · PB Serum · Globaltee",
    },
    {
      role: "Conferencista",
      organization: "AMWC Latin America 2023",
    },
    {
      role: "Miembro de junta directiva",
      organization:
        "AMEEC — Asociación de Médicos Estéticos del Eje Cafetero",
    },
  ],
  leadership: {
    role: "CEO",
    organization: "Canorá Medical",
    description:
      "Centro de medicina regenerativa, medicina estética avanzada, tecnologías láser, medicina funcional y spa en Pereira, Colombia.",
  },
} as const;
