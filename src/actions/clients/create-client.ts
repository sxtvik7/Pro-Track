"use server"

import { db } from "@/db/db";
import { clients } from "@/db/schema";
import { requireTrainer } from "@/lib/require-trainer";
import { ClientCreateInput, clientCreateSchema } from "@/lib/validations/client";

export async function createClient(data: unknown) {
    const parsed = clientCreateSchema.parse(data) as ClientCreateInput;
    const trainer = await requireTrainer();

    const insert = await db.insert(clients).values({
        trainer_id: trainer.id,
        name: parsed.name,
        email: parsed.email ?? null,
        phone: parsed.phone ?? null,
        dob: parsed.dob ? new Date(parsed.dob) : null,
        sex: parsed.sex ?? null,
        address: parsed.address ?? null, 
    }).returning();

    const created = insert[0];

    return {
        id: created.id,
        name: created.name,
        email: created.email,
        phone: created.phone,
        dob: created.dob,
        sex: created.sex,
        address: created.address,
        created_at: created.created_at,
        updated_at: created.updated_at,
    };
}