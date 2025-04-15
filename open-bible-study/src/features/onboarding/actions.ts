"use server";

import { logtoConfig } from "@/app/logto";
import { createOrUpdateUser } from "@/data-access/user";
import { getLogtoContext } from "@logto/next/server-actions";

export async function completeUserProfile(name: string) {
  const { claims, isAuthenticated } = await getLogtoContext(logtoConfig);

  if (!claims || !claims.email || !isAuthenticated) {
    return { error: "User not logged in", response: null };
  }

  await createOrUpdateUser({
    name,
    email: claims.email,
    externalUserId: claims.sub,
  });

  return { error: null, response: "success" };
}
