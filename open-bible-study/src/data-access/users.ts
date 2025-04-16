import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getUserSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session || { session: null, user: null };
}
