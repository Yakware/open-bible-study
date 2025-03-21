import { StudyContextProvider } from "@/lib/context/study-context";
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

  const [versions, books, chapters, verses] = await Promise.all([
    getVersions(),
    getBooks(Number(params?.version)),
    getChapters(Number(params?.book)),
    getVerses(Number(params?.chapter)),
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
