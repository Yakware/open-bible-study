"use server";
import {
  createNote as createNoteInDb,
  getNotesByUserIdChapterId,
} from "@/data-access/notes";
import { getUserSession } from "@/data-access/users";
import { Note } from "@/lib/db/schema";
import { addNoteFormSchema } from "./components/add-note-dialog/add-note-form-schema";

export async function fetchNotes(chapterId: number | undefined) {
  const { session, user } = await getUserSession();

  if (!session) {
    throw new Error(`Not logged in`);
  }

  if (!chapterId) {
    throw new Error("Invalid data");
  }

  return getNotesByUserIdChapterId(user.id, chapterId);
}

export async function createNote(newNote: Pick<Note, "content" | "verseId">) {
  const { session, user } = await getUserSession();

  if (!session) {
    throw new Error(`Not logged in`);
  }

  const { error, data } = await addNoteFormSchema.safeParseAsync(newNote);

  if (error) {
    throw new Error("Invalid data");
  }

  await createNoteInDb({ ...data, userId: user.id });
}
