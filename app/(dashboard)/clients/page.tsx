import { prisma } from "@/lib/prisma";
import { getCurrentTrainer } from "@/lib/current-trainer";
import Link from "next/link";

export default async function ClientsPage() {
  const trainer = await getCurrentTrainer();

  if (!trainer) {
    return null;
  }

  const clients = await prisma.client.findMany({
    where: {
      trainerId: trainer.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Clients</h1>

        <Link href="/clients/new" className="rounded border px-4 py-2">
          Add Client
        </Link>
      </div>

      <div className="space-y-3">
        {clients.map((client) => (
          <Link href={`/clients/${client.id}`} key={client.id}>
            <div className="rounded border p-4">
              <h2>{client.fullName}</h2>
              <p>{client.goal}</p>
              <p>{client.phone}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
