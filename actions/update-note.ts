"use server";

import { redirect } from "next/navigation";

import { getCurrentTrainer } from "@/lib/current-trainer";
import { prisma } from "@/lib/prisma";

export async function updateNote(
  noteId: string,
  formData: FormData
) {
  const trainer = await getCurrentTrainer();

  if (!trainer) {
    throw new Error("Trainer not found");
  }

  const note = await prisma.note.findFirst({
    where: {
      id: noteId,
      client: {
        trainerId: trainer.id,
      },
    },
    include: {
      client: true,
    },
  });

  if (!note) {
    throw new Error("Note not found");
  }

  const content = formData.get("content") as string;
  const mood = formData.get("mood") as string;

  await prisma.note.update({
    where: {
      id: note.id,
    },
    data: {
      content,
      mood: mood || null,
    },
  });

  redirect(`/clients/${note.clientId}/notes/${note.id}`);
}