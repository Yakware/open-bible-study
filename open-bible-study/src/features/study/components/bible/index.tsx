import { useVerses } from "@/lib/context/study-context";
import { NoVerseSelected } from "./no-verse-selected";
import { useChapterNumber } from "../bible-navigation/hooks/use-chapter-number";
import { useBookName } from "../bible-navigation/hooks/use-book-name";
import { FooterNavigation } from "./footer-navigation";
import { Verse } from "./verse";

export function Bible() {
  const verses = useVerses();
  const [bookName] = useBookName();
  const [chapterNumber] = useChapterNumber();

  return (
    <>
      {verses.length > 0 ? (
        <div>
          <div className="font-reading flex flex-col gap-2">
            <div className="flex flex-col font-sans justify-center items-center">
              <p className="text-3xl font-bold">
                {bookName} {chapterNumber}
              </p>
            </div>

            {verses.map((verse) => (
              <Verse
                key={verse.id}
                verse={verse}
                chapterNumber={chapterNumber}
                bookName={bookName}
              />
            ))}
          </div>
          <FooterNavigation />
        </div>
      ) : (
        <NoVerseSelected />
      )}
    </>
  );
}
