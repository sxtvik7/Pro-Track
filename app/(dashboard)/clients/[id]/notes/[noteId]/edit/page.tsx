import { notFound } from "next/navigation";

import NoteForm from "@/components/forms/note-form";
import { getCurrentTrainer } from "@/lib/current-trainer";
import { prisma } from "@/lib/prisma";

interface EditNotePageProps {
  params: Promise<{
    id: string;
    noteId: string;
  }>;
}

export default async function EditNotePage({
  params,
}: EditNotePageProps) {
  const { id, noteId } = await params;

  const trainer = await getCurrentTrainer();

  if (!trainer) {
    return null;
  }

  const note = await prisma.note.findFirst({
    where: {
      id: noteId,
      client: {
        id,
        trainerId: trainer.id,
      },
    },
  });

  if (!note) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">
        Edit Note
      </h1>

      <NoteForm
        clientId={id}
        initialData={note}
      />
    </div>
  );
}