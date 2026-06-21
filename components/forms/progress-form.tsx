import { createProgressRecord } from "@/actions/create-progress-record";
import { updateProgressRecord } from "@/actions/update-progress-record";

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

export default function ProgressForm({
  clientId,
  initialData,
}: ProgressFormProps) {
  const formAction = initialData?.id
    ? updateProgressRecord.bind(null, initialData.id)
    : createProgressRecord.bind(null, clientId);

  const isEditing = !!initialData?.id;

  return (
    <form className="space-y-4" action={formAction}>
      <div>
        <label>Weight (kg)</label>
        <input
          type="number"
          step="0.1"
          name="weight"
          className="w-full border p-2 rounded"
          defaultValue={initialData?.weight ?? ""}
        />
      </div>

      <div>
        <label>Body Fat (%)</label>
        <input
          type="number"
          step="0.1"
          name="bodyFat"
          className="w-full border p-2 rounded"
          defaultValue={initialData?.bodyFat ?? ""}
        />
      </div>

      <div>
        <label>Chest (cm)</label>
        <input
          type="number"
          step="0.1"
          name="chest"
          className="w-full border p-2 rounded"
          defaultValue={initialData?.chest ?? ""}
        />
      </div>

      <div>
        <label>Waist (cm)</label>
        <input
          type="number"
          step="0.1"
          name="waist"
          className="w-full border p-2 rounded"
          defaultValue={initialData?.waist ?? ""}
        />
      </div>

      <div>
        <label>Arms (cm)</label>
        <input
          type="number"
          step="0.1"
          name="arms"
          className="w-full border p-2 rounded"
          defaultValue={initialData?.arms ?? ""}
        />
      </div>

      <div>
        <label>Notes</label>
        <textarea
          name="notes"
          className="w-full border p-2 rounded"
          defaultValue={initialData?.notes ?? ""}
        />
      </div>

      <button type="submit" className="rounded border px-4 py-2">
        {isEditing ? "Update Record" : "Add Progress Record"}
      </button>
    </form>
  );
}
