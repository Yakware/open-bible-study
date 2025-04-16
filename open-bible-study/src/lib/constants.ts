export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Open Bible Study";

export const PASSWORD_PATTERNS = {
  UPPERCASE: /[A-Z]/,
  LOWERCASE: /[a-z]/,
  NUMBER: /[0-9]/,
  SPECIAL_CHAR: /[!@#$%^&*(),.?":{}|<>-]/,
} as const;
