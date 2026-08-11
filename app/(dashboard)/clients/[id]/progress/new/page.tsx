import { prisma } from "@/lib/prisma";
import { getCurrentTrainer } from "@/lib/current-trainer";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProgressForm from "@/components/forms/progress-form";

interface NewProgressPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NewProgressPage({ params }: NewProgressPageProps) {
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
  });

  if (!client) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <Link
        href={`/clients/${client.id}/progress`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Progress history
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
          Add progress record
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          New check-in for {client.fullName}.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <ProgressForm clientId={client.id} />
      </div>
    </div>
  );
}