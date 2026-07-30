import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { BookingScheduler } from "./BookingScheduler";

export const metadata: Metadata = {
  title: "Agendar valoración",
  description:
    "Selecciona el tipo de valoración, consulta horarios disponibles y registra tu cita con la Dra. Adriana Varela.",
};

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

