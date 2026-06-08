import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function getCurrentTrainer() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  let trainer = await prisma.trainer.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!trainer) {
    const user = await currentUser();

    trainer = await prisma.trainer.create({
      data: {
        clerkUserId: userId,
        fullName: user?.fullName ?? "",
      },
    });
  }

  return trainer;
}