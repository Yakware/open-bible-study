import { login } from "@/features/auth/actions";

export async function GET() {
  await login();
}
