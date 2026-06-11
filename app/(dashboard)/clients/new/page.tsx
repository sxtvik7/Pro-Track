import ClientForm from "@/components/forms/client-form";

export default function NewClientPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">
        Add Client
      </h1>

      <ClientForm />
    </div>
  );
}