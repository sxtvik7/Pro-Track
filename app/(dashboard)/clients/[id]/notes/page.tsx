import { prisma } from "@/lib/prisma";
import { getCurrentTrainer } from "@/lib/current-trainer";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, NotebookText, Plus } from "lucide-react";

interface NotesPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { id } = await params;

  const trainer = await getCurrentTrainer();

  if (!trainer) {
    return null;
  }

  const client = await prisma.client.findFirst({
    where: {
      id,
      trainerId: trainer.id,
    },
    include: {
      notes: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!client) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Link
        href={`/clients/${client.id}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {client.fullName}
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Notes</h1>

        <Link
          href={`/clients/${client.id}/notes/new`}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#185FA5] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#0C447C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#185FA5]"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add note
        </Link>
      </div>

      {client.notes.length === 0 ? (
        <div className="flex flex-col items-center rounded-xl border border-dashed border-gray-300 py-12 text-center dark:border-gray-700">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E6F1FB] dark:bg-[#0C447C]/30">
            <NotebookText className="h-6 w-6 text-[#0C447C] dark:text-[#85B7EB]" aria-hidden="true" />
          </div>
          <p className="mt-4 font-medium text-gray-900 dark:text-gray-50">No notes yet</p>
          <p className="mt-1 max-w-xs text-sm text-gray-500 dark:text-gray-400">
            Add a note to record observations from {client.fullName}'s sessions.
          </p>
          <Link
            href={`/clients/${client.id}/notes/new`}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#185FA5] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0C447C]"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add note
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {client.notes.map((note) => (
            <Link
              key={note.id}
              href={`/clients/${client.id}/notes/${note.id}`}
              className="block rounded-xl border border-gray-200 bg-white p-4 transition hover:border-[#85B7EB] hover:bg-[#E6F1FB]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#185FA5] dark:border-gray-800 dark:bg-gray-900 dark:hover:border-[#0C447C] dark:hover:bg-[#0C447C]/10"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="line-clamp-2 flex-1 text-sm text-gray-900 dark:text-gray-50">
                  {note.content}
                </p>

                {note.mood && (
                  <span className="shrink-0 rounded-full bg-[#EAF3DE] px-2.5 py-0.5 text-xs font-medium text-[#27500A] dark:bg-[#27500A]/30 dark:text-[#97C459]">
                    {note.mood}
                  </span>
                )}
              </div>

              <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                {note.createdAt.toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}