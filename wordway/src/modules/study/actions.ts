"use server";
import { db } from "@/lib/db";
import { books, chapters, verses, versions } from "@/lib/db/schema";
import { checkAuthenticated } from "@/utils/server-utils";
import { and, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export async function getVersions() {
  await checkAuthenticated();

  const cachedData = unstable_cache(
    async () => {
      const data = await db.select().from(versions);

      return data;
    },
    [],
    { revalidate: 3600 }
  );

  return cachedData();
}

export async function getBooks(versionName: string) {
  await checkAuthenticated();

  if (!versionName) {
    return [];
  }

  const cachedData = unstable_cache(
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
    { revalidate: 3600 }
  );

  return cachedData(versionName);
}

export async function getChapters(versionName: string, bookName: string) {
  await checkAuthenticated();

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
    { revalidate: 3600 }
  );

  return cachedData(versionName, bookName);
}

export async function getVerses(
  versionName: string,
  bookName: string,
  chapterNumber: string
) {
  await checkAuthenticated();

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
    { revalidate: 3600 }
  );

  return cachedData(versionName, bookName, chapterNumber);
}
