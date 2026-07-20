import Link from "next/link";
import { notFound } from "next/navigation";

import { getCurrentTrainer } from "@/lib/current-trainer";
import { prisma } from "@/lib/prisma";
import { deleteNote } from "@/actions/delete-note";

interface NotePageProps {
  params: Promise<{
    id: string;
    noteId: string;
  }>;
}

export default async function NotePage({ params }: NotePageProps) {
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
    include: {
      client: true,
    },
  });

  if (!note) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Note</h1>
        <p className="text-sm text-muted-foreground">
          Client: {note.client.fullName}
        </p>
      </div>

      <div className="rounded-lg border p-6 space-y-4">
        <div>
          <h2 className="text-sm font-medium text-muted-foreground">Content</h2>

          <p className="mt-1 whitespace-pre-wrap">{note.content}</p>
        </div>

        {note.mood && (
          <div>
            <h2 className="text-sm font-medium text-muted-foreground">Mood</h2>

            <p>{note.mood}</p>
          </div>
        )}

        <div className="border-t pt-4 text-sm text-muted-foreground space-y-1">
          <p>Created: {note.createdAt.toLocaleDateString()}</p>

          <p>Updated: {note.updatedAt.toLocaleDateString()}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          href={`/clients/${id}/notes/${note.id}/edit`}
          className="rounded border px-4 py-2"
        >
          Edit Note
        </Link>

        <Link
          href={`/clients/${id}/notes`}
          className="rounded border px-4 py-2"
        >
          Back
        </Link>

        <form action={deleteNote.bind(null, note.id)}>
          <button
            type="submit"
            className="rounded border border-red-500 px-4 py-2 text-red-500 hover:bg-red-50"
          >
            Delete Note
          </button>
        </form>
      </div>
    </div>
  );
}
