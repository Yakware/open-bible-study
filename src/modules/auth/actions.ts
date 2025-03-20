"use server";

import { logtoConfig } from "@/app/logto";
import { signIn, signOut } from "@logto/next/server-actions";

export async function login() {
  await signIn(logtoConfig);
}

export async function logout() {
  await signOut(logtoConfig);
}

export async function register() {
  await signIn(logtoConfig, {
    firstScreen: "register",
    redirectUri: logtoConfig.baseUrl + "/callback",
  });
}
