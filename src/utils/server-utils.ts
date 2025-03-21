"use server";

import { logtoConfig } from "@/app/logto";
import { getLogtoContext } from "@logto/next/server-actions";

export async function isAuthenticated() {
  const { isAuthenticated } = await getLogtoContext(logtoConfig);
  return isAuthenticated;
}
