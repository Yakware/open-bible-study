import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function getUserByExternalId(externalId: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.externalUserId, externalId))
    .limit(1);
  return user;
}
