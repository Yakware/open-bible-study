import { useChapters } from "@/lib/context/study-context";
import { Button } from "@/modules/common/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useChapterNumber } from "../bible-navigation/hooks/use-chapter-number";
import { useMemo } from "react";

export function FooterNavigation() {
  const [currentChapter, setChapterNumber] = useChapterNumber();
  const chapters = useChapters();

  const previousChapter = useMemo(() => {
    const chapterIndex = chapters.findIndex(
      (chapter) => chapter.number === currentChapter
    );

    if (chapterIndex === 0) {
      return null;
    } else {
      return chapters[chapterIndex - 1];
    }
  }, [chapters, currentChapter]);

  const nextChapter = useMemo(() => {
    const chapterIndex = chapters.findIndex(
      (chapter) => chapter.number === currentChapter
    );

    if (chapterIndex === chapters.length - 1) {
      return null;
    } else {
      return chapters[chapterIndex + 1];
    }
  }, [chapters, currentChapter]);

  const goToChapter = (chapter: string | undefined) => {
    if (!chapter) {
      return;
    }

    setChapterNumber(chapter);
  };

  return (
    <div className="flex items-center justify-between mt-6">
      <Button
        disabled={!previousChapter}
        onClick={() => goToChapter(previousChapter?.number)}
      >
        <ChevronLeft />
        Previous Chapter
      </Button>
      <Button
        disabled={!nextChapter}
        onClick={() => goToChapter(nextChapter?.number)}
      >
        Next Chapter
        <ChevronRight />
      </Button>
    </div>
  );
}
