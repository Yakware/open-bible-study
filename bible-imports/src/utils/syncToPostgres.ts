import fs from "fs/promises";
import bookNames from "../data/book-names.json";
import path from "path";
import { db } from "../db";
import { books, chapters, verses, versions } from "../db/schema";

type VerseJson = {
  verse: string;
  text: string;
};

type ChapterJson = {
  chapter: string;
  verses: VerseJson[];
};

type BookJson = {
  book: string;
  chapters: ChapterJson[];
};

export const syncDataToPostgres = async () => {
  const data = await db
    .select({
      id: versions.id,
    })
    .from(versions);

  const kjvVersionId = data?.[0]?.id;
  if (!kjvVersionId) {
    throw new Error("No ID found for KJV version");
  }

  await Promise.all(
    bookNames.map(async (bookName, bookIndex) => {
      const fileName = bookName.name.replace(/ /g, "-") + ".json";
      const rawJson = await fs.readFile(
        path.join(__dirname, "..", "data", "books", fileName)
      );
      const bookJson: BookJson = JSON.parse(rawJson.toString());

      const newBook = await db
        .insert(books)
        .values({
          name: bookName.name,
          abbreviation: bookName.abbreviation,
          version_id: kjvVersionId,
          position: bookIndex,
          testament: bookName.testament,
        })
        .returning({
          id: books.id,
        });

      const newBookId = newBook?.[0]?.id;
      if (!kjvVersionId) {
        throw new Error("No ID found for book");
      }

      await Promise.all(
        bookJson.chapters.map(async (chapterC, chapterIndex) => {
          const newChapter = await db
            .insert(chapters)
            .values({
              position: chapterIndex,
              number: chapterC.chapter,
              book_id: newBookId,
            })
            .returning({
              id: chapters.id,
            });

          const chapterId = newChapter?.[0]?.id;
          const allVerses = chapterC.verses.map((verseC, verseIndex) => ({
            number: parseInt(verseC.verse),
            text: verseC.text,
            chapter_id: chapterId,
            position: verseIndex,
          }));

          await db.insert(verses).values(allVerses);
        })
      );
    })
  );
};
