import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { JsonLd } from "./components/JsonLd";
import { PageEffects } from "./components/PageEffects";
import {
  BASE_KEYWORDS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE_ALT,
  SOCIAL_IMAGE_PATH,
  siteJsonLd,
} from "./lib/seo";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dra. Adriana Varela | Medicina integral en Pereira",
    template: "%s | Dra. Adriana Varela",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: BASE_KEYWORDS,
  authors: [
    {
      name: SITE_NAME,
      url: `${SITE_URL}/sobre-mi`,
    },
  ],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "salud",
  verification: {
    google: "TyMWOVZKCLg49r5LP6z3mzORXm9UsmEwjAkWhkoqxvI",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Dra. Adriana Varela | Medicina integral en Pereira",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SOCIAL_IMAGE_PATH,
        width: 1731,
        height: 909,
        alt: SOCIAL_IMAGE_ALT,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dra. Adriana Varela | Medicina integral en Pereira",
    description: SITE_DESCRIPTION,
    images: [SOCIAL_IMAGE_PATH],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CO">
      <body className={geist.variable}>
        <JsonLd data={siteJsonLd} />
        <PageEffects />
        {children}
      </body>
    </html>
  );
}
