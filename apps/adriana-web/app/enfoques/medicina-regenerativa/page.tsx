import type { Metadata } from "next";
import { doctorProfile } from "../../content/doctor";
import { medicalApproaches } from "../../content/services";
import { createPageMetadata } from "../../lib/seo";
import { ApproachDetail } from "../ApproachDetail";

export const metadata: Metadata = createPageMetadata({
  title: "Medicina regenerativa en Pereira",
  description:
    "Conoce el enfoque de medicina regenerativa de la Dra. Adriana Varela y los servicios informados, sujetos a valoración médica individual en Pereira.",
  path: "/enfoques/medicina-regenerativa",
  keywords: [
    "medicina regenerativa Pereira",
    "exosomas Pereira",
    "polinucleótidos PDRN",
    "regeneración capilar Pereira",
    "ondas de choque regenerativas",
  ],
});

export default function RegenerativeMedicinePage() {
  return (
    <ApproachDetail
      approach={medicalApproaches[0]}
      philosophy={doctorProfile.philosophy.pillars[0]}
    />
  );
}
