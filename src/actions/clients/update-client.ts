"use server";

import { db } from "@/db/db";
import { clients } from "@/db/schema";
import { requireTrainer } from "@/lib/require-trainer";
import { clientCreateSchema,ClientUpdateInput } from "@/lib/validations/client";
import { and, eq } from "drizzle-orm";

export async function updateClinet(data: unknown) {
  const parsed = clientCreateSchema.parse(data) as ClientUpdateInput;
  const trainer = await requireTrainer();

  const updated = await db
    .update(clients)
    .set({
      name: parsed.name,
      email: parsed.email ?? null,
      phone: parsed.phone ?? null,
      dob: parsed.dob ? new Date(parsed.dob) : null,
      sex: parsed.sex ?? null,
      address: parsed.address ?? null,
      updated_at: new Date(),
    })
    .where(and(eq(clients.id, parsed.id), eq(clients.trainer_id, trainer.id)))
    .returning();

    if (updated.length === 0) throw new Error("Client not found or unauthorized to update.");
    return updated[0];
}
