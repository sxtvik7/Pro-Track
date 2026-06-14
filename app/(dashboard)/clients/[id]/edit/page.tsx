import { prisma } from "@/lib/prisma";
import { getCurrentTrainer } from "@/lib/current-trainer";
import { notFound } from "next/navigation";
import ClientForm from "@/components/forms/client-form";

interface EditClientPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditClientPage({
  params,
}: EditClientPageProps) {
  const { id } = await params;

  const trainer = await getCurrentTrainer();

  if (!trainer) {
    return null;
  }

  const client = await prisma.client.findFirst({
    where: {
      id,
      trainerId: trainer.id,
    },
  });

  if (!client) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">
        Edit Client
      </h1>

      <ClientForm
        initialData={{
            id: client.id,
            fullName: client.fullName,
            age: client.age,
            phone: client.phone,
            goal: client.goal,
        }}
        />
    </div>
  );
}