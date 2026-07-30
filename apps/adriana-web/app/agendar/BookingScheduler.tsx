"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  BOOKING_SERVICES,
  BOOKING_TIMEZONE,
  type BookingService,
} from "../lib/booking-config";

type BookingSlot = {
  start: string;
  end: string;
  date: string;
  time: string;
  label: string;
};

type AvailabilityDay = {
  date: string;
  slots: BookingSlot[];
};

type BookingConfirmation = {
  reference: string;
  service: string;
  start: string;
  patientName: string;
  patientEmail: string;
};

const WEEKDAYS = ["L", "M", "M", "J", "V", "S", "D"];

function toDate(dateKey: string) {
  return new Date(`${dateKey}T12:00:00`);
}

function monthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function formatLongDate(dateKey: string) {
  return new Intl.DateTimeFormat("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: BOOKING_TIMEZONE,
  }).format(new Date(`${dateKey}T12:00:00-05:00`));
}

function formatConfirmationDate(dateTime: string) {
  return new Intl.DateTimeFormat("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: BOOKING_TIMEZONE,
  }).format(new Date(dateTime));
}

function getMonthCells(month: Date) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const leading = (first.getDay() + 6) % 7;
  const total = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();

  return [
    ...Array.from({ length: leading }, () => null),
    ...Array.from({ length: total }, (_, index) => {
      const date = new Date(month.getFullYear(), month.getMonth(), index + 1);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0",
      )}-${String(date.getDate()).padStart(2, "0")}`;
    }),
  ];
}

export function BookingScheduler() {
  const [serviceId, setServiceId] = useState(BOOKING_SERVICES[0].id);
  const [days, setDays] = useState<AvailabilityDay[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<BookingSlot | null>(null);
  const [visibleMonth, setVisibleMonth] = useState(() => new Date());
  const [integration, setIntegration] = useState<"preview" | "google_calendar">(
    "preview",
  );
  const [bookingEnabled, setBookingEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] =
    useState<BookingConfirmation | null>(null);
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [consent, setConsent] = useState(false);

  const selectedService =
    BOOKING_SERVICES.find((service) => service.id === serviceId) ??
    BOOKING_SERVICES[0];

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/agenda/disponibilidad?service=${encodeURIComponent(serviceId)}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        const payload = (await response.json()) as {
          days?: AvailabilityDay[];
          integration?: "preview" | "google_calendar";
          bookingEnabled?: boolean;
          error?: string;
        };
        if (!response.ok) {
          throw new Error(payload.error ?? "No fue posible cargar los horarios.");
        }
        return payload;
      })
      .then((payload) => {
        const availableDays = payload.days ?? [];
        setDays(availableDays);
        setIntegration(payload.integration ?? "preview");
        setBookingEnabled(payload.bookingEnabled ?? true);
        if (availableDays[0]) {
          setSelectedDate(availableDays[0].date);
          const firstDate = toDate(availableDays[0].date);
          setVisibleMonth(new Date(firstDate.getFullYear(), firstDate.getMonth(), 1));
        }
      })
      .catch((requestError: unknown) => {
        if (requestError instanceof DOMException && requestError.name === "AbortError") {
          return;
        }
        setError(
          requestError instanceof Error
            ? requestError.message
            : "No fue posible cargar los horarios.",
        );
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [serviceId]);

  const availability = useMemo(
    () => new Map(days.map((day) => [day.date, day.slots])),
    [days],
  );
  const monthCells = useMemo(() => getMonthCells(visibleMonth), [visibleMonth]);
  const selectedDaySlots = availability.get(selectedDate) ?? [];
  const availableMonthKeys = days.map((day) => day.date.slice(0, 7));
  const firstMonth = availableMonthKeys[0];
  const lastMonth = availableMonthKeys.at(-1);
  const currentMonthKey = monthKey(visibleMonth);

  function chooseService(service: BookingService) {
    if (submitting || service.id === serviceId) return;
    setLoading(true);
    setError("");
    setSelectedDate("");
    setSelectedSlot(null);
    setServiceId(service.id);
    setConfirmation(null);
  }

  function chooseDate(dateKey: string) {
    if (!availability.has(dateKey)) return;
    setSelectedDate(dateKey);
    setSelectedSlot(null);
    setError("");
  }

  function changeMonth(direction: number) {
    setVisibleMonth(
      (current) => new Date(current.getFullYear(), current.getMonth() + direction, 1),
    );
    setSelectedSlot(null);
  }

  async function submitBooking(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedSlot) {
      setError("Selecciona una fecha y un horario.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/agenda/reservas", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          serviceId,
          slotStart: selectedSlot.start,
          patientName,
          patientEmail,
          patientPhone,
          consent,
          website: "",
        }),
      });
      const payload = (await response.json()) as {
        booking?: BookingConfirmation;
        integration?: "preview" | "google_calendar";
        error?: string;
      };

      if (!response.ok || !payload.booking) {
        throw new Error(payload.error ?? "No fue posible completar la reserva.");
      }

      setConfirmation(payload.booking);
      setIntegration(payload.integration ?? integration);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "No fue posible completar la reserva.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmation) {
    return (
      <section className="booking-confirmation" aria-live="polite">
        <div className="confirmation-mark" aria-hidden="true">
          ✓
        </div>
        <p className="eyebrow">Reserva registrada</p>
        <h2>Tu espacio quedó separado.</h2>
        <p>
          Gracias, {confirmation.patientName}. Conserva esta referencia para
          cualquier cambio.
        </p>
        <dl>
          <div>
            <dt>Referencia</dt>
            <dd>{confirmation.reference}</dd>
          </div>
          <div>
            <dt>Cita</dt>
            <dd>{confirmation.service}</dd>
          </div>
          <div>
            <dt>Fecha y hora</dt>
            <dd>{formatConfirmationDate(confirmation.start)}</dd>
          </div>
          <div>
            <dt>Correo</dt>
            <dd>{confirmation.patientEmail}</dd>
          </div>
        </dl>
        {integration === "preview" ? (
          <div className="booking-notice booking-notice-preview">
            <strong>Modo de configuración</strong>
            <p>
              Esta reserva quedó guardada como prueba. Los correos automáticos se
              activarán al conectar el calendario de la doctora.
            </p>
          </div>
        ) : (
          <div className="booking-notice">
            <strong>Revisa tu correo</strong>
            <p>Google Calendar envió la invitación y los datos de la reserva.</p>
          </div>
        )}
        <Link className="button" href="/">
          Volver al inicio <span aria-hidden="true">→</span>
        </Link>
      </section>
    );
  }

  if (!loading && !bookingEnabled) {
    return (
      <section className="booking-confirmation" aria-live="polite">
        <div className="confirmation-mark" aria-hidden="true">
          ·
        </div>
        <p className="eyebrow">Agenda en activación</p>
        <h2>Las reservas online estarán disponibles próximamente.</h2>
        <p>
          Estamos terminando la conexión segura de la agenda. Esta página no
          solicitará ni almacenará tus datos hasta que el sistema esté listo.
        </p>
        <Link className="button" href="/">
          Volver al inicio <span aria-hidden="true">→</span>
        </Link>
      </section>
    );
  }

  return (
    <div className="scheduler-shell">
      <div className="scheduler-progress" aria-label="Progreso de la reserva">
        <span className="is-active">Cita</span>
        <span className={selectedSlot ? "is-active" : ""}>Horario</span>
        <span className={patientName ? "is-active" : ""}>Tus datos</span>
      </div>

      <div className="scheduler-grid">
        <div className="scheduler-main">
          {integration === "preview" && (
            <div className="booking-notice booking-notice-preview">
              <strong>Agenda en configuración</strong>
              <p>
                Servicios y horarios provisionales. Puedes completar reservas de
                prueba mientras conectamos Google Calendar.
              </p>
            </div>
          )}

          <section className="scheduler-step" aria-labelledby="service-step-title">
            <div className="scheduler-step-heading">
              <span>01</span>
              <div>
                <p>Tipo de cita</p>
                <h2 id="service-step-title">¿Cómo podemos acompañarte?</h2>
              </div>
            </div>
            <div className="booking-service-list">
              {BOOKING_SERVICES.map((service) => (
                <button
                  type="button"
                  key={service.id}
                  className={service.id === serviceId ? "is-selected" : ""}
                  onClick={() => chooseService(service)}
                  aria-pressed={service.id === serviceId}
                >
                  <span className="service-radio" aria-hidden="true" />
                  <span>
                    <strong>{service.name}</strong>
                    <small>{service.description}</small>
                  </span>
                  <span className="service-meta">
                    {service.durationMinutes} min
                    <small>{service.modality}</small>
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="scheduler-step" aria-labelledby="date-step-title">
            <div className="scheduler-step-heading">
              <span>02</span>
              <div>
                <p>Fecha y horario</p>
                <h2 id="date-step-title">Elige el momento que prefieras.</h2>
              </div>
            </div>

            {loading ? (
              <div className="scheduler-loading" role="status">
                <span aria-hidden="true" />
                Consultando disponibilidad…
              </div>
            ) : (
              <div className="calendar-time-grid">
                <div className="booking-calendar">
                  <div className="calendar-heading">
                    <button
                      type="button"
                      onClick={() => changeMonth(-1)}
                      disabled={currentMonthKey === firstMonth}
                      aria-label="Mes anterior"
                    >
                      ←
                    </button>
                    <strong>
                      {new Intl.DateTimeFormat("es-CO", {
                        month: "long",
                        year: "numeric",
                      }).format(visibleMonth)}
                    </strong>
                    <button
                      type="button"
                      onClick={() => changeMonth(1)}
                      disabled={currentMonthKey === lastMonth}
                      aria-label="Mes siguiente"
                    >
                      →
                    </button>
                  </div>
                  <div className="calendar-weekdays" aria-hidden="true">
                    {WEEKDAYS.map((day, index) => (
                      <span key={`${day}-${index}`}>{day}</span>
                    ))}
                  </div>
                  <div className="calendar-days">
                    {monthCells.map((dateKey, index) =>
                      dateKey ? (
                        <button
                          type="button"
                          key={dateKey}
                          disabled={!availability.has(dateKey)}
                          className={dateKey === selectedDate ? "is-selected" : ""}
                          onClick={() => chooseDate(dateKey)}
                          aria-label={`${formatLongDate(dateKey)}${
                            availability.has(dateKey) ? ", disponible" : ", no disponible"
                          }`}
                          aria-pressed={dateKey === selectedDate}
                        >
                          {Number(dateKey.slice(-2))}
                          {availability.has(dateKey) && (
                            <span className="availability-dot" aria-hidden="true" />
                          )}
                        </button>
                      ) : (
                        <span key={`empty-${index}`} />
                      ),
                    )}
                  </div>
                  <p className="calendar-legend">
                    <span aria-hidden="true" /> Días con disponibilidad
                  </p>
                </div>

                <div className="booking-times">
                  <p>
                    {selectedDate
                      ? formatLongDate(selectedDate)
                      : "Selecciona una fecha"}
                  </p>
                  {selectedDaySlots.length > 0 ? (
                    <div>
                      {selectedDaySlots.map((slot) => (
                        <button
                          type="button"
                          key={slot.start}
                          className={
                            slot.start === selectedSlot?.start ? "is-selected" : ""
                          }
                          onClick={() => {
                            setSelectedSlot(slot);
                            setError("");
                          }}
                          aria-pressed={slot.start === selectedSlot?.start}
                        >
                          {slot.label}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <small>Elige un día disponible en el calendario.</small>
                  )}
                  <small>Hora de Colombia · GMT−5</small>
                </div>
              </div>
            )}
          </section>

          <section className="scheduler-step" aria-labelledby="details-step-title">
            <div className="scheduler-step-heading">
              <span>03</span>
              <div>
                <p>Datos de contacto</p>
                <h2 id="details-step-title">¿A nombre de quién reservamos?</h2>
              </div>
            </div>
            <form className="booking-form" onSubmit={submitBooking}>
              <label>
                Nombre completo
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={patientName}
                  onChange={(event) => setPatientName(event.target.value)}
                  placeholder="Tu nombre y apellido"
                  minLength={3}
                  required
                />
              </label>
              <div className="booking-form-row">
                <label>
                  Correo electrónico
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={patientEmail}
                    onChange={(event) => setPatientEmail(event.target.value)}
                    placeholder="nombre@correo.com"
                    required
                  />
                </label>
                <label>
                  Teléfono
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    value={patientPhone}
                    onChange={(event) => setPatientPhone(event.target.value)}
                    placeholder="+57 300 000 0000"
                    required
                  />
                </label>
              </div>
              <label className="booking-honeypot" aria-hidden="true">
                Sitio web
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
              <label className="booking-consent">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  required
                />
                <span>
                  Autorizo el tratamiento de mis datos para gestionar esta
                  solicitud de cita. No se solicitan datos clínicos en este paso.
                </span>
              </label>
              {error && (
                <p className="booking-error" role="alert">
                  {error}
                </p>
              )}
              <button
                className="button booking-submit"
                type="submit"
                disabled={submitting || loading || !selectedSlot}
              >
                {submitting
                  ? "Confirmando…"
                  : integration === "preview"
                    ? "Registrar reserva de prueba"
                    : "Confirmar reserva"}
                {!submitting && <span aria-hidden="true">→</span>}
              </button>
            </form>
          </section>
        </div>

        <aside className="booking-summary" aria-label="Resumen de la reserva">
          <p className="eyebrow">Tu reserva</p>
          <h2>Resumen</h2>
          <dl>
            <div>
              <dt>Tipo de cita</dt>
              <dd>{selectedService.name}</dd>
            </div>
            <div>
              <dt>Duración</dt>
              <dd>{selectedService.durationMinutes} minutos</dd>
            </div>
            <div>
              <dt>Modalidad</dt>
              <dd>{selectedService.modality}</dd>
            </div>
            <div>
              <dt>Fecha</dt>
              <dd>
                {selectedDate ? formatLongDate(selectedDate) : "Por seleccionar"}
              </dd>
            </div>
            <div>
              <dt>Hora</dt>
              <dd>{selectedSlot?.label ?? "Por seleccionar"}</dd>
            </div>
          </dl>
          <div className="summary-security">
            <span aria-hidden="true">✓</span>
            <p>
              Tu horario se verifica nuevamente antes de confirmar para evitar
              reservas duplicadas.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
