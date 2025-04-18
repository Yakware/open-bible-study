import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNotes } from "@/features/notes/hooks/use-notes";

export function NotesTab() {
  const { data } = useNotes();

  return (
    <div className="flex flex-col gap-4">
      {data?.map((note) => (
        <Card key={note.id}>
          <CardHeader>
            <CardTitle className="flex items-center gap-1">
              {note.book.name} {note.chapter.number}:{note.verse.number}
              <Badge variant="outline">{note.version.abbreviation}</Badge>
            </CardTitle>
            <CardDescription>{note.content}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
