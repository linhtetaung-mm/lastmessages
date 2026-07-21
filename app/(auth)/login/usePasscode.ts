"use client";

import { useState } from "react";
import { attemptPasscode } from "./actions";

export interface Attempt { digits: number[]; exact: number; partial: number; error?: string }

export function feedbackText(digits: number[], index: number, exact: number, partial: number, error?: string) {
  const entered = digits.join(" ");
  if (error) return `Attempt (${index + 1}) [ ${entered} ] : ${error}`;
  if (exact === 4) return `Attempt (${index + 1}) [ ${entered} ] : Access granted.`;
  if (exact === 0 && partial === 0) return `Attempt (${index + 1}) [ ${entered} ] : No correlation.`;
  const feedback = [exact > 0 ? `${exact} exact` : "", partial > 0 ? `${partial} misplaced` : ""].filter(Boolean).join(", ");
  return `Attempt (${index + 1}) [ ${entered} ] : ${feedback}.`;
}

export function usePasscode() {
  const [input, setInput] = useState<number[]>([]);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [solved, setSolved] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (digits: number[]) => {
    if (submitting || solved) return;
    setSubmitting(true);
    const result = await attemptPasscode(digits);
    setAttempts((previous) => [...previous, { digits, exact: result.exact, partial: result.partial, error: result.error }]);
    setInput([]);
    setSubmitting(false);
    if (result.granted) setSolved(true);
    else { setShaking(true); window.setTimeout(() => setShaking(false), 500); }
  };

  const addDigit = (digit: number) => {
    if (solved || submitting || input.length >= 4) return;
    const next = [...input, digit];
    setInput(next);
    if (next.length === 4) window.setTimeout(() => void submit(next), 180);
  };

  const delDigit = () => { if (!submitting) setInput((previous) => previous.slice(0, -1)); };
  return { input, attempts, solved, shaking, submitting, addDigit, delDigit };
}
