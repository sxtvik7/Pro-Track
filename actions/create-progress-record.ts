"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentTrainer } from "@/lib/current-trainer";
import { redirect } from "next/navigation";

export async function createProgressRecord(
  clientId: string,
  formData: FormData
) {
  const trainer = await getCurrentTrainer();

  if (!trainer) {
    throw new Error("Trainer not found");
  }

  const client = await prisma.client.findFirst({
    where: {
      id: clientId,
      trainerId: trainer.id,
    },
  });

  if (!client) {
    throw new Error("Client not found");
  }

  await prisma.progressRecord.create({
    data: {
      clientId,

      weight: formData.get("weight")
        ? Number(formData.get("weight"))
        : null,

      bodyFat: formData.get("bodyFat")
        ? Number(formData.get("bodyFat"))
        : null,

      chest: formData.get("chest")
        ? Number(formData.get("chest"))
        : null,

      waist: formData.get("waist")
        ? Number(formData.get("waist"))
        : null,

      arms: formData.get("arms")
        ? Number(formData.get("arms"))
        : null,

      notes: formData.get("notes") as string,
    },
  });

  redirect(`/clients/${clientId}/progress`);
}