import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { doctorProfile } from "./content/doctor";
import { medicalApproaches } from "./content/services";
import { createPageMetadata, SITE_DESCRIPTION } from "./lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Medicina integral en Pereira",
  absoluteTitle: "Dra. Adriana Varela | Medicina integral en Pereira",
  description: SITE_DESCRIPTION,
  path: "/",
  keywords: [
    "Dra. Adriana Varela Pereira",
    "medicina integral en Pereira",
    "envejecer con salud",
    "medicina y naturalidad",
  ],
});

const needs = [
  {
    title: "Recuperar vitalidad",
    description:
      "Explorar hábitos, antecedentes y objetivos para comprender el bienestar de forma integral.",
  },
  {
    title: "Comprender desequilibrios",
    description:
      "Ordenar la información relevante antes de definir posibles pasos de acompañamiento.",
  },
  {
    title: "Cuidar la piel",
    description:
      "Abordar el cuidado de la piel desde la naturalidad, el contexto y la valoración individual.",
  },
  {
    title: "Envejecer con salud",
    description:
      "Construir una visión preventiva y consciente alrededor del paso del tiempo.",
  },
  {
    title: "Conservar la naturalidad",
    description:
      "Conversar sobre objetivos estéticos responsables sin perder rasgos e identidad.",
  },
  {
    title: "Recibir un plan personal",
    description:
      "Partir de una valoración para definir prioridades, expectativas y seguimiento.",
  },
];

const method = [
  {
    number: "01",
    title: "Escucha y antecedentes",
    description:
      "Comprendemos tu contexto, tus inquietudes y lo que esperas del proceso.",
  },
  {
    number: "02",
    title: "Valoración",
    description:
      "Revisamos la información necesaria para construir un criterio individual.",
  },
  {
    number: "03",
    title: "Definición de objetivos",
    description:
      "Acordamos prioridades y expectativas realistas antes de avanzar.",
  },
  {
    number: "04",
    title: "Plan personalizado",
    description:
      "Cuando sea pertinente, se propone una ruta adaptada a la valoración.",
  },
  {
    number: "05",
    title: "Seguimiento y ajustes",
    description:
      "La evolución se revisa para tomar decisiones responsables en cada etapa.",
  },
];

const resources = [
  {
    category: "Envejecimiento saludable",
    title: "¿Qué significa envejecer con consciencia?",
    description:
      "Una mirada práctica a la prevención, el bienestar y las decisiones informadas.",
  },
  {
    category: "Valoración médica",
    title: "Por qué un plan comienza con una conversación",
    description:
      "La escucha y el contexto individual como punto de partida del cuidado.",
  },
  {
    category: "Piel y naturalidad",
    title: "Cuidar la piel sin perder tu expresión",
    description:
      "Expectativas responsables, armonía y decisiones personalizadas.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="contenido">
        <section className="hero" id="inicio">
          <div className="section-shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                Medicina regenerativa · funcional · estética
              </p>
              <h1>
                Envejecer es natural.
                <span>Hacerlo con salud y consciencia es una decisión.</span>
              </h1>
              <p className="hero-lead">
                Un espacio para comprender tu bienestar, cuidar tu naturalidad y
                tomar decisiones acompañadas por una valoración médica
                individual.
              </p>
              <div className="hero-actions">
                <Link className="button" href="/agendar">
                  Agendar valoración
                  <span aria-hidden="true">↗</span>
                </Link>
                <a className="text-link" href="#enfoques">
                  Conocer mi enfoque
                  <span aria-hidden="true">↓</span>
                </a>
              </div>

              <ul className="trust-list" aria-label="Principios del enfoque">
                <li>Valoración individual</li>
                <li>Criterio médico</li>
                <li>Acompañamiento</li>
              </ul>
            </div>

            <div className="hero-visual">
              <div className="portrait-stage">
                <div className="portrait-orbit" aria-hidden="true" />
                <div className="portrait-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/dra-adriana-hero.jpeg"
                    alt="Retrato de la Dra. Adriana Varela"
                    width="1086"
                    height="1448"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <p className="portrait-signature">
                    Dra. Adriana Varela
                    <span>Medicina integral</span>
                  </p>
                </div>
                <div className="floating-note floating-note-top">
                  Ciencia
                </div>
                <div className="floating-note floating-note-bottom">
                  Naturalidad
                </div>
              </div>
              <p className="visual-caption">
                <span>Una mirada integral</span>
                Bienestar contemporáneo con precisión clínica.
              </p>
            </div>
          </div>
        </section>

        <section className="needs section-pad" aria-labelledby="needs-title">
          <div className="section-shell">
            <div className="section-heading heading-split">
              <div>
                <p className="eyebrow">Empezar por lo que necesitas</p>
                <h2 id="needs-title">Tu inquietud también hace parte de la historia.</h2>
              </div>
              <p>
                No necesitas llegar con todas las respuestas. Estas rutas ayudan
                a reconocer qué te gustaría comprender o cuidar.
              </p>
            </div>

            <div className="needs-grid">
              {needs.map((need) => (
                <article className="need-card" key={need.title}>
                  <h3>{need.title}</h3>
                  <p>{need.description}</p>
                  <a href="#enfoques" aria-label={`Explorar ${need.title}`}>
                    Explorar ruta <span aria-hidden="true">→</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="approaches section-pad" id="enfoques" aria-labelledby="approaches-title">
          <div className="section-shell">
            <div className="section-heading approaches-heading">
              <p className="eyebrow">Tres enfoques, una conversación</p>
              <h2 id="approaches-title">
                Mirar a la persona antes que al procedimiento.
              </h2>
              <p>
                Cada enfoque aporta una perspectiva diferente. La valoración
                permite entender cuál puede ser pertinente y cuáles son sus
                límites.
              </p>
            </div>

            <div className="approach-grid">
              {doctorProfile.philosophy.pillars.map((approach, index) => (
                <article className="approach-card" key={approach.title}>
                  <div className="approach-topline">
                    <span>Enfoque médico</span>
                  </div>
                  <h3>{approach.title}</h3>
                  <p>{approach.paragraphs[0]}</p>
                  <div className="approach-detail">
                    <p>{approach.paragraphs[1]}</p>
                  </div>
                  <Link href={`/enfoques/${medicalApproaches[index].slug}`}>
                    Explorar enfoque <span aria-hidden="true">↗</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="method section-pad" id="metodo" aria-labelledby="method-title">
          <div className="section-shell method-grid">
            <div className="method-intro">
              <p className="eyebrow">Método de valoración</p>
              <h2 id="method-title">Escuchar, comprender y decidir con criterio.</h2>
              <p>
                Un proceso organizado ayuda a convertir una inquietud en
                objetivos claros, sin presentar el acompañamiento como garantía
                de resultado.
              </p>
              <Link className="text-link" href="/agendar">
                Conocer el proceso completo <span aria-hidden="true">→</span>
              </Link>
            </div>

            <ol className="method-list">
              {method.map((step) => (
                <li key={step.number}>
                  <span>{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="about section-pad" id="sobre-mi" aria-labelledby="about-title">
          <div className="section-shell about-grid">
            <div className="about-visual">
              <div className="about-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/dra-adriana-editorial.jpeg"
                  alt="Dra. Adriana Varela en retrato editorial"
                  width="1023"
                  height="1537"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p>Ciencia · naturalidad · criterio</p>
            </div>
            <div className="about-copy">
              <p className="eyebrow">Sobre la doctora</p>
              <h2 id="about-title">
                {doctorProfile.fullName}, una mirada médica integral.
              </h2>
              <p className="about-lead">
                {doctorProfile.summary} Actualmente lidera Canorá Medical en{" "}
                {doctorProfile.location}.
              </p>
              <div className="pending-panel">
                <span>Trayectoria profesional</span>
                <ul>
                  <li>Médica Cirujana — Universidad Nacional de Colombia, 2011</li>
                  <li>Formación en medicina estética y funcional</li>
                  <li>Speaker y conferencista en espacios del sector</li>
                  <li>CEO de Canorá Medical</li>
                </ul>
              </div>
              <Link className="button button-light" href="/sobre-mi">
                Conocer su trayectoria
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="treatments section-pad" aria-labelledby="treatments-title">
          <div className="section-shell">
            <div className="section-heading heading-split">
              <div>
                <p className="eyebrow">Servicios médicos</p>
                <h2 id="treatments-title">Explora las opciones por enfoque.</h2>
              </div>
              <p>
                Cada enfoque reúne alternativas que se consideran de manera
                individual. La valoración permite definir pertinencia,
                objetivos y cuidados.
              </p>
            </div>
            <div className="service-overview-grid">
              {medicalApproaches.map((approach) => {
                const services = approach.groups.flatMap(
                  (group) => group.services,
                );
                const remaining = services.length - 4;

                return (
                  <article className="service-overview-card" key={approach.slug}>
                    <div>
                      <small>Servicios del enfoque</small>
                    </div>
                    <h3>{approach.title}</h3>
                    <ul>
                      {services.slice(0, 4).map((service) => (
                        <li key={service.slug}>{service.name}</li>
                      ))}
                    </ul>
                    {remaining > 0 && <p>Y {remaining} servicios más</p>}
                    <Link href={`/enfoques/${approach.slug}`}>
                      Ver servicios <span aria-hidden="true">→</span>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="resources section-pad" id="recursos" aria-labelledby="resources-title">
          <div className="section-shell">
            <div className="section-heading resources-heading">
              <div>
                <p className="eyebrow">Recursos para decidir mejor</p>
                <h2 id="resources-title">Aprender también es parte del cuidado.</h2>
              </div>
              <p>
                Ideas esenciales para comprender mejor el bienestar, la
                valoración y el cuidado de la piel.
              </p>
            </div>

            <div className="resource-grid">
              {resources.map((resource, index) => (
                <article className="resource-card" key={resource.title}>
                  <div
                    className={`resource-art resource-art-${index + 1}`}
                    aria-hidden="true"
                  />
                  <div className="resource-copy">
                    <p>{resource.category}</p>
                    <h3>{resource.title}</h3>
                    <span>{resource.description}</span>
                    <small>Orientación general</small>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="faq section-pad" aria-labelledby="faq-title">
          <div className="section-shell faq-grid">
            <div className="faq-intro">
              <p className="eyebrow">Preguntas frecuentes</p>
              <h2 id="faq-title">Antes de dar el siguiente paso.</h2>
              <p>
                Estas respuestas son generales y no reemplazan una valoración
                médica.
              </p>
            </div>
            <div className="faq-list">
              <details>
                <summary>
                  ¿Por qué necesito una valoración?
                  <span aria-hidden="true">+</span>
                </summary>
                <p>
                  Porque los antecedentes, objetivos y expectativas cambian de
                  una persona a otra. La valoración ayuda a definir pertinencia y
                  próximos pasos.
                </p>
              </details>
              <details>
                <summary>
                  ¿La información del sitio reemplaza una consulta?
                  <span aria-hidden="true">+</span>
                </summary>
                <p>
                  No. El contenido es educativo y general; no constituye
                  diagnóstico, prescripción ni recomendación individual.
                </p>
              </details>
              <details>
                <summary>
                  ¿Los resultados son iguales para todas las personas?
                  <span aria-hidden="true">+</span>
                </summary>
                <p>
                  No. La respuesta puede variar según múltiples factores y nunca
                  debe presentarse como un resultado garantizado.
                </p>
              </details>
              <details>
                <summary>
                  ¿Dónde se realiza la atención?
                  <span aria-hidden="true">+</span>
                </summary>
                <p>
                  La atención institucional se encuentra en Pereira, Colombia.
                  La disponibilidad y los canales de contacto se coordinan
                  directamente con Canorá Medical.
                </p>
              </details>
            </div>
          </div>
        </section>

        <section className="booking section-pad" id="agendar" aria-labelledby="booking-title">
          <div className="section-shell booking-panel">
            <div>
              <p className="eyebrow">Tu valoración empieza con una conversación</p>
              <h2 id="booking-title">Cuando estés listo, estaremos aquí para escucharte.</h2>
            </div>
            <div className="booking-action">
              <p>
                Consulta la disponibilidad de valoración directamente con el
                equipo de Canorá Medical en Pereira.
              </p>
              <Link className="button" href="/agendar">
                Ver horarios disponibles <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
