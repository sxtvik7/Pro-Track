import { prisma } from "@/lib/prisma";
import { getCurrentTrainer } from "@/lib/current-trainer";
import Link from "next/link";
import { Phone, Target, UserPlus, Users } from "lucide-react";

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
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Clients</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {clients.length} {clients.length === 1 ? "client" : "clients"}
          </p>
        </div>

        <Link
          href="/clients/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#185FA5] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#0C447C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#185FA5]"
        >
          <UserPlus className="h-4 w-4" aria-hidden="true" />
          Add client
        </Link>
      </div>

      {clients.length === 0 ? (
        <div className="flex flex-col items-center rounded-xl border border-dashed border-gray-300 py-16 text-center dark:border-gray-700">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E6F1FB] dark:bg-[#0C447C]/30">
            <Users className="h-6 w-6 text-[#0C447C] dark:text-[#85B7EB]" aria-hidden="true" />
          </div>
          <p className="mt-4 font-medium text-gray-900 dark:text-gray-50">No clients yet</p>
          <p className="mt-1 max-w-xs text-sm text-gray-500 dark:text-gray-400">
            Add your first client to start tracking their progress and coaching notes.
          </p>
          <Link
            href="/clients/new"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#185FA5] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0C447C]"
          >
            <UserPlus className="h-4 w-4" aria-hidden="true" />
            Add client
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {clients.map((client) => (
            <Link href={`/clients/${client.id}`} key={client.id} className="block">
              <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-[#85B7EB] hover:bg-[#E6F1FB]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#185FA5] dark:border-gray-800 dark:bg-gray-900 dark:hover:border-[#0C447C] dark:hover:bg-[#0C447C]/10">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#378ADD] text-sm font-medium text-white">
                  {client.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-medium text-gray-900 dark:text-gray-50">
                    {client.fullName}
                  </h2>

                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                    {client.goal && (
                      <span className="flex items-center gap-1">
                        <Target className="h-3.5 w-3.5" aria-hidden="true" />
                        {client.goal}
                      </span>
                    )}
                    {client.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                        {client.phone}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}