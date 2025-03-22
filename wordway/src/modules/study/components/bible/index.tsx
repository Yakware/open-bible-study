import { useVerses } from "@/lib/context/study-context";
import { NoVerseSelected } from "./no-verse-selected";

export function Bible() {
  const verses = useVerses();

  return (
    <div>
      {verses.length > 0 ? (
        <div className="font-reading flex flex-col gap-2">
          {verses.map((verse) => (
            <p key={verse.id}>
              <span className="align-super mr-1 ml-2">{verse.number}</span>
              {verse.text}
            </p>
          ))}
        </div>
      ) : (
        <NoVerseSelected />
      )}
    </div>
  );
}
