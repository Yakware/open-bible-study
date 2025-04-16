import { APIError } from "better-auth";

export function isBetterAuthError(error: unknown): error is APIError {
  return error != null && typeof error === "object" && "body" in error;
}
