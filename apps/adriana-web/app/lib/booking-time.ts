import {
  BOOKING_TIMEZONE,
  type BookingService,
  getGenericStartTimes,
} from "./booking-config";

export type BookingSlot = {
  start: string;
  end: string;
  date: string;
  time: string;
  label: string;
};

const BOGOTA_OFFSET = "-05:00";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function formatDateKey(date: Date) {
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(
    date.getUTCDate(),
  )}`;
}

export function parseDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

export function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

export function getBogotaToday() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: BOOKING_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function buildSlot(
  dateKey: string,
  time: string,
  service: BookingService,
): BookingSlot {
  const [hours, minutes] = time.split(":").map(Number);
  const startMinutes = hours * 60 + minutes;
  const endMinutes = startMinutes + service.durationMinutes;
  const endHours = Math.floor(endMinutes / 60);
  const endMinute = endMinutes % 60;
  const start = `${dateKey}T${pad(hours)}:${pad(minutes)}:00${BOGOTA_OFFSET}`;
  const end = `${dateKey}T${pad(endHours)}:${pad(endMinute)}:00${BOGOTA_OFFSET}`;

  return {
    start,
    end,
    date: dateKey,
    time,
    label: new Intl.DateTimeFormat("es-CO", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: BOOKING_TIMEZONE,
    }).format(new Date(start)),
  };
}

export function buildGenericSlotsForDate(
  dateKey: string,
  service: BookingService,
) {
  const date = parseDateKey(dateKey);
  const startTimes = getGenericStartTimes(date.getUTCDay());
  return startTimes.map((time) => buildSlot(dateKey, time, service));
}

export function overlaps(
  slot: Pick<BookingSlot, "start" | "end">,
  busy: Array<{ start: string; end: string }>,
) {
  const slotStart = new Date(slot.start).getTime();
  const slotEnd = new Date(slot.end).getTime();

  return busy.some((window) => {
    const busyStart = new Date(window.start).getTime();
    const busyEnd = new Date(window.end).getTime();
    return slotStart < busyEnd && slotEnd > busyStart;
  });
}

