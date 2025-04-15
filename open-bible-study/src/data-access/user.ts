import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq, InferInsertModel } from "drizzle-orm";

export async function getUserByExternalId(externalId: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.externalUserId, externalId))
    .limit(1);
  return user;
}

export async function createOrUpdateUser(user: InferInsertModel<typeof users>) {
  const updateData = {
    name: user.name,
    email: user.email,
    onboardingCompletedAt: user.onboardingCompletedAt || new Date(),
  };

  await db
    .insert(users)
    .values({
      ...updateData,
      externalUserId: user.externalUserId,
    })
    .onConflictDoUpdate({
      target: users.externalUserId,
      set: updateData,
    });
}
