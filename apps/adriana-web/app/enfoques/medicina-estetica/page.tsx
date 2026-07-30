import type { Metadata } from "next";
import { doctorProfile } from "../../content/doctor";
import { medicalApproaches } from "../../content/services";
import { createPageMetadata } from "../../lib/seo";
import { ApproachDetail } from "../ApproachDetail";

export const metadata: Metadata = createPageMetadata({
  title: "Medicina estética en Pereira",
  description:
    "Conoce el enfoque de medicina estética de la Dra. Adriana Varela y los servicios informados para el cuidado facial, corporal y de la piel en Pereira.",
  path: "/enfoques/medicina-estetica",
  keywords: [
    "medicina estética Pereira",
    "rejuvenecimiento facial Pereira",
    "armonización facial Pereira",
    "bioestimulación facial",
    "depilación láser médica Pereira",
  ],
});

export default function AestheticMedicinePage() {
  return (
    <ApproachDetail
      approach={medicalApproaches[2]}
      philosophy={doctorProfile.philosophy.pillars[2]}
    />
  );
}
