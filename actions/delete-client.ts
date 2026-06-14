"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentTrainer } from "@/lib/current-trainer";
import { redirect } from "next/navigation";

export async function deleteClient(clientId: string) {
  const trainer = await getCurrentTrainer();

  if (!trainer) {
    throw new Error("Trainer not found");
  }

  await prisma.client.deleteMany({
    where: {
      id: clientId,
      trainerId: trainer.id,
    },
  });

  redirect("/clients");
}