import { prisma } from "@/lib/prisma";
import { getCurrentTrainer } from "@/lib/current-trainer";
import { notFound } from "next/navigation";
import Link from "next/link";

interface ProgressPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProgressPage({ params }: ProgressPageProps) {
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
      progressRecords: {
        orderBy: {
          date: "desc",
        },
      },
    },
  });

  if (!client) {
    notFound();
  }

  const records = client.progressRecords;

  const latestRecord = records[0];
  const firstRecord = records[records.length - 1];

  const currentWeight = latestRecord?.weight;
  const startingWeight = firstRecord?.weight;

  const weightChange =
    currentWeight !== null &&
    currentWeight !== undefined &&
    startingWeight !== null &&
    startingWeight !== undefined
      ? currentWeight - startingWeight
      : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Progress History</h1>

        <Link
          href={`/clients/${client.id}/progress/new`}
          className="rounded border px-4 py-2"
        >
          Add Record
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded border p-4">
          <p className="text-sm text-muted-foreground">Current Weight</p>
          <p className="text-2xl font-bold">{currentWeight ?? "-"} kg</p>
        </div>

        <div className="rounded border p-4">
          <p className="text-sm text-muted-foreground">Starting Weight</p>
          <p className="text-2xl font-bold">{startingWeight ?? "-"} kg</p>
        </div>

        <div className="rounded border p-4">
          <p className="text-sm text-muted-foreground">Weight Change</p>
          <p className="text-2xl font-bold">
            {weightChange !== null ? `${weightChange.toFixed(1)} kg` : "-"}
          </p>
        </div>
      </div>

      {/* Progress History */}
      <div className="space-y-4">
        {records.length === 0 ? (
          <div className="rounded border p-4">No progress records found.</div>
        ) : (
          records.map((record) => (
            <Link
              key={record.id}
              href={`/clients/${client.id}/progress/${record.id}`}
            >
              <div className="rounded border p-4 mb-3">

              <p>
                <strong>Weight:</strong> {record.weight ?? "-"} kg
              </p>

              <p>
                <strong>Body Fat:</strong> {record.bodyFat ?? "-"} %
              </p>

              <p>
                <strong>Waist:</strong> {record.waist ?? "-"} cm
              </p>

              <p>
                <strong>Date:</strong> {record.date.toLocaleDateString()}
              </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}