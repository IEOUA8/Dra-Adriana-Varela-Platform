import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export async function getDb() {
  const cloudflareWorkersModule = "cloudflare:workers";
  const runtime = (await import(
    /* @vite-ignore */ cloudflareWorkersModule
  )) as {
    env?: { DB?: Parameters<typeof drizzle>[0] };
  };

  if (!runtime.env?.DB) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. Set the `d1` field in .openai/hosting.json to `DB` or let your control plane inject the real binding values before using the database."
    );
  }

  return drizzle(runtime.env.DB, { schema });
}
