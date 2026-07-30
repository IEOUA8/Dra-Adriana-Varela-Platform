import type { Metadata } from "next";
import type { MedicalApproach } from "../content/services";
import { doctorProfile } from "../content/doctor";

export const SITE_NAME = "Dra. Adriana Varela";
export const SITE_URL = "https://www.dradrianavarela.com";
export const SITE_DESCRIPTION =
  "Conoce a la Dra. Adriana Varela y su enfoque en medicina regenerativa, funcional y estética, con valoración individual en Pereira, Colombia.";
export const SOCIAL_IMAGE_PATH =
  "/images/portada-seo-dra-adriana-varela.png";
export const SOCIAL_IMAGE_ALT =
  "Dra. Adriana Varela — Medicina estética, regenerativa y funcional";

export const BASE_KEYWORDS = [
  "Dra. Adriana Varela",
  "Adriana Varela Nariño",
  "médica en Pereira",
  "medicina regenerativa en Pereira",
  "medicina funcional en Pereira",
  "medicina estética en Pereira",
  "envejecimiento saludable",
  "valoración médica individual",
  "Canorá Medical",
];

const physicianId = `${SITE_URL}/#dra-adriana-varela`;
const websiteId = `${SITE_URL}/#website`;

function absoluteUrl(path: string) {
  return new URL(path, `${SITE_URL}/`).toString();
}

function socialImage() {
  return {
    url: SOCIAL_IMAGE_PATH,
    width: 1731,
    height: 909,
    alt: SOCIAL_IMAGE_ALT,
    type: "image/png",
  };
}

type PageMetadataInput = {
  title: string;
  absoluteTitle?: string;
  description: string;
  path: string;
  keywords?: string[];
  index?: boolean;
};

export function createPageMetadata({
  title,
  absoluteTitle,
  description,
  path,
  keywords = [],
  index = true,
}: PageMetadataInput): Metadata {
  const socialTitle = absoluteTitle ?? `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    keywords: [...new Set([...BASE_KEYWORDS, ...keywords])],
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "es_CO",
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      images: [socialImage()],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [SOCIAL_IMAGE_PATH],
    },
    robots: index
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : {
          index: false,
          follow: true,
        },
  };
}

export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      alternateName: doctorProfile.fullName,
      description: SITE_DESCRIPTION,
      inLanguage: "es-CO",
      publisher: {
        "@id": physicianId,
      },
    },
    {
      "@type": "Physician",
      "@id": physicianId,
      name: doctorProfile.displayName,
      alternateName: doctorProfile.fullName,
      url: `${SITE_URL}/sobre-mi`,
      image: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/dra-adriana-profile.jpeg`,
      },
      jobTitle: doctorProfile.profession,
      description: doctorProfile.summary,
      knowsAbout: [
        "Medicina regenerativa",
        "Medicina funcional",
        "Medicina estética",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Pereira",
        addressCountry: "CO",
      },
      worksFor: {
        "@type": "MedicalBusiness",
        name: doctorProfile.leadership.organization,
        url: "https://canoramedical.com/",
      },
    },
  ],
};

export const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/sobre-mi#profile-page`,
      url: `${SITE_URL}/sobre-mi`,
      name: `Sobre ${doctorProfile.displayName}`,
      description: doctorProfile.summary,
      inLanguage: "es-CO",
      isPartOf: {
        "@id": websiteId,
      },
      mainEntity: {
        "@id": physicianId,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Sobre mí",
          item: `${SITE_URL}/sobre-mi`,
        },
      ],
    },
  ],
};

export function createApproachJsonLd({
  approach,
  description,
}: {
  approach: MedicalApproach;
  description: string;
}) {
  const path = `/enfoques/${approach.slug}`;
  const services = approach.groups.flatMap((group) => group.services);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${absoluteUrl(path)}#webpage`,
        url: absoluteUrl(path),
        name: `${approach.title} | ${SITE_NAME}`,
        description,
        inLanguage: "es-CO",
        isPartOf: {
          "@id": websiteId,
        },
        author: {
          "@id": physicianId,
        },
        about: {
          "@type": "Thing",
          name: approach.title,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Enfoques",
            item: `${SITE_URL}/#enfoques`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: approach.title,
            item: absoluteUrl(path),
          },
        ],
      },
      {
        "@type": "ItemList",
        name: `Servicios informados de ${approach.title}`,
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: service.name,
        })),
      },
    ],
  };
}
