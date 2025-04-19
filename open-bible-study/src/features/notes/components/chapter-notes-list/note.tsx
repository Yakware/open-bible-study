import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NoteWithRelations } from "@/lib/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon, SaveIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  updateNoteFormSchema,
  UpdateNoteFormValues,
} from "./update-note-form-schema";
import { deleteNote, updateNote } from "@/features/notes/actions";
import { useInvalidate } from "@/hooks/use-invalidate";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

type NoteProps = {
  note: NoteWithRelations;
};

export function Note({ note }: NoteProps) {
  const invalidate = useInvalidate();
  const [editing, setEditing] = useState(false);

  const form = useForm<UpdateNoteFormValues>({
    defaultValues: {
      id: note.id,
      content: note.content,
    },
    resolver: zodResolver(updateNoteFormSchema),
  });

  const handleSubmit = async (values: UpdateNoteFormValues) => {
    if (!editing) {
      setEditing(true);
      return;
    }

    if (values.content === note.content) {
      setEditing(false);
      return;
    }

    await updateNote(values);
    invalidate(["notes"]);

    setEditing(false);
  };

  const handleDelete = async () => {
    await deleteNote(note.id);
    invalidate(["notes"]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-1 justify-between">
              <div className="flex items-center gap-1">
                {note.book.name} {note.chapter.number}:{note.verse.number}
                <Badge variant="outline">{note.version.abbreviation}</Badge>
              </div>

              <div className="flex items-center gap-1">
                <Button size="icon" variant="ghost">
                  {editing ? <SaveIcon /> : <EditIcon />}
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button type="button" size="icon" variant="ghost">
                      <Trash2Icon />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete note?</DialogTitle>
                      <DialogDescription>
                        This action is irreversible
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="outline">
                          Cancel
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={handleDelete}
                        >
                          Delete
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardTitle>
            <CardDescription>
              {editing ? (
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input autoFocus {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ) : (
                note.content
              )}
            </CardDescription>
          </CardHeader>
        </Card>
      </form>
    </Form>
  );
}
