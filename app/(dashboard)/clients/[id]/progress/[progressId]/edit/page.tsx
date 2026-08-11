import ProgressForm from "@/components/forms/progress-form";
import { getCurrentTrainer } from "@/lib/current-trainer";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface EditProgressPageProps {
  params: Promise<{
    id: string;
    progressId: string;
  }>;
}

export default async function EditProgressPage({ params }: EditProgressPageProps) {
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
    <div className="mx-auto max-w-lg space-y-6">
      <Link
        href={`/clients/${id}/progress/${progressId}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {progressRecord.date.toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
          Edit record
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Update the check-in from{" "}
          {progressRecord.date.toLocaleDateString(undefined, {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
          .
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
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
    </div>
  );
}