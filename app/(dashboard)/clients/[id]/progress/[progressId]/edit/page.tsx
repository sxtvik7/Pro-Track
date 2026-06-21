import ProgressForm from "@/components/forms/progress-form";
import { getCurrentTrainer } from "@/lib/current-trainer";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface EditProgressPageProps {
  params: Promise<{
    id: string;
    progressId: string;
  }>;
} 

export default async function EditProgressPage({
  params,
}: EditProgressPageProps) {
  const { id, progressId } = await params;

  const trainer = await getCurrentTrainer();

  if (!trainer) {
    return null;
  }

  const progressRecord = await prisma.progressRecord.findFirst({
    where: {
      id: progressId,
      client: {
        id,
        trainerId: trainer.id,
      },
    },
  });

  if (!progressRecord) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">
        Edit Record
      </h1>

      <ProgressForm
        clientId={id}
        initialData={{
          id: progressRecord.id,
          weight: progressRecord.weight,
          bodyFat: progressRecord.bodyFat,
          chest: progressRecord.chest,
          waist: progressRecord.waist,
          arms: progressRecord.arms,
          notes: progressRecord.notes,
        }}
      />
    </div>
  );
}