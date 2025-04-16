type BetterAuthError = {
  status: string;
  body: {
    code: string;
    message: string;
  };
  statusCode: number;
};

export function isBetterAuthError(error: unknown): error is BetterAuthError {
  return error != null && typeof error === "object" && "body" in error;
}
