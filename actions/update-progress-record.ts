"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentTrainer } from "@/lib/current-trainer";
import { redirect } from "next/navigation";

export async function updateProgressRecord(
  progressRecordId: string,
  formData: FormData
) {
  const trainer = await getCurrentTrainer();

  if (!trainer) {
    throw new Error("Trainer not found");
  }

  const progressRecord = await prisma.progressRecord.findFirst({
    where: {
      id: progressRecordId,
      client: {
        trainerId: trainer.id,
      },
    },
    include: {
      client: true,
    },
  });

  if (!progressRecord) {
    throw new Error("Progress record not found");
  }

  await prisma.progressRecord.update({
    where: {
      id: progressRecordId,
    },
    data: {
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

  redirect(`/clients/${progressRecord.clientId}/progress`);
}