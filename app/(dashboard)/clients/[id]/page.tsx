import { deleteClient } from "@/actions/delete-client";
import { getCurrentTrainer } from "@/lib/current-trainer";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Cake,
  NotebookText,
  Pencil,
  Percent,
  Phone,
  Scale,
  Target,
  Trash2,
  TrendingUp,
} from "lucide-react";

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
    <div className="space-y-6">
      <Link
        href="/clients"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Clients
      </Link>

      {/* Identity header */}
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#378ADD] text-lg font-medium text-white">
          {client.fullName
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase()}
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold text-gray-900 dark:text-gray-50 sm:text-2xl">
            {client.fullName}
          </h1>
          {client.goal && (
            <p className="mt-0.5 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <Target className="h-3.5 w-3.5" aria-hidden="true" />
              {client.goal}
            </p>
          )}
        </div>
      </div>

      {/* Latest Progress */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-50">
          <TrendingUp
            className="h-4 w-4 text-[#0C447C] dark:text-[#85B7EB]"
            aria-hidden="true"
          />
          Latest progress
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-[#E6F1FB] p-3 dark:bg-[#0C447C]/20">
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#0C447C] dark:text-[#85B7EB]">
              <Scale className="h-3.5 w-3.5" aria-hidden="true" />
              Weight
            </div>
            <p className="mt-1 text-xl font-bold text-gray-900 dark:text-gray-50">
              {latestProgress?.weight ?? "—"}
              {latestProgress?.weight != null && (
                <span className="ml-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  kg
                </span>
              )}
            </p>
          </div>

          <div className="rounded-lg bg-[#E6F1FB] p-3 dark:bg-[#0C447C]/20">
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#0C447C] dark:text-[#85B7EB]">
              <Percent className="h-3.5 w-3.5" aria-hidden="true" />
              Body fat
            </div>
            <p className="mt-1 text-xl font-bold text-gray-900 dark:text-gray-50">
              {latestProgress?.bodyFat ?? "—"}
              {latestProgress?.bodyFat != null && (
                <span className="ml-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  %
                </span>
              )}
            </p>
          </div>
        </div>

        <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
          Last updated:{" "}
          {latestProgress
            ? latestProgress.date.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "No records yet"}
        </p>
      </div>

      {/* Client Information */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 font-semibold text-gray-900 dark:text-gray-50">
          Client information
        </h2>

        <dl className="space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <Cake
              className="h-4 w-4 shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <dt className="text-gray-500 dark:text-gray-400">Age</dt>
            <dd className="ml-auto font-medium text-gray-900 dark:text-gray-50">
              {client.age ?? "Not provided"}
            </dd>
          </div>

          <div className="flex items-center gap-3">
            <Phone
              className="h-4 w-4 shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <dt className="text-gray-500 dark:text-gray-400">Phone</dt>
            <dd className="ml-auto font-medium text-gray-900 dark:text-gray-50">
              {client.phone ?? "Not provided"}
            </dd>
          </div>

          <div className="flex items-center gap-3">
            <Target
              className="h-4 w-4 shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <dt className="text-gray-500 dark:text-gray-400">Goal</dt>
            <dd className="ml-auto font-medium text-gray-900 dark:text-gray-50">
              {client.goal ?? "Not provided"}
            </dd>
          </div>
        </dl>
      </div>

      {/* Primary actions */}
      <div className="grid grid-cols-3 gap-2">
        <Link
          href={`/clients/${client.id}/edit`}
          className="flex flex-col items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-3 text-xs font-medium text-gray-700 transition hover:border-[#85B7EB] hover:bg-[#E6F1FB]/40 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-[#0C447C]"
        >
          <Pencil className="h-4 w-4" aria-hidden="true" />
          Edit
        </Link>

        <Link
          href={`/clients/${client.id}/progress`}
          className="flex flex-col items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-3 text-xs font-medium text-gray-700 transition hover:border-[#85B7EB] hover:bg-[#E6F1FB]/40 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-[#0C447C]"
        >
          <TrendingUp className="h-4 w-4" aria-hidden="true" />
          Progress
        </Link>

        <Link
          href={`/clients/${client.id}/notes`}
          className="flex flex-col items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-3 text-xs font-medium text-gray-700 transition hover:border-[#85B7EB] hover:bg-[#E6F1FB]/40 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-[#0C447C]"
        >
          <NotebookText className="h-4 w-4" aria-hidden="true" />
          Notes
        </Link>
      </div>

      {/* Destructive action — visually separated */}
      <div className="border-t border-gray-200 pt-4 dark:border-gray-800">
        <form action={deleteClient.bind(null, client.id)}>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#A32D2D] transition hover:bg-[#FCEBEB] dark:text-[#F09595] dark:hover:bg-[#501313]/20"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete client
          </button>
        </form>
      </div>
    </div>
  );
}
