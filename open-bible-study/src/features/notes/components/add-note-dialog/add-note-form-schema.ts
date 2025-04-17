import { z } from "zod";

export const addNoteFormSchema = z.object({
  content: z.string().min(1, "Please enter a note"),
});

export type AddNoteFormValues = z.infer<typeof addNoteFormSchema>;
