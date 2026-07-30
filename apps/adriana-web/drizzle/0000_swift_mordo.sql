CREATE TABLE `appointments` (
	`id` text PRIMARY KEY NOT NULL,
	`reference` text NOT NULL,
	`slot_key` text NOT NULL,
	`service_id` text NOT NULL,
	`service_name` text NOT NULL,
	`duration_minutes` integer NOT NULL,
	`slot_start` text NOT NULL,
	`slot_end` text NOT NULL,
	`timezone` text DEFAULT 'America/Bogota' NOT NULL,
	`patient_name` text NOT NULL,
	`patient_email` text NOT NULL,
	`patient_phone` text NOT NULL,
	`consent` integer DEFAULT false NOT NULL,
	`status` text DEFAULT 'confirmed' NOT NULL,
	`management_token_hash` text NOT NULL,
	`calendar_event_id` text,
	`calendar_event_url` text,
	`calendar_sync_status` text DEFAULT 'not_configured' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `appointments_reference_unique` ON `appointments` (`reference`);--> statement-breakpoint
CREATE UNIQUE INDEX `appointments_slot_key_unique` ON `appointments` (`slot_key`);