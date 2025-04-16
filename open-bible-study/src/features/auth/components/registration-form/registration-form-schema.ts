import { zodPassword } from "@/utils/check-password-strength";
import { z } from "zod";

export const registrationFormSchema = z.object({
  name: z.string().min(1, "Please enter a name"),
  email: z.string().email("Please enter a valid email"),
  password: zodPassword,
});

export type RegistrationFormValues = z.infer<typeof registrationFormSchema>;
