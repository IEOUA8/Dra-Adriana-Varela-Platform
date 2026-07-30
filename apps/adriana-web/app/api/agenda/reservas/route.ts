import {
  BOOKING_TIMEZONE,
  BOOKING_WINDOW_DAYS,
  BOOKING_MIN_NOTICE_MINUTES,
  findBookingService,
} from "../../../lib/booking-config";
import {
  createAppointment,
  getReservedSlots,
  attachCalendarEvent,
  releaseAppointment,
} from "../../../lib/booking-db";
import {
  buildGenericSlotsForDate,
  getBogotaToday,
  overlaps,
  parseDateKey,
  addDays,
  formatDateKey,
} from "../../../lib/booking-time";
import {
  createGoogleCalendarEvent,
  getGoogleBusyWindows,
  isGoogleCalendarConfigured,
} from "../../../lib/google-calendar";

type BookingPayload = {
  serviceId?: string;
  slotStart?: string;
  patientName?: string;
  patientEmail?: string;
  patientPhone?: string;
  consent?: boolean;
  website?: string;
};

function normalize(value: string | undefined, maximum: number) {
  return value?.trim().slice(0, maximum) ?? "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function buildReference() {
  return `AV-${crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase()}`;
}

async function hashToken(token: string) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(token),
  );
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(request: Request) {
  let appointmentId: string | null = null;

  try {
    const payload = (await request.json()) as BookingPayload;
    if (payload.website) {
      return Response.json({ ok: true }, { status: 201 });
    }

    const service = findBookingService(payload.serviceId ?? "");
    const patientName = normalize(payload.patientName, 100);
    const patientEmail = normalize(payload.patientEmail, 160).toLowerCase();
    const patientPhone = normalize(payload.patientPhone, 40);
    const slotStart = normalize(payload.slotStart, 40);

    if (!service) {
      return Response.json({ error: "Selecciona un tipo de cita." }, { status: 400 });
    }
    if (patientName.length < 3) {
      return Response.json({ error: "Ingresa el nombre completo." }, { status: 400 });
    }
    if (!isEmail(patientEmail)) {
      return Response.json({ error: "Ingresa un correo válido." }, { status: 400 });
    }
    if (patientPhone.replace(/\D/g, "").length < 7) {
      return Response.json({ error: "Ingresa un teléfono válido." }, { status: 400 });
    }
    if (!payload.consent) {
      return Response.json(
        { error: "Debes aceptar el tratamiento de datos para reservar." },
        { status: 400 },
      );
    }

    const slotDate = slotStart.slice(0, 10);
    const todayKey = getBogotaToday();
    const lastDate = formatDateKey(
      addDays(parseDateKey(todayKey), BOOKING_WINDOW_DAYS),
    );

    if (!slotDate || slotDate < todayKey || slotDate >= lastDate) {
      return Response.json(
        { error: "La fecha seleccionada ya no está disponible." },
        { status: 409 },
      );
    }

    const validSlot = buildGenericSlotsForDate(slotDate, service).find(
      (slot) => slot.start === slotStart,
    );
    if (!validSlot) {
      return Response.json(
        { error: "El horario seleccionado no pertenece a la agenda disponible." },
        { status: 400 },
      );
    }

    if (
      new Date(validSlot.start).getTime() <
      Date.now() + BOOKING_MIN_NOTICE_MINUTES * 60_000
    ) {
      return Response.json(
        { error: "El horario seleccionado ya no cumple la anticipación mínima." },
        { status: 409 },
      );
    }

    const [reservedSlots, busyWindows] = await Promise.all([
      getReservedSlots(validSlot.start, validSlot.end),
      getGoogleBusyWindows(validSlot.start, validSlot.end),
    ]);

    if (reservedSlots.has(validSlot.start) || overlaps(validSlot, busyWindows)) {
      return Response.json(
        { error: "Ese horario acaba de ocuparse. Elige otro disponible." },
        { status: 409 },
      );
    }

    appointmentId = crypto.randomUUID();
    const reference = buildReference();
    const managementToken = crypto.randomUUID();
    const managementTokenHash = await hashToken(managementToken);
    const calendarConfigured = isGoogleCalendarConfigured();

    await createAppointment({
      id: appointmentId,
      reference,
      slotKey: `${validSlot.start}:active`,
      serviceId: service.id,
      serviceName: service.name,
      durationMinutes: service.durationMinutes,
      slotStart: validSlot.start,
      slotEnd: validSlot.end,
      timezone: BOOKING_TIMEZONE,
      patientName,
      patientEmail,
      patientPhone,
      managementTokenHash,
      calendarSyncStatus: calendarConfigured ? "pending" : "not_configured",
    });

    const calendarEvent = await createGoogleCalendarEvent({
      id: appointmentId,
      reference,
      serviceName: service.name,
      slotStart: validSlot.start,
      slotEnd: validSlot.end,
      patientName,
      patientEmail,
      patientPhone,
    });

    if (calendarEvent) {
      await attachCalendarEvent(
        appointmentId,
        calendarEvent.id,
        calendarEvent.htmlLink ?? null,
      );
    }

    return Response.json(
      {
        booking: {
          id: appointmentId,
          reference,
          service: service.name,
          start: validSlot.start,
          end: validSlot.end,
          timezone: BOOKING_TIMEZONE,
          patientName,
          patientEmail,
          managementToken,
        },
        integration: calendarConfigured ? "google_calendar" : "preview",
      },
      { status: 201 },
    );
  } catch (error) {
    if (appointmentId) {
      await releaseAppointment(appointmentId).catch(() => undefined);
    }

    const message =
      error instanceof Error ? error.message : "No fue posible completar la reserva.";
    const isConflict = message.includes("UNIQUE constraint failed");
    return Response.json(
      {
        error: isConflict
          ? "Ese horario acaba de ocuparse. Elige otro disponible."
          : message,
      },
      { status: isConflict ? 409 : 500 },
    );
  }
}
