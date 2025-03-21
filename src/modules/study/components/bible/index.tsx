import { useVerses } from "@/lib/context/study-context";

export function Bible() {
  const verses = useVerses();

  return (
    <div className="flex flex-col gap-2">
      {verses.map((verse) => (
        <p key={verse.id}>
          <span className="align-super mr-1 ml-2">{verse.number}</span>
          {verse.text}
        </p>
      ))}
    </div>
  );
}
