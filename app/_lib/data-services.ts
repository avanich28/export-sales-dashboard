"use server";

import { userDataSchema } from "@/app/_utils/types";
import { auth } from "./auth";
import { prisma } from "./prisma";

export async function getUserData() {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  const userId = Number(session.user?.id);

  try {
    const data = await prisma.user.findFirst({
      where: { id: userId },
      select: { name: true, avatar: true },
    });

    return userDataSchema.parse(data);
  } catch (error) {
    console.error(error);
    throw new Error("User data could not be loaded!");
  }
}
