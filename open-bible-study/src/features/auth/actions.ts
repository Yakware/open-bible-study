"use server";

import { auth } from "@/lib/auth";
import {
  registrationFormSchema,
  RegistrationFormValues,
} from "./components/registration-form/registration-form-schema";
import { headers } from "next/headers";
import { serverActionError } from "@/utils/server-action-error";
import {
  loginFormSchema,
  LoginFormValues,
} from "./components/login-form/login-form-schema";

export async function login(values: LoginFormValues) {
  try {
    const { data: validated, error } = await loginFormSchema.safeParseAsync(
      values
    );

    if (error) {
      return { data: null, error: "Failed validation" };
    }

    const data = await auth.api.signInEmail({
      headers: await headers(),
      body: validated,
    });

    return { data, error: null };
  } catch (error) {
    return serverActionError(error);
  }
}

export async function register(values: RegistrationFormValues) {
  try {
    const { data: validated, error } =
      await registrationFormSchema.safeParseAsync(values);

    if (error) {
      return { data: null, error: "Failed validation" };
    }

    const data = await auth.api.signUpEmail({
      headers: await headers(),
      body: validated,
    });

    return { data, error: null };
  } catch (error) {
    return serverActionError(error);
  }
}

export async function logout() {
  await auth.api.signOut({
    headers: await headers(),
  });
}
