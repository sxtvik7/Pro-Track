"user server";

import { requireTrainer } from "@/lib/require-trainer";

export async function getTrainerProfile(){
    const trainer = await requireTrainer();
    return {
        id: trainer.id,
        name: trainer.name,
        email: trainer.email,
        phone: trainer.phone,
        bio: trainer.bio,
    }
}
