import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  hasError?: boolean;
  onComplete?: (code: string) => void;
  autoFocus?: boolean;
}

export function OtpInput({
  value = "",
  onChange,
  length = 6,
  disabled = false,
  hasError = false,
  onComplete,
  autoFocus = true,
}: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Array of single-digit strings
  const digits = Array.from({ length }, (_, i) => value[i] || "");

  useEffect(() => {
    if (autoFocus && !disabled && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus, disabled]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    // Extract only digits
    const cleanDigit = rawVal.replace(/\D/g, "");

    if (!cleanDigit) {
      // Empty/Backspace
      const newDigits = [...digits];
      newDigits[index] = "";
      const newVal = newDigits.join("");
      onChange(newVal);
      return;
    }

    // Single digit input
    const char = cleanDigit.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = char;
    const newVal = newDigits.join("");
    onChange(newVal);

    // Auto advance focus to next input
    if (index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newVal.length === length && onComplete) {
      onComplete(newVal);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        // Current box is empty, move backward and clear previous
        const newDigits = [...digits];
        newDigits[index - 1] = "";
        onChange(newDigits.join(""));
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text/plain").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;

    onChange(pasted);

    // Focus on the last filled box or next empty box
    const nextIdx = Math.min(pasted.length, length - 1);
    inputRefs.current[nextIdx]?.focus();

    if (pasted.length === length && onComplete) {
      onComplete(pasted);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3" role="group" aria-label="6-digit verification code">
      {Array.from({ length }).map((_, index) => {
        const isFilled = Boolean(digits[index]);
        return (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digits[index]}
            disabled={disabled}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            aria-label={`Digit ${index + 1} of ${length}`}
            className={cn(
              "h-12 w-10 sm:h-14 sm:w-12 rounded-xl border text-center font-mono text-xl font-bold tracking-widest transition-all",
              "bg-background text-foreground shadow-sm focus:outline-none focus:ring-2",
              hasError
                ? "border-destructive/80 bg-destructive/5 text-destructive focus:border-destructive focus:ring-destructive/30"
                : isFilled
                ? "border-primary/80 bg-primary/5 text-primary focus:border-primary focus:ring-primary/30"
                : "border-border hover:border-border/80 focus:border-primary focus:ring-primary/20",
              disabled && "opacity-50 cursor-not-allowed bg-muted"
            )}
          />
        );
      })}
    </div>
  );
}
