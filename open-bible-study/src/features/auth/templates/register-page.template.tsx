"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegistrationForm } from "../components/registration-form";
import { APP_NAME } from "@/lib/constants";
import Link from "next/link";

export function RegisterPageTemplate() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[450px] flex flex-col gap-6 items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your details below to create your {APP_NAME} account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegistrationForm />
          </CardContent>
        </Card>

        <p>
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
