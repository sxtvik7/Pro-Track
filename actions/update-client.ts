"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentTrainer } from "@/lib/current-trainer";
import { redirect } from "next/navigation";

export async function updateClient(
  clientId: string,
  formData: FormData
) {
  const trainer = await getCurrentTrainer();

  if (!trainer) {
    throw new Error("Trainer not found");
  }

  const fullName = formData.get("fullName") as string;
  const age = formData.get("age") as string;
  const phone = formData.get("phone") as string;
  const goal = formData.get("goal") as string;

  await prisma.client.update({
    where: {
      id: clientId,
      trainerId: trainer.id,
    },
    data: {
      fullName,
      age: age ? Number(age) : null,
      phone,
      goal,
    },
  });

  redirect(`/clients/${clientId}`);
}