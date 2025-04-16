import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  registrationFormSchema,
  RegistrationFormValues,
} from "./registration-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import PasswordStrengthMeter from "@/components/password-strength-meter";
import { AnimatePresence, motion } from "motion/react";
import { APP_NAME } from "@/lib/constants";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { register } from "../../actions";
import { redirect } from "next/navigation";

export function RegistrationForm() {
  const form = useForm<RegistrationFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registrationFormSchema),
  });

  const handleSubmit = async (values: RegistrationFormValues) => {
    const { error } = await register(values);

    if (error) {
      toast.error(error);
      return;
    }

    redirect("/study");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" autoComplete="name" {...field} />
              </FormControl>
              <FormDescription>
                The public name people will see within {APP_NAME}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email address"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Password"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <AnimatePresence>
                {field.value && (
                  <motion.div
                    key="password-strength"
                    className="overflow-hidden"
                    initial={{ maxHeight: 0, opacity: 0 }}
                    animate={{ maxHeight: 400, opacity: 1 }}
                    exit={{ maxHeight: 0, opacity: 0 }}
                    transition={{
                      duration: 0.4,
                    }}
                  >
                    <PasswordStrengthMeter password={field.value} />
                  </motion.div>
                )}
              </AnimatePresence>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button>Create account</Button>
      </form>
    </Form>
  );
}
