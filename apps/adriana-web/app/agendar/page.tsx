import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { createPageMetadata } from "../lib/seo";
import { BookingScheduler } from "./BookingScheduler";

export const metadata: Metadata = createPageMetadata({
  title: "Agenda de valoración médica",
  description:
    "Consulta el estado de la agenda de valoración médica de la Dra. Adriana Varela en Pereira. Las reservas online se encuentran en activación.",
  path: "/agendar",
  keywords: [
    "agenda Dra. Adriana Varela",
    "valoración médica Pereira",
    "consulta médica Pereira",
  ],
  index: false,
});

export default function BookingPage() {
  return (
    <>
      <SiteHeader />
      <main id="contenido" className="booking-page">
        <section className="booking-page-hero">
          <div className="section-shell booking-page-heading">
            <div>
              <p className="eyebrow">Agenda tu valoración</p>
              <h1>
                Un momento para
                <span>escucharte con atención.</span>
              </h1>
            </div>
            <p>
              Elige una opción, revisa la disponibilidad y separa tu espacio en
              pocos minutos. Los datos actuales son provisionales mientras se
              configura la agenda definitiva.
            </p>
          </div>
        </section>
        <section className="booking-experience section-pad">
          <div className="section-shell">
            <BookingScheduler />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
