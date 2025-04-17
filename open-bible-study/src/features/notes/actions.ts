"use server";

import { createNote } from "@/data-access/notes";
import { getUserSession } from "@/data-access/users";
import { Note } from "@/lib/db/schema";
import { addNoteFormSchema } from "./components/add-note-dialog/add-note-form-schema";

export async function createNoteAction(
  newNote: Pick<Note, "content" | "verseId">
) {
  const { session, user } = await getUserSession();

  if (!session) {
    throw new Error(`Not logged in`);
  }

  const { error, data } = await addNoteFormSchema.safeParseAsync(newNote);

  if (error) {
    throw new Error("Invalid data");
  }

  await createNote({ ...data, userId: user.id });
}
