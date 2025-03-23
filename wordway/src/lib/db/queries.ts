import { and, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { db } from ".";
import { books, chapters, verses, versions } from "./schema";

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

export const getVersesForChapter = unstable_cache(
  async (versionName: string, bookName: string, chapterNumber: string) => {
    const data = await db
      .select({
        id: verses.id,
        chapterId: verses.chapterId,
        number: verses.number,
        text: verses.text,
        createdAt: verses.createdAt,
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
