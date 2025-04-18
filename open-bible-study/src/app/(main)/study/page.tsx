import { StudyContextProvider } from "@/lib/context/study-context";
import { StudyPageTemplate } from "@/features/study/templates/study-page-template";
import { getBook, getBooks } from "@/data-access/books";
import { getVersion, getVersions } from "@/data-access/versions";
import { getChapter, getChapters } from "@/data-access/chapters";
import { getVerses } from "@/data-access/verses";

type StudyPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function StudyPage({ searchParams }: StudyPageProps) {
  const params = await searchParams;
  const version = String(params?.version);
  const book = String(params?.book);
  const chapter = String(params?.chapter);

  const [versions, books, chapters, verses] = await Promise.all([
    getVersions(),
    getBooks(version),
    getChapters(version, book),
    getVerses(version, book, chapter),
  ]);

  const [currentVersion, currentBook, currentChapter] = await Promise.all([
    getVersion(version),
    getBook(version, book),
    getChapter(version, book, chapter),
  ]);

  return (
    <StudyContextProvider
      versions={versions}
      books={books}
      chapters={chapters}
      verses={verses}
      currentVersion={currentVersion}
      currentBook={currentBook}
      currentChapter={currentChapter}
    >
      <StudyPageTemplate />
    </StudyContextProvider>
  );
}
