"use server"

import { db } from "@/db/db";
import { requireTrainer } from "@/lib/require-trainer";

export async function getClientById(clientId: string) {
  const trainer = await requireTrainer();

  const row = await db.query.clients.findFirst({
    where: (c, { eq, isNull }) =>
      eq(c.id, clientId) &&
      eq(c.trainer_id, trainer.id) &&
      isNull(c.deleted_at),
  });

  if(!row) return null;
  return row 
} 
