import { zodPassword } from "@/utils/check-password-strength";
import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: zodPassword,
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
