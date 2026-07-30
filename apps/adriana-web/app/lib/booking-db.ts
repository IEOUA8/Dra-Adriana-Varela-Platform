export type StoredAppointment = {
  id: string;
  reference: string;
  slot_start: string;
  slot_end: string;
  service_name: string;
  patient_email: string;
  status: string;
  calendar_event_id: string | null;
};

type BookingRecord = {
  id: string;
  reference: string;
  slotKey: string;
  serviceId: string;
  serviceName: string;
  durationMinutes: number;
  slotStart: string;
  slotEnd: string;
  timezone: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  managementTokenHash: string;
  calendarSyncStatus: string;
};

type D1Result<T> = {
  results: T[];
};

type D1PreparedStatement = {
  bind(...values: unknown[]): D1PreparedStatement;
  all<T>(): Promise<D1Result<T>>;
  run(): Promise<unknown>;
};

type D1Database = {
  batch(statements: D1PreparedStatement[]): Promise<unknown>;
  prepare(query: string): D1PreparedStatement;
};

const createAppointmentsTable = `
  CREATE TABLE IF NOT EXISTS appointments (
    id TEXT PRIMARY KEY NOT NULL,
    reference TEXT NOT NULL UNIQUE,
    slot_key TEXT NOT NULL UNIQUE,
    service_id TEXT NOT NULL,
    service_name TEXT NOT NULL,
    duration_minutes INTEGER NOT NULL,
    slot_start TEXT NOT NULL,
    slot_end TEXT NOT NULL,
    timezone TEXT NOT NULL DEFAULT 'America/Bogota',
    patient_name TEXT NOT NULL,
    patient_email TEXT NOT NULL,
    patient_phone TEXT NOT NULL,
    consent INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'confirmed',
    management_token_hash TEXT NOT NULL,
    calendar_event_id TEXT,
    calendar_event_url TEXT,
    calendar_sync_status TEXT NOT NULL DEFAULT 'not_configured',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`;

const createSlotStartIndex = `
  CREATE INDEX IF NOT EXISTS appointments_slot_start_idx
  ON appointments (slot_start, status)
`;

let databasePromise: Promise<D1Database | null> | null = null;

async function loadD1() {
  if (process.env.VERCEL) {
    return null;
  }

  try {
    // The specifier remains dynamic so Next.js/Vercel does not bundle a
    // Cloudflare-only runtime module. Vinext resolves it inside Workers.
    const cloudflareWorkersModule = "cloudflare:workers";
    const runtime = (await import(
      /* @vite-ignore */ cloudflareWorkersModule
    )) as {
      env?: { DB?: D1Database };
    };
    return runtime.env?.DB ?? null;
  } catch {
    return null;
  }
}

async function getD1() {
  databasePromise ??= loadD1();
  return databasePromise;
}

export async function isBookingPersistenceConfigured() {
  return Boolean(await getD1());
}

export async function ensureBookingSchema() {
  const db = await getD1();
  if (!db) {
    throw new Error(
      "La agenda online está en activación. Aún no es posible registrar reservas.",
    );
  }
  await db.batch([
    db.prepare(createAppointmentsTable),
    db.prepare(createSlotStartIndex),
  ]);
  return db;
}

export async function getReservedSlots(from: string, to: string) {
  const db = await ensureBookingSchema();
  const result = await db
    .prepare(
      `SELECT slot_start
       FROM appointments
       WHERE slot_start >= ?1
         AND slot_start < ?2
         AND status IN ('pending', 'confirmed')`,
    )
    .bind(from, to)
    .all<{ slot_start: string }>();

  return new Set(result.results.map((row) => row.slot_start));
}

export async function createAppointment(record: BookingRecord) {
  const db = await ensureBookingSchema();

  await db
    .prepare(
      `INSERT INTO appointments (
        id, reference, slot_key, service_id, service_name, duration_minutes,
        slot_start, slot_end, timezone, patient_name, patient_email,
        patient_phone, consent, status, management_token_hash,
        calendar_sync_status
      ) VALUES (
        ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, 1,
        'confirmed', ?13, ?14
      )`,
    )
    .bind(
      record.id,
      record.reference,
      record.slotKey,
      record.serviceId,
      record.serviceName,
      record.durationMinutes,
      record.slotStart,
      record.slotEnd,
      record.timezone,
      record.patientName,
      record.patientEmail,
      record.patientPhone,
      record.managementTokenHash,
      record.calendarSyncStatus,
    )
    .run();
}

export async function attachCalendarEvent(
  appointmentId: string,
  eventId: string,
  eventUrl: string | null,
) {
  const db = await ensureBookingSchema();
  await db
    .prepare(
      `UPDATE appointments
       SET calendar_event_id = ?1,
           calendar_event_url = ?2,
           calendar_sync_status = 'synced',
           updated_at = CURRENT_TIMESTAMP
       WHERE id = ?3`,
    )
    .bind(eventId, eventUrl, appointmentId)
    .run();
}

export async function releaseAppointment(appointmentId: string) {
  const db = await ensureBookingSchema();
  await db
    .prepare("DELETE FROM appointments WHERE id = ?1")
    .bind(appointmentId)
    .run();
}
