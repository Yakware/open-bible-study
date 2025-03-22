"use server";
import { db } from "@/lib/db";
import { books, chapters, verses, versions } from "@/lib/db/schema";
import { checkAuthenticated } from "@/utils/server-utils";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export async function getVersions() {
  await checkAuthenticated();

  const cachedData = unstable_cache(
    async () => {
      const data = await db.select().from(versions);

      return data;
    },
    ["versions"],
    { revalidate: 3600 }
  );

  return cachedData();
}

export async function getBooks(versionId: number) {
  await checkAuthenticated();

  if (!versionId || isNaN(versionId)) {
    return [];
  }

  const cachedData = unstable_cache(
    async (versionId: number) => {
      const data = await db
        .select()
        .from(books)
        .where(eq(books.version_id, versionId))
        .orderBy(books.position);

      return data;
    },
    ["books"],
    { revalidate: 3600 }
  );

  return cachedData(versionId);
}

export async function getChapters(bookId: number) {
  await checkAuthenticated();

  if (!bookId || isNaN(bookId)) {
    return [];
  }

  const cachedData = unstable_cache(
    async (bookId: number) => {
      const data = await db
        .select()
        .from(chapters)
        .where(eq(chapters.book_id, bookId))
        .orderBy(chapters.position);

      return data;
    },
    ["chapters"],
    { revalidate: 3600 }
  );

  return cachedData(bookId);
}

export async function getVerses(chapterId: number) {
  await checkAuthenticated();

  if (!chapterId || isNaN(chapterId)) {
    return [];
  }

  const cachedData = unstable_cache(
    async (chapterId: number) => {
      const data = await db
        .select()
        .from(verses)
        .where(eq(verses.chapter_id, chapterId))
        .orderBy(verses.number);

      return data;
    },
    ["chapters"],
    { revalidate: 3600 }
  );

  return cachedData(chapterId);
}
