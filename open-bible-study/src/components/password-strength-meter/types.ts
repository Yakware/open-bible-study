export interface PasswordStrength {
  score: number;
  warning: string;
  suggestions: string[];
  feedback: string;
}

export interface PasswordRequirements {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}
