import fs from "fs/promises";
import path from "path";
import { db } from "../../src/lib/db";
import { books, chapters, verses, versions } from "../../src/lib/db/schema";
import bookNames from "./data/book-names.json";

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

async function seedKjv() {
  const data = await db
    .insert(versions)
    .values({
      name: "King James Version",
      abbreviation: "KJV",
      language: "en",
      description:
        "The King James Version (KJV) of the Bible, published in 1611, is an English translation commissioned by King James I of England. It's known for its majestic, poetic language and has had profound influence on English literature and culture. The KJV contains 66 books divided into the Old Testament (39 books) and New Testament (27 books), covering creation, ancient Hebrew history, prophecies, the life and teachings of Jesus, and the early Christian church. For over 400 years, it has remained one of the most widely read and quoted Bible translations, valued for its literary beauty even as newer translations have emerged that use more contemporary language.",
    })
    .returning({ id: versions.id });

  const kjvVersionId = data?.[0]?.id;
  if (!kjvVersionId) {
    throw new Error("No ID found for KJV version");
  }

  await Promise.all(
    bookNames.map(async (bookName, bookIndex) => {
      const fileName = bookName.name.replace(/ /g, "-") + ".json";
      const rawJson = await fs.readFile(
        path.join(__dirname, "data", "books", fileName)
      );
      const bookJson: BookJson = JSON.parse(rawJson.toString());

      const newBook = await db
        .insert(books)
        .values({
          name: bookName.name,
          abbreviation: bookName.abbreviation,
          versionId: kjvVersionId,
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
              bookId: newBookId,
            })
            .returning({
              id: chapters.id,
            });

          const chapterId = newChapter?.[0]?.id;
          const allVerses = chapterC.verses.map((verseC, verseIndex) => ({
            number: parseInt(verseC.verse),
            text: verseC.text,
            chapterId: chapterId,
            position: verseIndex,
          }));

          await db.insert(verses).values(allVerses);
        })
      );
    })
  );
}

seedKjv();
