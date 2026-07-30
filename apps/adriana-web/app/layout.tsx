import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { PageEffects } from "./components/PageEffects";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dradrianavarela.com"),
  title: {
    default: "Dra. Adriana Varela",
    template: "%s | Dra. Adriana Varela",
  },
  description:
    "Medicina regenerativa, funcional y estética con una mirada integral, natural y personalizada.",
  openGraph: {
    type: "website",
    locale: "es_CO",
    title: "Dra. Adriana Varela",
    description:
      "Envejecer es natural. Hacerlo con salud y consciencia es una decisión.",
    images: [
      {
        url: "/og.png",
        width: 1734,
        height: 907,
        alt: "Dra. Adriana Varela — Envejecer con salud y consciencia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dra. Adriana Varela",
    description:
      "Envejecer es natural. Hacerlo con salud y consciencia es una decisión.",
    images: ["/og.png"],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={geist.variable}>
        <PageEffects />
        {children}
      </body>
    </html>
  );
}
