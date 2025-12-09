"use server"

import { db } from "@/db/db";
import { clients } from "@/db/schema";
import { requireTrainer } from "@/lib/require-trainer";
import { and, eq } from "drizzle-orm";
import {z} from "zod"

const deleteSchema = z.object({ id: z.string().uuid()});

export async function softDeleteClient(payload: unknown) {
    const {id} = deleteSchema.parse(payload);
    const trainer = await requireTrainer();

    const updated = await db.update(clients)
    .set({ deleted_at: new Date() })
    .where(and(eq(clients.id, id), eq(clients.trainer_id, trainer.id)))
    .returning()

    if((updated ?? []).length === 0) throw new Error("Not found or not authorize");
    return {success: true, id};
}