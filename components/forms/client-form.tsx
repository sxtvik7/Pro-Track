"use client";

import { createClient } from "@/actions/create-client";
import { updateClient } from "@/actions/update-client";

interface ClientFormProps {
  initialData?: {
    id?: string;
    fullName: string;
    age: number | null;
    phone: string | null;
    goal: string | null;
  };
}

export default function ClientForm({ initialData }: ClientFormProps) {
  const formAction = initialData?.id
    ? updateClient.bind(null, initialData.id)
    : createClient;

  const isEditing = !!initialData?.id;

  return (
    <form className="space-y-5" action={formAction}>
      <Field label="Full name" htmlFor="fullName" required>
        <input
          id="fullName"
          type="text"
          name="fullName"
          required
          placeholder="e.g. Alex Rivera"
          className={inputStyles}
          defaultValue={initialData?.fullName}
        />
      </Field>

      <Field label="Age" htmlFor="age">
        <input
          id="age"
          type="number"
          name="age"
          min={0}
          max={120}
          inputMode="numeric"
          placeholder="e.g. 28"
          className={inputStyles}
          defaultValue={initialData?.age ?? ""}
        />
      </Field>

      <Field label="Phone" htmlFor="phone">
        <input
          id="phone"
          type="tel"
          name="phone"
          inputMode="tel"
          placeholder="e.g. (555) 123-4567"
          className={inputStyles}
          defaultValue={initialData?.phone ?? ""}
        />
      </Field>

      <Field label="Goal" htmlFor="goal">
        <input
          id="goal"
          type="text"
          name="goal"
          placeholder="e.g. Build strength, lose 10 lbs"
          className={inputStyles}
          defaultValue={initialData?.goal ?? ""}
        />
      </Field>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-[#185FA5] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#0C447C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#185FA5]"
        >
          {isEditing ? "Update client" : "Create client"}
        </button>
      </div>
    </form>
  );
}

const inputStyles =
  "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-[#378ADD] focus:outline-none focus:ring-2 focus:ring-[#85B7EB]/50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50 dark:placeholder:text-gray-500";

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="ml-0.5 text-[#A32D2D] dark:text-[#F09595]">*</span>}
      </label>
      {children}
    </div>
  );
}