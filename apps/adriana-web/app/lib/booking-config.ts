export const BOOKING_TIMEZONE = "America/Bogota";
export const BOOKING_WINDOW_DAYS = 90;
export const BOOKING_MIN_NOTICE_MINUTES = 120;

export type BookingService = {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  modality: string;
};

export const BOOKING_SERVICES: BookingService[] = [
  {
    id: "valoracion-integral",
    name: "Valoración médica integral",
    description:
      "Primera conversación para comprender antecedentes, objetivos y posibles próximos pasos.",
    durationMinutes: 60,
    modality: "Presencial · Pereira",
  },
  {
    id: "consulta-seguimiento",
    name: "Consulta de seguimiento",
    description:
      "Revisión de evolución, dudas y ajustes posteriores a una valoración previa.",
    durationMinutes: 45,
    modality: "Presencial · Pereira",
  },
  {
    id: "orientacion-inicial",
    name: "Orientación inicial",
    description:
      "Espacio breve para conocer el enfoque y definir si una valoración es pertinente.",
    durationMinutes: 30,
    modality: "Modalidad por confirmar",
  },
];

const WEEKDAY_SLOTS = [
  "09:00",
  "10:15",
  "11:30",
  "14:00",
  "15:15",
  "16:30",
];

const SATURDAY_SLOTS = ["09:00", "10:15", "11:30"];

export function findBookingService(serviceId: string) {
  return BOOKING_SERVICES.find((service) => service.id === serviceId);
}

export function getGenericStartTimes(dayOfWeek: number) {
  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    return WEEKDAY_SLOTS;
  }

  if (dayOfWeek === 6) {
    return SATURDAY_SLOTS;
  }

  return [];
}
