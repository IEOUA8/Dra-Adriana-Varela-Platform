export type ServiceItem = {
  name: string;
  slug: string;
};

export type ServiceGroup = {
  heading: string;
  services: ServiceItem[];
};

export type MedicalApproach = {
  number: string;
  slug: string;
  title: string;
  groups: ServiceGroup[];
};

export const medicalApproaches: MedicalApproach[] = [
  {
    number: "01",
    slug: "medicina-regenerativa",
    title: "Medicina Regenerativa",
    groups: [
      {
        heading: "Regenerar desde el origen",
        services: [
          { name: "Exosomas", slug: "exosomas" },
          { name: "Polinucleótidos (PDRN)", slug: "polinucleotidos-pdrn" },
          {
            name: "Ondas de choque regenerativas",
            slug: "ondas-de-choque-regenerativas",
          },
          { name: "Manejo de fibrosis", slug: "manejo-de-fibrosis" },
          { name: "Regeneración íntima", slug: "regeneracion-intima" },
          { name: "Regeneración capilar", slug: "regeneracion-capilar" },
        ],
      },
    ],
  },
  {
    number: "02",
    slug: "medicina-funcional",
    title: "Medicina Funcional",
    groups: [
      {
        heading:
          "Quiero prevenir el envejecimiento, recuperar mi energía y sentirme más saludable",
        services: [
          {
            name: "Consulta y Programa Well Aging",
            slug: "consulta-programa-well-aging",
          },
          {
            name: "Evaluación integral del estado de salud",
            slug: "evaluacion-integral-estado-salud",
          },
          {
            name: "Test de optimización epigenética",
            slug: "test-optimizacion-epigenetica",
          },
          {
            name: "Planes personalizados de prevención",
            slug: "planes-personalizados-prevencion",
          },
          {
            name: "Optimización del estilo de vida",
            slug: "optimizacion-estilo-de-vida",
          },
          {
            name: "Suplementación personalizada",
            slug: "suplementacion-personalizada",
          },
          {
            name: "Estrategias para mejorar sueño, estrés y energía",
            slug: "estrategias-sueno-estres-energia",
          },
          {
            name: "Sueroterapia de vitaminas y minerales",
            slug: "sueroterapia-vitaminas-minerales",
          },
          {
            name: "Terapias antioxidantes",
            slug: "terapias-antioxidantes",
          },
          {
            name: "Terapias de detoxificación",
            slug: "terapias-detoxificacion",
          },
          {
            name: "Medicina biorreguladora intravenosa",
            slug: "medicina-biorreguladora-intravenosa",
          },
          { name: "Biopuntura", slug: "biopuntura" },
        ],
      },
    ],
  },
  {
    number: "03",
    slug: "medicina-estetica",
    title: "Medicina Estética",
    groups: [
      {
        heading:
          "Quiero rejuvenecer mi rostro de forma natural y mejorar la calidad de mi piel",
        services: [
          { name: "Toxina botulínica", slug: "toxina-botulinica" },
          {
            name: "Rejuvenecimiento con láser Erbium",
            slug: "rejuvenecimiento-laser-erbium",
          },
          { name: "Peelings médicos", slug: "peelings-medicos" },
          { name: "Nanopore", slug: "nanopore" },
          { name: "Bioestimulación facial", slug: "bioestimulacion-facial" },
          { name: "Armonización facial", slug: "armonizacion-facial" },
          { name: "Tratamiento de manchas", slug: "tratamiento-manchas" },
          { name: "Diseño de labios", slug: "diseno-labios" },
          {
            name: "Despigmentación íntima",
            slug: "despigmentacion-intima",
          },
          {
            name: "Manejo de cicatrices y estrías",
            slug: "manejo-cicatrices-estrias",
          },
          {
            name: "Retiro de lesiones benignas",
            slug: "retiro-lesiones-benignas",
          },
        ],
      },
      {
        heading: "Quiero remodelar mi cuerpo sin cirugía",
        services: [
          {
            name: "Modelado corporal no invasivo",
            slug: "modelado-corporal-no-invasivo",
          },
          { name: "Tratamiento de flacidez", slug: "tratamiento-flacidez" },
          { name: "Tratamiento de celulitis", slug: "tratamiento-celulitis" },
          {
            name: "Rejuvenecimiento íntimo femenino",
            slug: "rejuvenecimiento-intimo-femenino",
          },
          {
            name: "Depilación láser médica",
            slug: "depilacion-laser-medica",
          },
        ],
      },
    ],
  },
];

export function countApproachServices(approach: MedicalApproach) {
  return approach.groups.reduce(
    (total, group) => total + group.services.length,
    0,
  );
}
