import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const appointments = sqliteTable(
  "appointments",
  {
    id: text("id").primaryKey(),
    reference: text("reference").notNull(),
    slotKey: text("slot_key").notNull(),
    serviceId: text("service_id").notNull(),
    serviceName: text("service_name").notNull(),
    durationMinutes: integer("duration_minutes").notNull(),
    slotStart: text("slot_start").notNull(),
    slotEnd: text("slot_end").notNull(),
    timezone: text("timezone").notNull().default("America/Bogota"),
    patientName: text("patient_name").notNull(),
    patientEmail: text("patient_email").notNull(),
    patientPhone: text("patient_phone").notNull(),
    consent: integer("consent", { mode: "boolean" }).notNull().default(false),
    status: text("status").notNull().default("confirmed"),
    managementTokenHash: text("management_token_hash").notNull(),
    calendarEventId: text("calendar_event_id"),
    calendarEventUrl: text("calendar_event_url"),
    calendarSyncStatus: text("calendar_sync_status")
      .notNull()
      .default("not_configured"),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    uniqueIndex("appointments_reference_unique").on(table.reference),
    uniqueIndex("appointments_slot_key_unique").on(table.slotKey),
  ],
);
