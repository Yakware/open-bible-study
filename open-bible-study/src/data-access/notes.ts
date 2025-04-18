import { db } from "@/lib/db";
import {
  Book,
  books,
  Chapter,
  chapters,
  InsertNote,
  Note,
  notes,
  users,
  Verse,
  verses,
  Version,
  versions,
} from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";

export async function createNote(newNote: InsertNote) {
  await db.insert(notes).values(newNote);
}

type NoteWithRelations = Note & {
  version: Version;
  chapter: Chapter;
  book: Book;
  verse: Verse;
};

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
