import { getUserSession } from "@/data-access/user";
import { redirect } from "next/navigation";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const { session } = await getUserSession();

  if (session) {
    redirect("/study");
  }

  return children;
}
