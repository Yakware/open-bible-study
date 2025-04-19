import { db } from "@/lib/db";
import {
  books,
  chapters,
  InsertNote,
  notes,
  NoteWithRelations,
  users,
  verses,
  versions,
} from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";

export async function createNote(newNote: InsertNote) {
  await db.insert(notes).values(newNote);
}

export async function updateNote(id: number, userId: string, content: string) {
  await db
    .update(notes)
    .set({ content })
    .where(and(eq(notes.id, id), eq(notes.userId, userId)));
}

export async function deleteNote(id: number, userId: string) {
  await db.delete(notes).where(and(eq(notes.id, id), eq(notes.userId, userId)));
}

export async function getNotesByUserIdChapterId(
  userId: string,
  chapterId: number
): Promise<NoteWithRelations[]> {
  return db
    .select({
      id: notes.id,
      content: notes.content,
      verseId: notes.verseId,
      userId: notes.userId,
      createdAt: notes.createdAt,
      updatedAt: notes.updatedAt,
      version: versions,
      chapter: chapters,
      book: books,
      verse: verses,
    })
    .from(notes)
    .innerJoin(verses, eq(verses.id, notes.verseId))
    .innerJoin(chapters, eq(chapters.id, verses.chapterId))
    .innerJoin(books, eq(books.id, chapters.bookId))
    .innerJoin(versions, eq(versions.id, books.versionId))
    .innerJoin(users, eq(users.id, userId))
    .where(and(eq(users.id, userId), eq(chapters.id, chapterId)))
    .orderBy(verses.number);
}
