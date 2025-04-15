import { z } from "zod";

export const onboardingFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type OnboardingFormValues = z.infer<typeof onboardingFormSchema>;
