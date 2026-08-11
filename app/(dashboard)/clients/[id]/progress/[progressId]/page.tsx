import { prisma } from "@/lib/prisma";
import { getCurrentTrainer } from "@/lib/current-trainer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Pencil, Percent, Ruler, Scale } from "lucide-react";

interface ProgressRecordPageProps {
  params: Promise<{
    id: string;
    progressId: string;
  }>;
}

export default async function ProgressRecordPage({ params }: ProgressRecordPageProps) {
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
    include: {
      client: {
        select: { fullName: true },
      },
    },
  });

  if (!progressRecord) {
    notFound();
  }

  const metrics = [
    { label: "Weight", value: progressRecord.weight, unit: "kg", icon: Scale },
    { label: "Body fat", value: progressRecord.bodyFat, unit: "%", icon: Percent },
    { label: "Chest", value: progressRecord.chest, unit: "cm", icon: Ruler },
    { label: "Waist", value: progressRecord.waist, unit: "cm", icon: Ruler },
    { label: "Arms", value: progressRecord.arms, unit: "cm", icon: Ruler },
  ];

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <Link
        href={`/clients/${id}/progress`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Progress history
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            {progressRecord.date.toLocaleDateString(undefined, {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {progressRecord.client.fullName}
          </p>
        </div>

        <Link
          href={`/clients/${id}/progress/${progressId}/edit`}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-[#85B7EB] hover:bg-[#E6F1FB]/40 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-[#0C447C]"
        >
          <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
          Edit
        </Link>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-50">
          Measurements
        </h2>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {metrics.map(({ label, value, unit, icon: Icon }) => (
            <div key={label} className="rounded-lg bg-[#E6F1FB] p-3 dark:bg-[#0C447C]/20">
              <div className="flex items-center gap-1.5 text-xs font-medium text-[#0C447C] dark:text-[#85B7EB]">
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {label}
              </div>
              <p className="mt-1 text-lg font-bold text-gray-900 dark:text-gray-50">
                {value ?? "—"}
                {value != null && (
                  <span className="ml-1 text-xs font-normal text-gray-500 dark:text-gray-400">{unit}</span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>

      {progressRecord.notes && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-50">
            Notes
          </h2>
          <p className="whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-400">
            {progressRecord.notes}
          </p>
        </div>
      )}
    </div>
  );
}