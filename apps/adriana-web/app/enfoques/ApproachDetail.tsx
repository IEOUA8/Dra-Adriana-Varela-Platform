import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import type { MedicalApproach } from "../content/services";

type PhilosophyPillar = {
  tagline: string;
  paragraphs: readonly string[];
};

export function ApproachDetail({
  approach,
  philosophy,
}: {
  approach: MedicalApproach;
  philosophy: PhilosophyPillar;
}) {
  return (
    <>
      <SiteHeader />
      <main id="contenido">
        <section className={`approach-page-hero approach-page-${approach.number}`}>
          <div className="section-shell">
            <nav className="breadcrumbs" aria-label="Migas de pan">
              <Link href="/">Inicio</Link>
              <span aria-hidden="true">/</span>
              <Link href="/#enfoques">Enfoques</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{approach.title}</span>
            </nav>

            <div className="approach-page-hero-grid">
              <div>
                <p className="eyebrow">Enfoque médico</p>
                <h1>{approach.title}</h1>
                <p className="approach-page-tagline">{philosophy.tagline}</p>
                <p className="approach-page-lead">{philosophy.paragraphs[0]}</p>
              </div>
              <aside className="approach-index">
                <div>
                  <small>Atención personalizada</small>
                  <strong>Valoración individual</strong>
                  <p>La pertinencia se define durante una valoración.</p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="service-catalog section-pad" aria-labelledby="service-catalog-title">
          <div className="section-shell">
            <div className="service-catalog-heading">
              <div>
                <p className="eyebrow">Servicios del enfoque</p>
                <h2 id="service-catalog-title">Explora según lo que quieres cuidar.</h2>
              </div>
              <div className="clinical-content-note">
                <span aria-hidden="true">i</span>
                <p>
                  La selección de cualquier servicio requiere valoración médica,
                  revisión de antecedentes y definición de objetivos
                  individuales.
                </p>
              </div>
            </div>

            <div className="service-groups">
              {approach.groups.map((group, groupIndex) => (
                <section key={group.heading} aria-labelledby={`group-${groupIndex}`}>
                  <div className="service-group-heading">
                    <h2 id={`group-${groupIndex}`}>{group.heading}</h2>
                  </div>
                  <ul className="service-list">
                    {group.services.map((service) => (
                      <li key={service.slug}>
                        <h3>{service.name}</h3>
                        <small>Valoración individual</small>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="approach-philosophy section-pad">
          <div className="section-shell approach-philosophy-grid">
            <div>
              <p className="eyebrow">La mirada de la doctora</p>
              <h2>{philosophy.tagline}</h2>
            </div>
            <div>
              {philosophy.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <Link className="text-link text-link-light" href="/sobre-mi#philosophy-title">
                Conocer mi filosofía <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="booking section-pad">
          <div className="section-shell booking-panel">
            <div>
              <p className="eyebrow">Valoración individual</p>
              <h2>Un servicio no es una recomendación automática.</h2>
            </div>
            <div className="booking-action">
              <p>
                La valoración permite conversar sobre tus objetivos y definir
                si alguna alternativa puede ser pertinente.
              </p>
              <Link className="button" href="/agendar">
                Solicitar valoración <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
