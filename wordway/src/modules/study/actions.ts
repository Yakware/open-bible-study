"use server";
import { db } from "@/lib/db";
import {
  getAllVersions,
  getBooksByVersion,
  getVersesForChapter,
} from "@/lib/db/queries";
import { books, chapters, versions } from "@/lib/db/schema";
import { checkAuthenticated } from "@/utils/server-utils";
import { and, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export async function getVersions() {
  await checkAuthenticated();

  return getAllVersions();
}

export async function getBooks(versionName: string) {
  await checkAuthenticated();

  if (!versionName) {
    return [];
  }

  return getBooksByVersion(versionName);
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

  return getVersesForChapter(versionName, bookName, chapterNumber);
}
