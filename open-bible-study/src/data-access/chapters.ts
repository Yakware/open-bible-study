import { db } from "@/lib/db";
import { books, chapters, versions } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

const revalidate = 3600;

export async function getChaptersByVersionBook(
  versionName: string,
  bookName: string
) {
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
