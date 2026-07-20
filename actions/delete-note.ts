"use server";

import { redirect } from "next/navigation";

import { getCurrentTrainer } from "@/lib/current-trainer";
import { prisma } from "@/lib/prisma";

export async function deleteNote(noteId: string) {
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

  await prisma.note.delete({
    where: {
      id: note.id,
    },
  });

  redirect(`/clients/${note.clientId}/notes`);
}