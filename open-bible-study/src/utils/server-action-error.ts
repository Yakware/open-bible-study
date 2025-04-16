import { isBetterAuthError } from "./is-better-auth-error";

export function serverActionError(error: unknown) {
  if (isBetterAuthError(error)) {
    console.error(error);
    return { data: null, error: error.body?.message };
  } else {
    console.error(`An unknown error occurred.\n${error}`);
    return { data: null, error: "An unknown error occurred." };
  }
}
