import { StudyContextProvider } from "@/lib/context/study-context";
import { getCurrentChapter } from "@/lib/db/queries";
import {
  getBooks,
  getChapters,
  getVerses,
  getVersions,
} from "@/modules/study/actions";
import { StudyPageTemplate } from "@/modules/study/templates/study-page-template";

type StudyPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function StudyPage({ searchParams }: StudyPageProps) {
  const params = await searchParams;

  const [versions, books, chapters, currentChapter, verses] = await Promise.all(
    [
      getVersions(),
      getBooks(String(params?.version)),
      getChapters(String(params?.version), String(params?.book)),
      getCurrentChapter(
        String(params?.version),
        String(params?.book),
        String(params?.chapter)
      ),
      getVerses(
        String(params?.version),
        String(params?.book),
        String(params?.chapter)
      ),
    ]
  );

  return (
    <StudyContextProvider
      versions={versions}
      books={books}
      chapters={chapters}
      verses={verses}
      currentChapter={currentChapter}
    >
      <StudyPageTemplate />
    </StudyContextProvider>
  );
}
