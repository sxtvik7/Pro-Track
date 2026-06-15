import { deleteClient } from "@/actions/delete-client";
import { getCurrentTrainer } from "@/lib/current-trainer";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ClientsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ClientPage({ params }: ClientsPageProps) {
  const { id } = await params;

  const trainer = await getCurrentTrainer();

  if (!trainer) return null;

  const client = await prisma.client.findFirst({
    where: {
      id,
      trainerId: trainer.id,
    },
  });

  if (!client) notFound();

  return (
    <>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{client.fullName}</h1>

        <div className="rounded border p-4">
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
        <Link
          href={`/clients/${client.id}/edit`}
          className="rounded border px-4 py-2"
        >
          Edit Client
        </Link>

        <form action={deleteClient.bind(null, client.id)}>
          <button
            type="submit"
            className="rounded border px-4 py-2 cursor-pointer"
          >
            Delete Client
          </button>
        </form>

        <Link
          href={`/clients/${client.id}/progress`}
          className="rounded border px-4 py-2"
        >
          Progress Records
        </Link>
      </div>
    </>
  );
}
