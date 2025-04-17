import { AddNoteDialog } from "@/features/notes/components/add-note-dialog";
import { Verse as VerseModel } from "@/lib/db/schema";

type VerseProps = {
  verse: VerseModel;
  bookName: string | null;
  chapterNumber: string | null;
};

export function Verse({ verse, bookName, chapterNumber }: VerseProps) {
  return (
    <div key={verse.id} className="flex justify-between gap-1 group">
      <p>
        <span className="align-super mr-1 ml-2">{verse.number}</span>
        {verse.text}
      </p>

      <AddNoteDialog
        verse={verse}
        chapterNumber={chapterNumber}
        bookName={bookName}
      />
    </div>
  );
}
