import { StudyContextProvider } from "@/lib/context/study-context";
import { StudyPageTemplate } from "@/features/study/templates/study-page-template";
import { getBooksByVersion } from "@/data-access/book";
import { getVersions } from "@/data-access/version";
import { getChaptersByVersionBook } from "@/data-access/chapter";
import { getVersesByVersionBookChapter } from "@/data-access/verse";

type StudyPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function StudyPage({ searchParams }: StudyPageProps) {
  const params = await searchParams;

  const [versions, books, chapters, verses] = await Promise.all([
    getVersions(),
    getBooksByVersion(String(params?.version)),
    getChaptersByVersionBook(String(params?.version), String(params?.book)),
    getVersesByVersionBookChapter(
      String(params?.version),
      String(params?.book),
      String(params?.chapter)
    ),
  ]);

  return (
    <StudyContextProvider
      versions={versions}
      books={books}
      chapters={chapters}
      verses={verses}
    >
      <StudyPageTemplate />
    </StudyContextProvider>
  );
}
