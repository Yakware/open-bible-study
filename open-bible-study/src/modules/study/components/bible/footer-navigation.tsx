import { useMemo } from "react";
import { useChapters } from "@/lib/context/study-context";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useChapterNumber } from "../bible-navigation/hooks/use-chapter-number";
import { Button } from "@/components/ui/button";

export function FooterNavigation() {
  const [currentChapter, setChapterNumber] = useChapterNumber();
  const chapters = useChapters();

  const { previousChapter, nextChapter } = useMemo(() => {
    const chapterIndex = chapters.findIndex(
      (chapter) => chapter.number === currentChapter
    );

    return {
      previousChapter: chapterIndex > 0 ? chapters[chapterIndex - 1] : null,
      nextChapter:
        chapterIndex < chapters.length - 1 ? chapters[chapterIndex + 1] : null,
    };
  }, [chapters, currentChapter]);

  const goToChapter = (chapter: string | undefined) => {
    if (chapter) {
      setChapterNumber(chapter);
    }
  };

  return (
    <div className="flex items-center justify-between mt-6">
      <Button
        variant="outline"
        disabled={!previousChapter}
        onClick={() => goToChapter(previousChapter?.number)}
      >
        <ChevronLeft />
        Previous Chapter
      </Button>
      <Button
        variant="outline"
        disabled={!nextChapter}
        onClick={() => goToChapter(nextChapter?.number)}
      >
        Next Chapter
        <ChevronRight />
      </Button>
    </div>
  );
}
