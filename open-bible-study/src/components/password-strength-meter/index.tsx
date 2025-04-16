import { useState, useEffect } from "react";
import zxcvbn from "zxcvbn";
import {
  checkPasswordRequirements,
  minPasswordLength,
} from "@/utils/check-password-strength";

import type { PasswordStrength, PasswordRequirements } from "./types";

const STRENGTH_LABELS: Record<number, string> = {
  0: "Very Weak",
  1: "Weak",
  2: "Fair",
  3: "Strong",
  4: "Very Strong",
};

const STRENGTH_COLORS: Record<number, string> = {
  0: "bg-[#FF0000]",
  1: "bg-[#FFA500]",
  2: "bg-[#FFFF00]",
  3: "bg-[#9ACD32]",
  4: "bg-[#008000]",
};

interface PasswordStrengthMeterProps {
  password: string;
  onStrengthChange?: (strength: PasswordStrength) => void;
  onRequirementsChange?: (requirements: PasswordRequirements) => void;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
  onStrengthChange,
  onRequirementsChange,
}) => {
  const [strength, setStrength] = useState<PasswordStrength>({
    score: 0,
    warning: "",
    suggestions: [],
    feedback: "",
  });

  useEffect(() => {
    if (password) {
      const reqs = checkPasswordRequirements(password);
      const result = zxcvbn(password);
      const finalScore = result.score;

      const strengthResult: PasswordStrength = {
        score: finalScore,
        warning: result.feedback.warning || "",
        suggestions: [
          ...result.feedback.suggestions,
          !reqs.minLength
            ? `Password must be at least ${minPasswordLength} characters long`
            : "",
          !reqs.hasUppercase ? "Add uppercase letters" : "",
          !reqs.hasLowercase ? "Add lowercase letters" : "",
          !reqs.hasNumber ? "Add numbers" : "",
          !reqs.hasSpecialChar ? "Add special characters" : "",
        ].filter(Boolean),
        feedback:
          result.feedback.warning || result.feedback.suggestions[0] || "",
      };

      setStrength(strengthResult);
      onStrengthChange?.(strengthResult);
      onRequirementsChange?.(reqs);
    }
  }, [password, onStrengthChange, onRequirementsChange]);

  return (
    <div
      className="w-full space-y-2 pt-2"
      role="region"
      aria-label="Password strength meter"
    >
      <div className="h-2 w-full bg-grey-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${
            STRENGTH_COLORS[strength.score]
          } transition-all duration-300`}
          style={{ width: `${(strength.score + 1) * 20}%` }}
          role="progressbar"
          aria-valuenow={strength.score}
          aria-valuemin={0}
          aria-valuemax={4}
        />
      </div>
      <div className="flex items-center justify-end text-l-small text-content-basic-secondary gap-1">
        <span>Password Strength:</span>
        <span className="font-bold">{STRENGTH_LABELS[strength.score]}</span>
      </div>

      {strength.feedback && (
        <div className="text-l-small text-content-basic-secondary" role="alert">
          {strength.feedback}
        </div>
      )}

      {strength.suggestions.length > 0 && (
        <ul className="text-l-small text-content-basic-secondary font-bold list-disc pl-5">
          {strength.suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;
