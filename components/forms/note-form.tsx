import { createNote } from "@/actions/create-note";
import { updateNote } from "@/actions/update-note";

interface NoteFormProps {
  clientId: string;
  initialData?: {
    id: string;
    content: string;
    mood: string | null;
  };
}

export default function NoteForm({ clientId, initialData }: NoteFormProps) {
  const formAction = initialData?.id
    ? updateNote.bind(null, initialData.id)
    : createNote.bind(null, clientId);

  return (
    <form className="space-y-4" action={formAction}>
      <div>
        <label>Note</label>

        <textarea
          name="content"
          rows={6}
          defaultValue={initialData?.content}
          className="w-full rounded border p-2"
        />
      </div>

      <button type="submit"  className="rounded border px-4 py-2">{initialData ? "Update Note" : "Add Note"}</button>
    </form>
  );
}
