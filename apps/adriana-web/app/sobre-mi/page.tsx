import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { doctorProfile } from "../content/doctor";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Conoce la formación, trayectoria profesional y rol de la Dra. Adriana Varela Nariño en Canorá Medical.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main id="contenido">
        <section className="profile-hero">
          <div className="section-shell">
            <nav className="breadcrumbs" aria-label="Migas de pan">
              <Link href="/">Inicio</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Sobre mí</span>
            </nav>

            <div className="profile-hero-grid">
              <div>
                <p className="eyebrow">Dra. Adriana Varela Nariño</p>
                <h1>
                  Ciencia y naturalidad
                  <span>con una mirada integral.</span>
                </h1>
                <p className="profile-lead">
                  {doctorProfile.summary} Su práctica conecta formación médica,
                  actualización y una visión personalizada del bienestar.
                </p>
                <div className="profile-tags" aria-label="Áreas de enfoque">
                  <span>Medicina regenerativa</span>
                  <span>Medicina funcional</span>
                  <span>Medicina estética</span>
                </div>
                <div className="profile-actions">
                  <a className="button" href="#filosofia">
                    Conocer mi filosofía <span aria-hidden="true">↓</span>
                  </a>
                  <Link className="text-link" href="/agendar">
                    Agendar valoración <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>

              <div className="profile-portrait">
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/dra-adriana-profile.jpeg"
                    alt="Dra. Adriana Varela, médica cirujana"
                    width="1101"
                    height="1428"
                    fetchPriority="high"
                    decoding="async"
                  />
                </div>
                <aside>
                  <small>Ubicación</small>
                  <strong>{doctorProfile.location}</strong>
                  <small>Rol actual</small>
                  <strong>CEO · Canorá Medical</strong>
                </aside>
              </div>
            </div>

            <dl className="profile-facts" aria-label="Perfil profesional">
              <div>
                <dt>Trayectoria médica</dt>
                <dd>Desde 2011</dd>
              </div>
              <div>
                <dt>Visión clínica</dt>
                <dd>3 pilares integrados</dd>
              </div>
              <div>
                <dt>Práctica profesional</dt>
                <dd>Pereira, Colombia</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="profile-intro section-pad" aria-labelledby="profile-story">
          <div className="section-shell profile-intro-grid">
            <div>
              <p className="eyebrow">Trayectoria</p>
              <h2 id="profile-story">
                Una formación que integra distintas formas de comprender el
                bienestar.
              </h2>
            </div>
            <div className="profile-prose profile-story-cards">
              <article>
                <div>
                  <p className="story-kicker">El punto de partida</p>
                  <h3>Una base médica rigurosa.</h3>
                  <p>
                    Adriana Varela Nariño obtuvo su título de Médica Cirujana en
                    la Universidad Nacional de Colombia en 2011. Su recorrido
                    incluye un internado especial en dermato-oncología.
                  </p>
                </div>
              </article>
              <article>
                <div>
                  <p className="story-kicker">Una mirada que evoluciona</p>
                  <h3>Formación conectada con la persona.</h3>
                  <p>
                    Sus estudios en medicina estética, tecnologías basadas en
                    energía, medicina funcional y medicina biorreguladora
                    amplían la forma de comprender el bienestar y acompañar
                    decisiones responsables.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section
          className="philosophy-section section-pad"
          id="filosofia"
          aria-labelledby="philosophy-title"
        >
          <div className="section-shell">
            <div className="philosophy-opening">
              <div>
                <p className="eyebrow">Mi filosofía</p>
                <h2 id="philosophy-title">
                  {doctorProfile.philosophy.headline}
                </h2>
              </div>
              <div className="philosophy-declaration">
                {doctorProfile.philosophy.introduction.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="philosophy-pillars">
              {doctorProfile.philosophy.pillars.map((pillar) => (
                <article key={pillar.title}>
                  <div className="philosophy-pillar-heading">
                    <div>
                      <p>{pillar.title}</p>
                      <h3>{pillar.tagline}</h3>
                    </div>
                  </div>
                  <div className="philosophy-pillar-copy">
                    {pillar.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="credentials section-pad" aria-labelledby="credentials-title">
          <div className="section-shell credentials-grid">
            <div className="credentials-heading">
              <p className="eyebrow">Formación académica</p>
              <h2 id="credentials-title">Estudio, actualización y criterio.</h2>
              <p>
                Una trayectoria de formación continua que conecta práctica
                médica, actualización y criterio.
              </p>
              <div className="credentials-summary" aria-hidden="true">
                <strong>{doctorProfile.credentials.length}</strong>
                <span>hitos de formación y actualización</span>
              </div>
            </div>

            <ul className="credential-list">
              {doctorProfile.credentials.map((credential) => (
                <li key={`${credential.title}-${credential.institution}`}>
                  <div>
                    <h3>{credential.title}</h3>
                    <p>{credential.institution}</p>
                  </div>
                  <small>{credential.year ?? "Formación complementaria"}</small>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="professional-presence section-pad" aria-labelledby="presence-title">
          <div className="section-shell">
            <div className="section-heading heading-split">
              <div>
                <p className="eyebrow">Presencia profesional</p>
                <h2 id="presence-title">Participación y comunidad médica.</h2>
              </div>
              <p>
                Espacios de intercambio, actualización y participación dentro
                de la comunidad médica.
              </p>
            </div>

            <div className="role-grid">
              {doctorProfile.professionalRoles.map((item) => (
                <article key={item.role}>
                  <p>{item.role}</p>
                  <h3>{item.organization}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="canora-leadership section-pad" aria-labelledby="canora-title">
          <div className="section-shell canora-leadership-grid">
            <div className="canora-mark" aria-hidden="true">
              C
            </div>
            <div>
              <p className="eyebrow">Liderazgo institucional</p>
              <h2 id="canora-title">
                CEO de
                <span>Canorá Medical.</span>
              </h2>
              <p>{doctorProfile.leadership.description}</p>
              <a className="button button-light" href="https://canoramedical.com/">
                Conocer Canorá Medical <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="booking section-pad">
          <div className="section-shell booking-panel">
            <div>
              <p className="eyebrow">Una conversación personal</p>
              <h2>Conoce el método de valoración.</h2>
            </div>
            <div className="booking-action">
              <p>
                Descubre cómo se organizan la escucha, los objetivos, el plan y
                el seguimiento.
              </p>
              <Link className="button" href="/#metodo">
                Ver el método <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
