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

type AddNoteFormProps = {
  verseId: number;
};

export function AddNoteForm({}: AddNoteFormProps) {
  const form = useForm<AddNoteFormValues>({
    defaultValues: {
      content: "",
    },
    resolver: zodResolver(addNoteFormSchema),
  });

  const handleSubmit = (values: AddNoteFormValues) => {
    console.log(values);
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
