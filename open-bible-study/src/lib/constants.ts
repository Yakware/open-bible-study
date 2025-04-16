export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Open Bible Study";

export const UMAMI_SRC = process.env.UMAMI_SRC || "";
export const UMAMI_WEBSITE_ID = process.env.UMAMI_WEBSITE_ID || "";

export const PASSWORD_PATTERNS = {
  UPPERCASE: /[A-Z]/,
  LOWERCASE: /[a-z]/,
  NUMBER: /[0-9]/,
  SPECIAL_CHAR: /[!@#$%^&*(),.?":{}|<>-]/,
} as const;
