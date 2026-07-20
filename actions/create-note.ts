"use server";

import { getCurrentTrainer } from "@/lib/current-trainer";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createNote(
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

  // const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  await prisma.note.create({
    data: {
      clientId,
      content,
    },
  });

  redirect(`/clients/${clientId}/notes`);
}