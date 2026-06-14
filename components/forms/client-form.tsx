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

export default function ClientForm({
  initialData,
}: ClientFormProps) {
  
  const formAction = initialData?.id
    ? updateClient.bind(null, initialData.id)
    : createClient;

    const isEditing = !!initialData?.id;

  return (
    <form className="space-y-4" action={formAction}>
      <div>
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          className="w-full border p-2 rounded"
          defaultValue={initialData?.fullName}
        />
      </div>

      <div>
        <label>Age</label>
        <input
          type="number"
          name="age"
          className="w-full border p-2 rounded"
          defaultValue={initialData?.age ?? ""}
        />
      </div>

      <div>
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          className="w-full border p-2 rounded"
          defaultValue={initialData?.phone ?? ""}
        />
      </div>

      <div>
        <label>Goal</label>
        <input
          type="text"
          name="goal"
          className="w-full border p-2 rounded"
          defaultValue={initialData?.goal ?? ""}
        />
      </div>

      <button
        type="submit"
        className="rounded border px-4 py-2 cursor-pointer"
      >
        {isEditing ? "Update Client" : "Create Client"}
      </button>
    </form>
  );
}