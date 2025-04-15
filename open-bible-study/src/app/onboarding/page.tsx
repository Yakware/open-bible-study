import { getLogtoContext } from "@logto/next/server-actions";
import { redirect } from "next/navigation";
import { logtoConfig } from "../logto";
import { getUserByExternalId } from "@/data-access/user";

export default async function OnboardingPage() {
  const { claims, isAuthenticated } = await getLogtoContext(logtoConfig);

  if (!claims || !isAuthenticated) {
    redirect("/api/login");
  }

  const externalId = claims.sub;
  const user = await getUserByExternalId(externalId);
  if (user?.onboardingCompletedAt) {
    redirect("/study");
  }

  return null;
}
