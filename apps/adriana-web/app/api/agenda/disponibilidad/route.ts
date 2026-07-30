import {
  BOOKING_SERVICES,
  BOOKING_MIN_NOTICE_MINUTES,
  BOOKING_TIMEZONE,
  BOOKING_WINDOW_DAYS,
  findBookingService,
} from "../../../lib/booking-config";
import { getReservedSlots } from "../../../lib/booking-db";
import {
  addDays,
  buildGenericSlotsForDate,
  formatDateKey,
  getBogotaToday,
  overlaps,
  parseDateKey,
} from "../../../lib/booking-time";
import {
  getGoogleBusyWindows,
  isGoogleCalendarConfigured,
} from "../../../lib/google-calendar";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const serviceId = url.searchParams.get("service") ?? BOOKING_SERVICES[0].id;
    const service = findBookingService(serviceId);

    if (!service) {
      return Response.json({ error: "El tipo de cita no es válido." }, { status: 400 });
    }

    const todayKey = getBogotaToday();
    const requestedFrom = url.searchParams.get("from") ?? todayKey;
    const fromKey = requestedFrom < todayKey ? todayKey : requestedFrom;
    const fromDate = parseDateKey(fromKey);
    const toDate = addDays(fromDate, BOOKING_WINDOW_DAYS);
    const toKey = formatDateKey(toDate);
    const timeMin = `${fromKey}T00:00:00-05:00`;
    const timeMax = `${toKey}T23:59:59-05:00`;

    const [reservedSlots, busyWindows] = await Promise.all([
      getReservedSlots(timeMin, timeMax),
      getGoogleBusyWindows(timeMin, timeMax),
    ]);
    const earliestStart = Date.now() + BOOKING_MIN_NOTICE_MINUTES * 60_000;

    const days = Array.from({ length: BOOKING_WINDOW_DAYS }, (_, index) => {
      const dateKey = formatDateKey(addDays(fromDate, index));
      const slots = buildGenericSlotsForDate(dateKey, service).filter(
        (slot) =>
          new Date(slot.start).getTime() >= earliestStart &&
          !reservedSlots.has(slot.start) &&
          !overlaps(slot, busyWindows),
      );

      return slots.length > 0 ? { date: dateKey, slots } : null;
    }).filter(Boolean);

    return Response.json({
      service,
      services: BOOKING_SERVICES,
      days,
      timezone: BOOKING_TIMEZONE,
      integration: isGoogleCalendarConfigured() ? "google_calendar" : "preview",
      provisional: true,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "No fue posible consultar la disponibilidad.";
    return Response.json({ error: message }, { status: 500 });
  }
}
