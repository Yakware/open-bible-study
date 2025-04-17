import { z } from "zod";

export const addNoteFormSchema = z.object({
  content: z.string().min(1, "Please enter a note"),
  verseId: z.number().min(1, "Please enter a verse number"),
});

export type AddNoteFormValues = z.infer<typeof addNoteFormSchema>;
