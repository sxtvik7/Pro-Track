import Link from "next/link";
import { notFound } from "next/navigation";

import { getCurrentTrainer } from "@/lib/current-trainer";
import { prisma } from "@/lib/prisma";
import { deleteNote } from "@/actions/delete-note";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";

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
    <div className="mx-auto max-w-lg space-y-6">
      <Link
        href={`/clients/${id}/notes`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Notes
      </Link>

      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            {note.client.fullName}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {note.createdAt.toLocaleDateString(undefined, {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        <Link
          href={`/clients/${id}/notes/${note.id}/edit`}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-[#85B7EB] hover:bg-[#E6F1FB]/40 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-[#0C447C]"
        >
          <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
          Edit
        </Link>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        {note.mood && (
          <span className="mb-3 inline-block rounded-full bg-[#EAF3DE] px-2.5 py-0.5 text-xs font-medium text-[#27500A] dark:bg-[#27500A]/30 dark:text-[#97C459]">
            {note.mood}
          </span>
        )}

        <p className="whitespace-pre-wrap text-gray-900 dark:text-gray-50">
          {note.content}
        </p>

        {note.updatedAt.getTime() !== note.createdAt.getTime() && (
          <p className="mt-4 border-t border-gray-100 pt-3 text-xs text-gray-400 dark:border-gray-800 dark:text-gray-500">
            Last updated{" "}
            {note.updatedAt.toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        )}
      </div>

      <div className="border-t border-gray-200 pt-4 dark:border-gray-800">
        <form action={deleteNote.bind(null, note.id)}>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#A32D2D] transition hover:bg-[#FCEBEB] dark:text-[#F09595] dark:hover:bg-[#501313]/20"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete note
          </button>
        </form>
      </div>
    </div>
  );
}