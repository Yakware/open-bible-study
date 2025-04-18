import { db } from "@/lib/db";
import { books, Chapter, chapters, versions } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

const revalidate = 3600;

export async function getChapters(
  versionName: string,
  bookName: string
): Promise<Chapter[]> {
  if (!bookName || !versionName) {
    return [];
  }

  const cachedData = unstable_cache(
    async (versionName: string, bookName: string) => {
      const data = await db
        .select({
          id: chapters.id,
          bookId: chapters.bookId,
          number: chapters.number,
          position: chapters.position,
          createdAt: chapters.createdAt,
          updatedAt: chapters.updatedAt,
        })
        .from(chapters)
        .innerJoin(books, eq(chapters.bookId, books.id))
        .innerJoin(versions, eq(books.versionId, versions.id))
        .where(and(eq(versions.name, versionName), eq(books.name, bookName)))
        .orderBy(chapters.position);

      return data;
    },
    [],
    { revalidate }
  );

  return cachedData(versionName, bookName);
}

export async function getChapter(
  versionName: string,
  bookName: string,
  chapterNumber: string
): Promise<Chapter | null> {
  if (!bookName || !versionName || !chapterNumber) {
    return null;
  }

  const cachedData = unstable_cache(
    async (versionName: string, bookName: string, chapterNumber: string) => {
      const [data] = await db
        .select({
          id: chapters.id,
          bookId: chapters.bookId,
          number: chapters.number,
          position: chapters.position,
          createdAt: chapters.createdAt,
          updatedAt: chapters.updatedAt,
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
        )
        .limit(1);

      return data;
    },
    [],
    { revalidate }
  );

  return cachedData(versionName, bookName, chapterNumber);
}
