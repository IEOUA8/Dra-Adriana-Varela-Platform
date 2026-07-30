import type { Metadata } from "next";
import { doctorProfile } from "../../content/doctor";
import { medicalApproaches } from "../../content/services";
import { ApproachDetail } from "../ApproachDetail";

export const metadata: Metadata = {
  title: "Medicina Regenerativa",
  description:
    "Conoce el enfoque y los servicios de Medicina Regenerativa informados por la Dra. Adriana Varela.",
};

export default function RegenerativeMedicinePage() {
  return (
    <ApproachDetail
      approach={medicalApproaches[0]}
      philosophy={doctorProfile.philosophy.pillars[0]}
    />
  );
}
