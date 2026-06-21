import { prisma } from "@/lib/prisma";
import { getCurrentTrainer } from "@/lib/current-trainer";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProgressRecordPageProps {
  params: Promise<{
    id: string;
    progressId: string;
  }>;
}

export default async function ProgressRecordPage({
  params,
}: ProgressRecordPageProps) {
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
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">
        Progress Record
      </h1>

      <div className="rounded border p-4 space-y-2">
        <p>
          <strong>Weight:</strong>{" "}
          {progressRecord.weight ?? "-"} kg
        </p>

        <p>
          <strong>Body Fat:</strong>{" "}
          {progressRecord.bodyFat ?? "-"} %
        </p>

        <p>
          <strong>Chest:</strong>{" "}
          {progressRecord.chest ?? "-"} cm
        </p>

        <p>
          <strong>Waist:</strong>{" "}
          {progressRecord.waist ?? "-"} cm
        </p>

        <p>
          <strong>Arms:</strong>{" "}
          {progressRecord.arms ?? "-"} cm
        </p>

        <p>
          <strong>Notes:</strong>{" "}
          {progressRecord.notes || "-"}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {progressRecord.date.toLocaleDateString()}
        </p>
      </div>

      <Link
        href={`/clients/${id}/progress/${progressId}/edit`}
        className="rounded border px-4 py-2"
      >
        Edit Record
      </Link>
    </div>
  );
}