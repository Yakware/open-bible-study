import { useNotes } from "@/features/notes/hooks/use-notes";
import { Note } from "./note";

export function ChapterNotesList() {
  const { data } = useNotes();

  return (
    <div className="flex flex-col gap-2">
      {data?.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  );
}
