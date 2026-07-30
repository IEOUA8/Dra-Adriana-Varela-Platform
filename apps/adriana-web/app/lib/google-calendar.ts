import { BOOKING_TIMEZONE } from "./booking-config";

type GoogleCalendarEnvironment = {
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  GOOGLE_REFRESH_TOKEN?: string;
  GOOGLE_CALENDAR_ID?: string;
};

type CalendarBooking = {
  id: string;
  reference: string;
  serviceName: string;
  slotStart: string;
  slotEnd: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
};

function getCalendarEnvironment() {
  return {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_CALENDAR_ID: process.env.GOOGLE_CALENDAR_ID,
  } satisfies GoogleCalendarEnvironment;
}

export function isGoogleCalendarConfigured() {
  const calendarEnv = getCalendarEnvironment();
  return Boolean(
    calendarEnv.GOOGLE_CLIENT_ID &&
      calendarEnv.GOOGLE_CLIENT_SECRET &&
      calendarEnv.GOOGLE_REFRESH_TOKEN &&
      calendarEnv.GOOGLE_CALENDAR_ID,
  );
}

async function getGoogleAccessToken() {
  const calendarEnv = getCalendarEnvironment();
  if (!isGoogleCalendarConfigured()) {
    throw new Error("Google Calendar todavía no está configurado.");
  }

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: calendarEnv.GOOGLE_CLIENT_ID!,
      client_secret: calendarEnv.GOOGLE_CLIENT_SECRET!,
      refresh_token: calendarEnv.GOOGLE_REFRESH_TOKEN!,
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok) {
    throw new Error("No fue posible autorizar Google Calendar.");
  }

  const payload = (await response.json()) as { access_token?: string };
  if (!payload.access_token) {
    throw new Error("Google Calendar no devolvió un acceso válido.");
  }

  return payload.access_token;
}

export async function getGoogleBusyWindows(timeMin: string, timeMax: string) {
  if (!isGoogleCalendarConfigured()) {
    return [];
  }

  const calendarEnv = getCalendarEnvironment();
  const accessToken = await getGoogleAccessToken();
  const response = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      timeMin,
      timeMax,
      timeZone: BOOKING_TIMEZONE,
      items: [{ id: calendarEnv.GOOGLE_CALENDAR_ID }],
    }),
  });

  if (!response.ok) {
    throw new Error("No fue posible consultar la disponibilidad del calendario.");
  }

  const payload = (await response.json()) as {
    calendars?: Record<string, { busy?: Array<{ start: string; end: string }> }>;
  };

  return (
    payload.calendars?.[calendarEnv.GOOGLE_CALENDAR_ID!]?.busy?.map((window) => ({
      start: window.start,
      end: window.end,
    })) ?? []
  );
}

export async function createGoogleCalendarEvent(booking: CalendarBooking) {
  if (!isGoogleCalendarConfigured()) {
    return null;
  }

  const calendarEnv = getCalendarEnvironment();
  const accessToken = await getGoogleAccessToken();
  const endpoint = new URL(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
      calendarEnv.GOOGLE_CALENDAR_ID!,
    )}/events`,
  );
  endpoint.searchParams.set("sendUpdates", "all");

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      summary: `${booking.serviceName} · ${booking.patientName}`,
      description: [
        `Reserva web ${booking.reference}`,
        `Paciente: ${booking.patientName}`,
        `Teléfono: ${booking.patientPhone}`,
      ].join("\n"),
      start: {
        dateTime: booking.slotStart,
        timeZone: BOOKING_TIMEZONE,
      },
      end: {
        dateTime: booking.slotEnd,
        timeZone: BOOKING_TIMEZONE,
      },
      attendees: [
        {
          email: booking.patientEmail,
          displayName: booking.patientName,
          responseStatus: "needsAction",
        },
      ],
      guestsCanInviteOthers: false,
      guestsCanModify: false,
      guestsCanSeeOtherGuests: false,
      reminders: { useDefault: true },
      extendedProperties: {
        private: {
          bookingId: booking.id,
          bookingReference: booking.reference,
          source: "dra-adriana-web",
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error("No fue posible crear el evento en Google Calendar.");
  }

  return (await response.json()) as { id: string; htmlLink?: string };
}
