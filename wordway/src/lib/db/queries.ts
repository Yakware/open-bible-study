import { and, desc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { db } from ".";
import {
  books,
  Chapter,
  chapters,
  notes,
  users,
  Verse,
  verses,
  versions,
} from "./schema";

const DEFAULT_CACHE_TIME = process.env.NODE_ENV !== "production" ? 1 : 3600;

export const getAllVersions = unstable_cache(
  async () => {
    const data = await db.select().from(versions);

    return data;
  },
  [],
  { revalidate: DEFAULT_CACHE_TIME }
);

export const getBooksByVersion = unstable_cache(
  async (versionName: string) => {
    const data = await db
      .select({
        id: books.id,
        name: books.name,
        versionId: books.versionId,
        abbreviation: books.abbreviation,
        position: books.position,
        testament: books.testament,
        createdAt: books.createdAt,
      })
      .from(books)
      .innerJoin(versions, eq(books.versionId, versions.id))
      .where(eq(versions.name, versionName))
      .orderBy(books.position);

    return data;
  },
  [],
  { revalidate: DEFAULT_CACHE_TIME }
);

export const getChaptersForBook = unstable_cache(
  async (versionName: string, bookName: string) => {
    const data = await db
      .select({
        id: chapters.id,
        bookId: chapters.bookId,
        number: chapters.number,
        position: chapters.position,
        createdAt: chapters.createdAt,
      })
      .from(chapters)
      .innerJoin(books, eq(chapters.bookId, books.id))
      .innerJoin(versions, eq(books.versionId, versions.id))
      .where(and(eq(versions.name, versionName), eq(books.name, bookName)))
      .orderBy(chapters.position);

    return data;
  },
  [],
  { revalidate: DEFAULT_CACHE_TIME }
);

export const getCurrentChapter = unstable_cache(
  async (
    versionName: string | undefined,
    bookName: string | undefined,
    chapterNumber: string | undefined
  ) => {
    if (!versionName || !bookName || !chapterNumber) {
      return null;
    }

    const [chapter]: Chapter[] = await db
      .select({
        id: chapters.id,
        bookId: chapters.bookId,
        number: chapters.number,
        position: chapters.position,
        createdAt: chapters.createdAt,
      })
      .from(chapters)
      .innerJoin(books, eq(chapters.bookId, books.id))
      .innerJoin(versions, eq(books.versionId, versions.id))
      .where(
        and(
          eq(versions.name, versionName),
          eq(books.name, bookName),
          eq(chapters.number, chapterNumber)
        )
      );

    return chapter;
  },
  [],
  { revalidate: DEFAULT_CACHE_TIME }
);

export const getVersesForChapter = unstable_cache(
  async (versionName: string, bookName: string, chapterNumber: string) => {
    const data: Verse[] = await db
      .select({
        id: verses.id,
        chapterId: verses.chapterId,
        number: verses.number,
        text: verses.text,
        createdAt: verses.createdAt,
        version: versions,
        chapter: chapters,
        book: books,
      })
      .from(verses)
      .innerJoin(chapters, eq(verses.chapterId, chapters.id))
      .innerJoin(books, eq(chapters.bookId, books.id))
      .innerJoin(versions, eq(books.versionId, versions.id))
      .where(
        and(
          eq(versions.name, versionName),
          eq(books.name, bookName),
          eq(chapters.number, chapterNumber)
        )
      )
      .orderBy(verses.number);

    return data;
  },
  [],
  { revalidate: DEFAULT_CACHE_TIME }
);

export const getUserByExternalId = async (externalUserId: string) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.externalUserId, externalUserId));

  if (!user) {
    throw new Error(`User not found with external id: ${externalUserId}`);
  }

  return user;
};

export const insertNote = async (
  verseId: number,
  text: string,
  externalUserId: string
) => {
  const user = await getUserByExternalId(externalUserId);

  const [newNote] = await db
    .insert(notes)
    .values({
      userId: user.id,
      verseId,
      text,
    })
    .returning({ id: notes.id });

  return newNote;
};

export const getUserNotesForChapter = async (
  externalUserId: string,
  chapterId: number
) => {
  const user = await getUserByExternalId(externalUserId);

  const userNotesForChapter = await db
    .select({
      id: notes.id,
      text: notes.text,
      createdAt: notes.createdAt,
      updatedAt: notes.updatedAt,
      chapter: chapters,
      verse: verses,
      book: books,
      version: versions,
    })
    .from(notes)
    .innerJoin(verses, eq(notes.verseId, verses.id))
    .innerJoin(chapters, eq(verses.chapterId, chapterId))
    .innerJoin(books, eq(books.id, chapters.bookId))
    .innerJoin(versions, eq(versions.id, books.versionId))
    .where(and(eq(chapters.id, chapterId), eq(notes.userId, user.id)))
    .orderBy(desc(notes.updatedAt));

  return userNotesForChapter;
};
