import NoteForm from "@/components/forms/note-form";
import { getCurrentTrainer } from "@/lib/current-trainer";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface NewNotePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NewNotePage({
  params,
}: NewNotePageProps) {
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
  });

  if (!client) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">
        Add Note
      </h1>

      <p className="text-sm text-muted-foreground">
        Client: {client.fullName}
      </p>

      <NoteForm clientId={client.id} />
    </div>
  );
}