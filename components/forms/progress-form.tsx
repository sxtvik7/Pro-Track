import { createProgressRecord } from "@/actions/create-progress-record";

interface ProgressFormProps {
  clientId: string;
}

export default function ProgressForm({ clientId }: ProgressFormProps) {
  const formAction = createProgressRecord.bind(null, clientId);
  return (
    <form className="space-y-4" action={formAction}>
      <div>
        <label>Weight (kg)</label>
        <input
          type="number"
          step="0.1"
          name="weight"
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label>Body Fat (%)</label>
        <input
          type="number"
          step="0.1"
          name="bodyFat"
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label>Chest (cm)</label>
        <input
          type="number"
          step="0.1"
          name="chest"
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label>Waist (cm)</label>
        <input
          type="number"
          step="0.1"
          name="waist"
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label>Arms (cm)</label>
        <input
          type="number"
          step="0.1"
          name="arms"
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label>Notes</label>
        <textarea name="notes" className="w-full border p-2 rounded" />
      </div>

      <button type="submit" className="rounded border px-4 py-2">
        Add Progress Record
      </button>
    </form>
  );
}
