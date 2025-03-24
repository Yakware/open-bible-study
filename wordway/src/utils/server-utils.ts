"use server";

import { logtoConfig } from "@/app/logto";
import { getLogtoContext } from "@logto/next/server-actions";

export async function checkAuthenticated() {
  const { isAuthenticated } = await getLogtoContext(logtoConfig);

  if (!isAuthenticated) {
    throw new Error("Not authenticated");
  }

  return isAuthenticated;
}

export async function getLoggedInUser() {
  const { claims } = await getLogtoContext(logtoConfig);

  if (!claims) {
    throw new Error("User not found.");
  }

  return claims;
}
