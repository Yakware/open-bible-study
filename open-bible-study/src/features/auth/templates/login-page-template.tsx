"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import Link from "next/link";
import { LoginForm } from "../components/login-form";

export function LoginPageTemplate() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[450px] flex flex-col gap-6 items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Welcome back!</CardTitle>
            <CardDescription>
              Enter your credentials to access your {APP_NAME} account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>

        <p>
          Don&apos;t have an account? <Link href="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
