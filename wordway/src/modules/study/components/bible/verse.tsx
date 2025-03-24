import { useNotesContext } from "@/lib/context/notes-context";
import { Verse as VerseType } from "@/lib/db/schema";
import { Button } from "@/modules/common/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/modules/common/components/ui/hover-card";
import { cn } from "@/utils/cn";
import { BookmarkIcon, FilePlusIcon } from "lucide-react";
import { useMemo } from "react";

type VerseProps = {
  verse: VerseType;
};

export function Verse({ verse }: VerseProps) {
  const delay = 400;

  const { toggleNoteCreation, newNoteVerse } = useNotesContext();

  const isSelected = useMemo(() => {
    return newNoteVerse ? newNoteVerse.id === verse.id : false;
  }, [newNoteVerse, verse.id]);

  const createNote = () => {
    toggleNoteCreation(verse);
  };

  return (
    <HoverCard openDelay={delay} closeDelay={delay}>
      <HoverCardTrigger>
        <p>
          <span className="align-super mr-1 ml-2">{verse.number}</span>
          <span className={cn(isSelected ? "underline" : "hover:underline")}>
            {verse.text}
          </span>
        </p>
      </HoverCardTrigger>
      <HoverCardContent className="flex gap-2 w-fit">
        <Button variant="outline" onClick={createNote}>
          <FilePlusIcon /> Create Note
        </Button>
        <Button variant="outline">
          <BookmarkIcon /> Bookmark
        </Button>
      </HoverCardContent>
    </HoverCard>
  );
}
