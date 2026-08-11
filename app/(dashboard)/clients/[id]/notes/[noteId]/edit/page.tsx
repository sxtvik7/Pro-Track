import { notFound } from "next/navigation";

import NoteForm from "@/components/forms/note-form";
import { getCurrentTrainer } from "@/lib/current-trainer";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface EditNotePageProps {
  params: Promise<{
    id: string;
    noteId: string;
  }>;
}

export default async function EditNotePage({ params }: EditNotePageProps) {
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
    <div className="mx-auto max-w-lg space-y-6">
      <Link
        href={`/clients/${id}/notes/${noteId}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {note.createdAt.toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
          Edit note
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Update the note from{" "}
          {note.createdAt.toLocaleDateString(undefined, {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
          .
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <NoteForm clientId={id} initialData={note} />
      </div>
    </div>
  );
}