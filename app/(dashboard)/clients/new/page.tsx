import ClientForm from "@/components/forms/client-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewClientPage() {
  return (
    <div className="mx-auto max-w-lg space-y-6">
      <Link
        href="/clients"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Clients
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
          Add client
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Enter their details to start tracking progress and notes.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <ClientForm />
      </div>
    </div>
  );
}