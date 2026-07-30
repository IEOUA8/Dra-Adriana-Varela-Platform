import type { Metadata } from "next";
import { doctorProfile } from "../../content/doctor";
import { medicalApproaches } from "../../content/services";
import { ApproachDetail } from "../ApproachDetail";

export const metadata: Metadata = {
  title: "Medicina Estética",
  description:
    "Conoce el enfoque y los servicios de Medicina Estética informados por la Dra. Adriana Varela.",
};

export default function AestheticMedicinePage() {
  return (
    <ApproachDetail
      approach={medicalApproaches[2]}
      philosophy={doctorProfile.philosophy.pillars[2]}
    />
  );
}
