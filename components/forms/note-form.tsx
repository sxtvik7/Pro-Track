"use client";

import { createNote } from "@/actions/create-note";
import { updateNote } from "@/actions/update-note";
import { Field, inputStyles } from "@/components/ui/field";

interface NoteFormProps {
  clientId: string;
  initialData?: {
    id: string;
    content: string;
    mood: string | null;
  };
}

const MOOD_OPTIONS = ["Motivated", "Consistent", "Struggling", "Fatigued", "Injured"];

export default function NoteForm({ clientId, initialData }: NoteFormProps) {
  const formAction = initialData?.id
    ? updateNote.bind(null, initialData.id)
    : createNote.bind(null, clientId);

  const isEditing = !!initialData?.id;

  return (
    <form className="space-y-5" action={formAction}>
      <Field label="Note" htmlFor="content" required>
        <textarea
          id="content"
          name="content"
          rows={6}
          required
          placeholder="What did you observe this session?"
          defaultValue={initialData?.content}
          className={inputStyles}
        />
      </Field>

      <Field label="Mood" htmlFor="mood">
        <select
          id="mood"
          name="mood"
          defaultValue={initialData?.mood ?? ""}
          className={inputStyles}
        >
          <option value="">No mood selected</option>
          {MOOD_OPTIONS.map((mood) => (
            <option key={mood} value={mood}>
              {mood}
            </option>
          ))}
        </select>
      </Field>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-lg bg-[#185FA5] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#0C447C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#185FA5]"
      >
        {isEditing ? "Update note" : "Add note"}
      </button>
    </form>
  );
}