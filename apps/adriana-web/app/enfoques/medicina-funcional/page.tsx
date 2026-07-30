import type { Metadata } from "next";
import { doctorProfile } from "../../content/doctor";
import { medicalApproaches } from "../../content/services";
import { createPageMetadata } from "../../lib/seo";
import { ApproachDetail } from "../ApproachDetail";

export const metadata: Metadata = createPageMetadata({
  title: "Medicina funcional en Pereira",
  description:
    "Conoce el enfoque de medicina funcional de la Dra. Adriana Varela y los servicios informados para una valoración integral e individual en Pereira.",
  path: "/enfoques/medicina-funcional",
  keywords: [
    "medicina funcional Pereira",
    "programa Well Aging",
    "evaluación integral del estado de salud",
    "optimización del estilo de vida",
    "sueroterapia Pereira",
  ],
});

export default function FunctionalMedicinePage() {
  return (
    <ApproachDetail
      approach={medicalApproaches[1]}
      philosophy={doctorProfile.philosophy.pillars[1]}
    />
  );
}
