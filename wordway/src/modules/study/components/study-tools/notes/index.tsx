import { useNotesContext } from "@/lib/context/notes-context";
import {
  Container,
  ContainerContent,
} from "@/modules/common/components/container";
import { Button } from "@/modules/common/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/modules/common/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/modules/common/components/ui/form";
import { Textarea } from "@/modules/common/components/ui/textarea";
import { NotebookPenIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteFormSchema, NoteFormType } from "./note-form-schema";
import { createNote } from "@/modules/study/actions";
import { useNotes } from "./use-notes";

export function Notes() {
  const { data: notes } = useNotes();
  const { newNoteVerse } = useNotesContext();

  const form = useForm<NoteFormType>({
    defaultValues: {
      text: "",
    },
    resolver: zodResolver(noteFormSchema),
  });

  const onSubmit = async (values: NoteFormType) => {
    if (newNoteVerse) {
      await createNote(newNoteVerse.id, values.text);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {newNoteVerse && (
        <Card>
          <CardHeader>
            <CardTitle>
              {newNoteVerse.version.abbreviation} {newNoteVerse.book.name}{" "}
              {newNoteVerse.chapter.number}:{newNoteVerse.number}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form id="noteForm" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New note</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <Button variant="outline" form="noteForm">
              Save
            </Button>
          </CardFooter>
        </Card>
      )}

      {notes && notes.length > 0
        ? notes.map((note) => (
            <Card key={note.id}>
              <CardHeader>
                <CardTitle>
                  {" "}
                  {note.version.abbreviation} {note.book.name}{" "}
                  {note.chapter.number}:{note.verse.number}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{note.text}</p>
              </CardContent>
            </Card>
          ))
        : !newNoteVerse && (
            <Container>
              <ContainerContent className="flex flex-col items-center py-6">
                <NotebookPenIcon />
                <p>No notes yet</p>
                <p>Select a verse to add your first note</p>
              </ContainerContent>
            </Container>
          )}
    </div>
  );
}
