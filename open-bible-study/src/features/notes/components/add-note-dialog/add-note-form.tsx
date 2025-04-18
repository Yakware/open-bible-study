import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addNoteFormSchema, AddNoteFormValues } from "./add-note-form-schema";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createNote } from "../../actions";

type AddNoteFormProps = {
  verseId: number;
};

export function AddNoteForm({ verseId }: AddNoteFormProps) {
  const form = useForm<AddNoteFormValues>({
    defaultValues: {
      content: "",
      verseId,
    },
    resolver: zodResolver(addNoteFormSchema),
  });

  const handleSubmit = async (values: AddNoteFormValues) => {
    try {
      await createNote(values);
      toast.success("Note created");
    } catch (error) {
      console.error(error);
      toast.error("Unable to create note");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <Textarea {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="self-end">
          Create
        </Button>
      </form>
    </Form>
  );
}
