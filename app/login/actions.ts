"use server";

import { cookies } from "next/headers";
import { ACCESS_COOKIE, createAccessToken } from "@/lib/access";

export type PasscodeResult = { exact: number; partial: number; granted: boolean; error?: string };

function evaluate(guess: number[], secret: number[]) {
  let exact = 0;
  let partial = 0;
  const remainingSecret: (number | null)[] = [...secret];
  const remainingGuess: (number | null)[] = [...guess];
  for (let index = 0; index < 4; index++) {
    if (guess[index] === secret[index]) {
      exact++;
      remainingSecret[index] = null;
      remainingGuess[index] = null;
    }
  }
  for (const digit of remainingGuess) {
    if (digit === null) continue;
    const index = remainingSecret.indexOf(digit);
    if (index !== -1) {
      partial++;
      remainingSecret[index] = null;
    }
  }
  return { exact, partial };
}

export async function attemptPasscode(digits: number[]): Promise<PasscodeResult> {
  const configuredPasscode = process.env.ACCESS_PASSCODE;
  if (!configuredPasscode || !/^\d{4}$/.test(configuredPasscode)) {
    return { exact: 0, partial: 0, granted: false, error: "Access terminal is not configured." };
  }
  if (digits.length !== 4 || digits.some((digit) => !Number.isInteger(digit) || digit < 0 || digit > 9)) {
    return { exact: 0, partial: 0, granted: false, error: "Enter four digits." };
  }
  const { exact, partial } = evaluate(digits, configuredPasscode.split("").map(Number));
  if (exact === 4) {
    const cookieStore = await cookies();
    cookieStore.set(ACCESS_COOKIE, await createAccessToken(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12,
    });
  }
  return { exact, partial, granted: exact === 4 };
}
