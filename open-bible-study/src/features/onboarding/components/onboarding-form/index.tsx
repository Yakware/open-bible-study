import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  onboardingFormSchema,
  OnboardingFormValues,
} from "./onboarding-form-schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { completeUserProfile } from "../../actions";
import { redirect } from "next/navigation";

export function OnboardingForm() {
  const form = useForm<OnboardingFormValues>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(onboardingFormSchema),
  });

  const handleSubmit = async (values: OnboardingFormValues) => {
    const { error, response } = await completeUserProfile(values.name);

    console.log({ error, response });
    if (!error) {
      redirect("/study");
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Bobby" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="self-end">
          Next <ChevronRightIcon />
        </Button>
      </form>
    </Form>
  );
}
