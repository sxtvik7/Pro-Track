import { prisma } from "@/lib/prisma";
import { getCurrentTrainer } from "@/lib/current-trainer";
import { notFound } from "next/navigation";
import Link from "next/link";

interface ProgressPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProgressPage({
  params,
}: ProgressPageProps) {
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Progress History
        </h1>

        <Link
          href={`/clients/${client.id}/progress/new`}
          className="rounded border px-4 py-2"
        >
          Add Record
        </Link>
      </div>

      {client.progressRecords.map((record) => (
        <div
          key={record.id}
          className="rounded border p-4"
        >
          <p>
            Weight: {record.weight ?? "-"} kg
          </p>

          <p>
            Body Fat: {record.bodyFat ?? "-"} %
          </p>

          <p>
            Waist: {record.waist ?? "-"} cm
          </p>

          <p>
            Date: {record.date.toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}