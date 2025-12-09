"use server";

import { db } from "@/db/db";
import { requireTrainer } from "@/lib/require-trainer";

export async function getClients() {
  const trainer = await requireTrainer();

  const row = await db.query.clients.findMany({
    where: (c, { eq, isNull }) =>
      eq(c.trainer_id, trainer.id) && isNull(c.deleted_at),
    orderBy: (c, { desc }) => desc(c.created_at),
    limit: 100,
  });

  if (!row) return null;
  return row;
}
