import { db } from "@/lib/db";
import { books, chapters, verses, versions } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

const revalidate = 3600;

export async function getVersesByVersionBookChapter(
  versionName: string,
  bookName: string,
  chapterNumber: string
) {
  if (!chapterNumber) {
    return [];
  }

  const cachedData = unstable_cache(
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
    { revalidate }
  );

  return cachedData(versionName, bookName, chapterNumber);
}
