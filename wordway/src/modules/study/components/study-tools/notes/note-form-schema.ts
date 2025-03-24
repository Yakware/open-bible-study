import { z } from "zod";

export const noteFormSchema = z.object({
  text: z.string().min(1, "Please enter text for your note"),
});

export type NoteFormType = z.infer<typeof noteFormSchema>;
