import { prisma } from "@/lib/prisma";
import { getCurrentTrainer } from "@/lib/current-trainer";
import { notFound } from "next/navigation";
import Link from "next/link";

interface NotesPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NotesPage({
  params,
}: NotesPageProps) {
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Notes
        </h1>

        <Link
          href={`/clients/${client.id}/notes/new`}
          className="rounded border px-4 py-2"
        >
          Add Note
        </Link>
      </div>

      {client.notes.length === 0 ? (
        <div className="rounded border p-4">
          No notes yet.
        </div>
      ) : (
        client.notes.map((note) => (
          <Link
            key={note.id}
            href={`/clients/${client.id}/notes/${note.id}`}
          >
            <div className="rounded border p-4 hover:bg-gray-50">
              <h2 className="font-semibold">
                {note.content}
              </h2>

              <p className="line-clamp-2 text-sm text-gray-600">
                {note.mood}
              </p>

              <p className="mt-2 text-xs text-gray-500">
                {note.createdAt.toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}