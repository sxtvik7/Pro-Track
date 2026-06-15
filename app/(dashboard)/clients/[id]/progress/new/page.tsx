import { prisma } from "@/lib/prisma";
import { getCurrentTrainer } from "@/lib/current-trainer";
import { notFound } from "next/navigation";
import ProgressForm from "@/components/forms/progress-form";

interface NewProgressPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NewProgressPage({
  params,
}: NewProgressPageProps) {
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
      <div>
        <h1 className="text-2xl font-bold">
          Add Progress Record
        </h1>

        <p className="text-sm text-muted-foreground">
          Client: {client.fullName}
        </p>
      </div>

      <ProgressForm clientId={client.id} />
    </div>
  );
}