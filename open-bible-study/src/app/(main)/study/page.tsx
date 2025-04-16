import { StudyContextProvider } from "@/lib/context/study-context";
import {
  getBooks,
  getChapters,
  getVerses,
  getVersions,
} from "@/features/study/actions";
import { StudyPageTemplate } from "@/features/study/templates/study-page-template";

type StudyPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function StudyPage({ searchParams }: StudyPageProps) {
  const params = await searchParams;

  const [versions, books, chapters, verses] = await Promise.all([
    getVersions(),
    getBooks(String(params?.version)),
    getChapters(String(params?.version), String(params?.book)),
    getVerses(
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
