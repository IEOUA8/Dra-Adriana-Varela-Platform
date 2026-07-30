import type { Metadata } from "next";
import { doctorProfile } from "../../content/doctor";
import { medicalApproaches } from "../../content/services";
import { ApproachDetail } from "../ApproachDetail";

export const metadata: Metadata = {
  title: "Medicina Funcional",
  description:
    "Conoce el enfoque y los servicios de Medicina Funcional informados por la Dra. Adriana Varela.",
};

export default function FunctionalMedicinePage() {
  return (
    <ApproachDetail
      approach={medicalApproaches[1]}
      philosophy={doctorProfile.philosophy.pillars[1]}
    />
  );
}
