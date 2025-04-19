"use server";
import {
  createNote as createNoteInDb,
  updateNote as updateNoteInDb,
  deleteNote as deleteNoteFromDb,
  getNotesByUserIdChapterId,
} from "@/data-access/notes";
import { getUserSession } from "@/data-access/users";
import { Note } from "@/lib/db/schema";
import { addNoteFormSchema } from "./components/add-note-dialog/add-note-form-schema";
import { updateNoteFormSchema } from "./components/chapter-notes-list/update-note-form-schema";

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

export async function updateNote(newNote: Pick<Note, "content" | "id">) {
  const { session, user } = await getUserSession();

  if (!session) {
    throw new Error(`Not logged in`);
  }

  const { error, data } = await updateNoteFormSchema.safeParseAsync(newNote);

  if (error) {
    throw new Error("Invalid data");
  }

  await updateNoteInDb(data.id, user.id, data.content);
}

export async function deleteNote(id: number) {
  const { session, user } = await getUserSession();

  if (!session) {
    throw new Error(`Not logged in`);
  }

  await deleteNoteFromDb(id, user.id);
}
