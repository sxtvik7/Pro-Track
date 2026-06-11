import { createClient } from "@/actions/create-client";

export default function ClientForm() {
  return (
    <form className="space-y-4" action={createClient}>
      <div>
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label>Age</label>
        <input
          type="number"
          name="age"
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label>Goal</label>
        <input
          type="text"
          name="goal"
          className="w-full border p-2 rounded"
        />
      </div>

      <button
        type="submit"
        className="rounded border px-4 py-2"
      >
        Create Client
      </button>
    </form>
  );
}