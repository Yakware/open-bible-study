import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { Verse as VerseModel } from "@/lib/db/schema";
import { NotebookPenIcon } from "lucide-react";
import { AddNoteForm } from "./add-note-form";

type AddNoteActionProps = {
  verse: VerseModel;
  bookName: string | null;
  chapterNumber: string | null;
};

export function AddNoteDialog({
  verse,
  bookName,
  chapterNumber,
}: AddNoteActionProps) {
  return (
    <ResponsiveDialog
      title="Add note"
      description={`Create a new note for ${bookName} ${chapterNumber}:${verse.number}`}
      trigger={
        <Button
          variant="outline"
          size="icon"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <NotebookPenIcon />
        </Button>
      }
    >
      <AddNoteForm verseId={verse.id} />
    </ResponsiveDialog>
  );
}
