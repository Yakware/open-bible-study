"use server";
import {
  getAllVersions,
  getBooksByVersion,
  getChaptersForBook,
  getUserNotesForChapter,
  getVersesForChapter,
  insertNote,
} from "@/lib/db/queries";
import { Verse } from "@/lib/db/schema";
import { checkAuthenticated, getLoggedInUser } from "@/utils/server-utils";

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

  return getChaptersForBook(versionName, bookName);
}

export async function getVerses(
  versionName: string,
  bookName: string,
  chapterNumber: string
): Promise<Verse[]> {
  await checkAuthenticated();

  if (!chapterNumber) {
    return [];
  }

  return getVersesForChapter(versionName, bookName, chapterNumber);
}

export async function createNote(verseId: number, text: string) {
  const user = await getLoggedInUser();

  return insertNote(verseId, text, user.sub);
}

export async function getNotesForChapter(chapterId: number) {
  const user = await getLoggedInUser();

  return getUserNotesForChapter(user.sub, chapterId);
}
