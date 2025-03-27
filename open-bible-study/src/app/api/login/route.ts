import { login } from "@/modules/auth/actions";

export async function GET() {
  await login();
}
