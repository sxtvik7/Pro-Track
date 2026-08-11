import { prisma } from "@/lib/prisma";
import { getCurrentTrainer } from "@/lib/current-trainer";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowDown, ArrowUp, Minus, Plus, Scale } from "lucide-react";

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
      <Link
        href={`/clients/${client.id}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {client.fullName}
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Progress history</h1>

        <Link
          href={`/clients/${client.id}/progress/new`}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#185FA5] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#0C447C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#185FA5]"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add record
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">Current weight</p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-50">
            {currentWeight ?? "—"}
            {currentWeight != null && <span className="ml-1 text-base font-normal text-gray-500 dark:text-gray-400">kg</span>}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">Starting weight</p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-50">
            {startingWeight ?? "—"}
            {startingWeight != null && <span className="ml-1 text-base font-normal text-gray-500 dark:text-gray-400">kg</span>}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">Weight change</p>
          <p className="mt-1 flex items-center gap-1 text-2xl font-bold text-gray-900 dark:text-gray-50">
            {weightChange !== null ? (
              <>
                {weightChange > 0 ? (
                  <ArrowUp className="h-5 w-5 text-gray-400" aria-hidden="true" />
                ) : weightChange < 0 ? (
                  <ArrowDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                ) : (
                  <Minus className="h-5 w-5 text-gray-400" aria-hidden="true" />
                )}
                {Math.abs(weightChange).toFixed(1)}
                <span className="text-base font-normal text-gray-500 dark:text-gray-400">kg</span>
              </>
            ) : (
              "—"
            )}
          </p>
        </div>
      </div>

      {/* Progress History */}
      <div className="space-y-2">
        {records.length === 0 ? (
          <div className="flex flex-col items-center rounded-xl border border-dashed border-gray-300 py-12 text-center dark:border-gray-700">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E6F1FB] dark:bg-[#0C447C]/30">
              <Scale className="h-6 w-6 text-[#0C447C] dark:text-[#85B7EB]" aria-hidden="true" />
            </div>
            <p className="mt-4 font-medium text-gray-900 dark:text-gray-50">No progress records yet</p>
            <p className="mt-1 max-w-xs text-sm text-gray-500 dark:text-gray-400">
              Add a check-in to start tracking {client.fullName}'s progress over time.
            </p>
            <Link
              href={`/clients/${client.id}/progress/new`}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#185FA5] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0C447C]"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add record
            </Link>
          </div>
        ) : (
          records.map((record) => (
            <Link
              key={record.id}
              href={`/clients/${client.id}/progress/${record.id}`}
              className="block rounded-xl border border-gray-200 bg-white p-4 transition hover:border-[#85B7EB] hover:bg-[#E6F1FB]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#185FA5] dark:border-gray-800 dark:bg-gray-900 dark:hover:border-[#0C447C] dark:hover:bg-[#0C447C]/10"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                  {record.date.toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                <span>
                  <span className="font-medium text-gray-900 dark:text-gray-50">{record.weight ?? "—"}</span> kg
                </span>
                <span>
                  <span className="font-medium text-gray-900 dark:text-gray-50">{record.bodyFat ?? "—"}</span> % body fat
                </span>
                <span>
                  <span className="font-medium text-gray-900 dark:text-gray-50">{record.waist ?? "—"}</span> cm waist
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}