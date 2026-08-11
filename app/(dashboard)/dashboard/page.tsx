import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Notebook,
  Sparkles,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";

import { getCurrentTrainer } from "@/lib/current-trainer";
import { prisma } from "@/lib/prisma";
import { StatCard } from "@/components/ui/stat-card";

export default async function DashboardPage() {
  const trainer = await getCurrentTrainer();

  if (!trainer) {
    redirect("/sign-in");
  }

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [totalClients, totalProgress, totalNotes, newClients, recentClients] =
    await Promise.all([
      prisma.client.count({
        where: { trainerId: trainer.id },
      }),

      prisma.progressRecord.count({
        where: { client: { trainerId: trainer.id } },
      }),

      prisma.note.count({
        where: { client: { trainerId: trainer.id } },
      }),

      prisma.client.count({
        where: {
          trainerId: trainer.id,
          createdAt: { gte: startOfMonth },
        },
      }),

      prisma.client.findMany({
        where: { trainerId: trainer.id },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 sm:text-3xl">
            Welcome back, {trainer.fullName}
          </h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            {/* Here's an overview of your fitness business. */}
            Here's what's happening with your clients today.
          </p>
        </div>

        <Link
          href="/clients"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#185FA5] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#0C447C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#185FA5]"
        >
          <UserPlus className="h-4 w-4" aria-hidden="true" />
          Add client
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          title="Total clients"
          value={totalClients}
          icon={Users}
          tone="primary"
        />
        <StatCard
          title="Progress records"
          value={totalProgress}
          icon={TrendingUp}
          tone="secondary"
        />
        <StatCard
          title="Notes"
          value={totalNotes}
          icon={Notebook}
          tone="primary"
        />
        <StatCard
          title="New this month"
          value={newClients}
          icon={Sparkles}
          tone="secondary"
        />
      </div>

      {/* Recent Clients */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            Recent clients
          </h2>

          <Link
            href="/clients"
            className="inline-flex items-center gap-1 text-sm font-medium text-[#185FA5] hover:text-[#0C447C] dark:text-[#85B7EB] dark:hover:text-[#B5D4F4]"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        {recentClients.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 py-10 text-center dark:border-gray-700">
            <p className="font-medium text-gray-900 dark:text-gray-50">
              Start your first client
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Add a client to start tracking progress and coaching notes.
            </p>
            <Link
              href="/clients"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#185FA5] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0C447C]"
            >
              <UserPlus className="h-4 w-4" aria-hidden="true" />
              Add client
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {recentClients.map((client, i) => (
              <Link
                key={client.id}
                href={`/clients/${client.id}`}
                className="flex items-center justify-between rounded-lg p-3 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#185FA5] bg-[#E6F1FB] hover:bg-[#B5D4F4] dark:bg-[#0C447C]/20 dark:hover:bg-[#0C447C]/30"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#378ADD] text-sm font-medium text-white">
                    {client.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-50">
                      {client.fullName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {client.goal}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 text-sm text-gray-400 dark:text-gray-500">
                  {client.createdAt.toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
