"use client";

import { createProgressRecord } from "@/actions/create-progress-record";
import { updateProgressRecord } from "@/actions/update-progress-record";
import { Field, inputStyles } from "@/components/ui/field";

interface ProgressFormProps {
  clientId: string;
  initialData?: {
    id?: string;
    weight: number | null;
    bodyFat: number | null;
    chest: number | null;
    waist: number | null;
    arms: number | null;
    notes: string | null;
  };
}

export default function ProgressForm({ clientId, initialData }: ProgressFormProps) {
  const formAction = initialData?.id
    ? updateProgressRecord.bind(null, initialData.id)
    : createProgressRecord.bind(null, clientId);

  const isEditing = !!initialData?.id;

  return (
    <form className="space-y-6" action={formAction}>
      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-50">
          Body composition
        </legend>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Weight" htmlFor="weight" suffix="kg">
            <input
              id="weight"
              type="number"
              step="0.1"
              inputMode="decimal"
              name="weight"
              placeholder="0.0"
              className={inputStyles}
              defaultValue={initialData?.weight ?? ""}
            />
          </Field>

          <Field label="Body fat" htmlFor="bodyFat" suffix="%">
            <input
              id="bodyFat"
              type="number"
              step="0.1"
              inputMode="decimal"
              name="bodyFat"
              placeholder="0.0"
              className={inputStyles}
              defaultValue={initialData?.bodyFat ?? ""}
            />
          </Field>
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-50">
          Measurements
        </legend>
        <div className="grid grid-cols-3 gap-3">
          <Field label="Chest" htmlFor="chest" suffix="cm">
            <input
              id="chest"
              type="number"
              step="0.1"
              inputMode="decimal"
              name="chest"
              placeholder="0.0"
              className={inputStyles}
              defaultValue={initialData?.chest ?? ""}
            />
          </Field>

          <Field label="Waist" htmlFor="waist" suffix="cm">
            <input
              id="waist"
              type="number"
              step="0.1"
              inputMode="decimal"
              name="waist"
              placeholder="0.0"
              className={inputStyles}
              defaultValue={initialData?.waist ?? ""}
            />
          </Field>

          <Field label="Arms" htmlFor="arms" suffix="cm">
            <input
              id="arms"
              type="number"
              step="0.1"
              inputMode="decimal"
              name="arms"
              placeholder="0.0"
              className={inputStyles}
              defaultValue={initialData?.arms ?? ""}
            />
          </Field>
        </div>
      </fieldset>

      <Field label="Notes" htmlFor="notes">
        <textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="Any observations from this check-in..."
          className={inputStyles}
          defaultValue={initialData?.notes ?? ""}
        />
      </Field>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-lg bg-[#185FA5] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#0C447C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#185FA5]"
      >
        {isEditing ? "Update record" : "Add progress record"}
      </button>
    </form>
  );
}