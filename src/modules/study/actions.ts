"use server";

import { db } from "@/lib/db";
import { books, chapters, verses, versions } from "@/lib/db/schema";
import { checkAuthenticated } from "@/utils/server-utils";
import { eq } from "drizzle-orm";

export async function getVersions() {
  await checkAuthenticated();

  const data = await db.select().from(versions);

  return data;
}

export async function getBooks(versionId: number) {
  await checkAuthenticated();

  if (!versionId || isNaN(versionId)) {
    return [];
  }

  const data = await db
    .select()
    .from(books)
    .where(eq(books.version_id, versionId))
    .orderBy(books.position);

  return data;
}

export async function getChapters(bookId: number) {
  await checkAuthenticated();

  if (!bookId || isNaN(bookId)) {
    return [];
  }

  const data = await db
    .select()
    .from(chapters)
    .where(eq(chapters.book_id, bookId))
    .orderBy(chapters.position);

  return data;
}

export async function getVerses(chapterId: number) {
  await checkAuthenticated();

  if (!chapterId || isNaN(chapterId)) {
    return [];
  }

  const data = await db
    .select()
    .from(verses)
    .where(eq(verses.chapter_id, chapterId))
    .orderBy(verses.number);

  return data;
}
