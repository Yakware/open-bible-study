import { PasswordRequirements } from "@/components/password-strength-meter/types";
import { PASSWORD_PATTERNS } from "@/lib/constants";
import { z } from "zod";
import zxcvbn from "zxcvbn";

export const minPasswordLength = 8;

export const checkPasswordRequirements = (
  pwd: string
): PasswordRequirements => {
  const requirements: PasswordRequirements = {
    minLength: pwd.length >= minPasswordLength,
    hasUppercase: PASSWORD_PATTERNS.UPPERCASE.test(pwd),
    hasLowercase: PASSWORD_PATTERNS.LOWERCASE.test(pwd),
    hasNumber: PASSWORD_PATTERNS.NUMBER.test(pwd),
    hasSpecialChar: PASSWORD_PATTERNS.SPECIAL_CHAR.test(pwd),
  };
  return requirements;
};

export const checkPasswordStrength = (password: string): number => {
  const reqs = checkPasswordRequirements(password);
  const result = zxcvbn(password);

  if (
    !reqs.hasUppercase ||
    !reqs.hasLowercase ||
    !reqs.hasNumber ||
    !reqs.hasSpecialChar ||
    !reqs.minLength
  ) {
    return Math.min(result.score, 1);
  }

  return result.score;
};

export const MIN_ZXCVBN_SCORE = 3;

export const zodPassword = z
  .string()
  .min(
    8,
    "Please enter password. Your password must contain at least 8 characters, 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character."
  )
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[!@#$%^&*(),.?":{}|<>-]/,
    "Password must contain at least one special character"
  )
  .refine(
    (password) => checkPasswordStrength(password) >= MIN_ZXCVBN_SCORE,
    "Password is too weak. Please choose a stronger password."
  );
