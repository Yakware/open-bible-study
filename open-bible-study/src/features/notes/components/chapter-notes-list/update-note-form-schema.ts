import { z } from "zod";

export const updateNoteFormSchema = z.object({
  id: z.number(),
  content: z.string().min(1, "Note can not be blank"),
});

export type UpdateNoteFormValues = z.infer<typeof updateNoteFormSchema>;
