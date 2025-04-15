"use server";

import { logtoConfig } from "@/app/logto";
import { signIn, signOut } from "@logto/next/server-actions";

export async function login() {
  await signIn(logtoConfig, {
    redirectUri: logtoConfig.baseUrl + "/callback",
    postRedirectUri: logtoConfig.baseUrl,
  });
}

export async function logout() {
  await signOut(logtoConfig);
}
