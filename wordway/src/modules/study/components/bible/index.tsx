import { useVerses } from "@/lib/context/study-context";
import { NoVerseSelected } from "./no-verse-selected";

export function Bible() {
  const verses = useVerses();

  return (
    <div className="flex flex-col gap-2">
      {verses.length > 0 ? (
        verses.map((verse) => (
          <p key={verse.id}>
            <span className="align-super mr-1 ml-2">{verse.number}</span>
            {verse.text}
          </p>
        ))
      ) : (
        <NoVerseSelected />
      )}
    </div>
  );
}
