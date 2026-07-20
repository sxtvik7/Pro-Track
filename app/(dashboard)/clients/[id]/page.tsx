import { deleteClient } from "@/actions/delete-client";
import { getCurrentTrainer } from "@/lib/current-trainer";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ClientPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ClientPage({ params }: ClientPageProps) {
  const { id } = await params;

  const trainer = await getCurrentTrainer();

  if (!trainer) return null;

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
        take: 1,
      },
    },
  });

  if (!client) notFound();

  const latestProgress = client.progressRecords[0];

  return (
    <>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{client.fullName}</h1>

        <div className="rounded border p-4">
          <h2 className="mb-2 font-semibold">Latest Progress</h2>

          <p>Weight: {latestProgress?.weight ?? "-"} kg</p>
          <p>Body Fat: {latestProgress?.bodyFat ?? "-"} %</p>
          <p>
            Last Updated:{" "}
            {latestProgress ? latestProgress.date.toLocaleDateString() : "-"}
          </p>
        </div>

        <div className="rounded border p-4">
          <h2 className="mb-2 font-semibold">Client Information</h2>

          <p>
            <strong>Age:</strong> {client.age ?? "Not provided"}
          </p>

          <p>
            <strong>Phone:</strong> {client.phone ?? "Not provided"}
          </p>

          <p>
            <strong>Goal:</strong> {client.goal ?? "Not provided"}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href={`/clients/${client.id}/edit`}
            className="rounded border px-4 py-2"
          >
            Edit Client
          </Link>

          <Link
            href={`/clients/${client.id}/progress`}
            className="rounded border px-4 py-2"
          >
            Progress Records
          </Link>

          <Link
            href={`/clients/${client.id}/notes`}
            className="rounded border px-4 py-2"
          >
            Notes
          </Link>

          <form action={deleteClient.bind(null, client.id)}>
            <button
              type="submit"
              className="rounded border px-4 py-2 cursor-pointer"
            >
              Delete Client
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
