"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { feedbackText, usePasscode } from "./usePasscode";


export default function LoginPage() {
  const router = useRouter();
  const { input, attempts, solved, shaking, submitting, addDigit, delDigit } = usePasscode();
  

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-4">
      {/* Page heading */}
      <header className="mb-10">
        <div className="flex items-center gap-4">
          <Image
            src="/icon.svg"
            alt="last messages"
            width={52}
            height={52}
            className="rounded-xl opacity-90"
          />
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em]">
              last messages
            </p>
          </div>
        </div>

        {/* <h1 className="text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
          The Archive
        </h1> */}

        <p className="mt-4 max-w-md text-sm leading-7 text-[var(--muted)]">
          A quiet corner containing unfinished thoughts, experiments, and
          forgotten messages.
        </p>
      </header>

      {/* Terminal */}
      <section
        className={`rounded-2xl border p-6 font-mono shadow-2xl shadow-black/20 ${
          solved
            ? "border-[var(--accent)] bg-[rgba(145,215,199,.08)]"
            : "border-[var(--line)] bg-black/10"
        } ${shaking ? "shake" : ""}`}
      >
        {/* Terminal header */}
        <div className="mb-8 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[var(--muted)]">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
            TERMINAL.ACCESS
          </div>

          <span
            className={
              solved ? "text-[var(--accent)]" : "text-amber-200"
            }
          >
            {solved ? "UNLOCKED" : "ENCRYPTED"}
          </span>
        </div>

        {solved ? (
          <div className="py-4">
            <p className="text-2xl text-[var(--accent)]">
              ACCESS GRANTED
            </p>

            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              The archive has recognized you.
              <br />
              Messages are ready.
            </p>

            <button
              type="button"
              onClick={() => router.push("/")}
              className="
                mt-6
                rounded-lg
                border
                border-[var(--accent)]
                px-5
                py-2
                text-sm
                text-[var(--accent)]
                transition
                hover:bg-[rgba(145,215,199,.1)]
              "
            >
              ENTER →
            </button>
          </div>
        ) : (
          <div>
            <p className="text-sm text-[var(--muted)]">
              ENTER SECRET KEY
            </p>

            <div className="mt-4 rounded-lg border border-[var(--line)] bg-[#071a35] px-4 py-4 text-center text-2xl tracking-[0.7em]">
              {input.map(String).join("") || "····"}
            </div>

            <div className="mt-5 grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit) => (
                <button
                  key={digit}
                  type="button"
                  onClick={() => addDigit(digit)}
                  disabled={submitting}
                  className="
                    rounded-lg
                    border border-[var(--line)]
                    py-3
                    text-sm
                    transition
                    hover:border-[var(--accent)]
                    hover:bg-white/5
                    disabled:opacity-50
                  "
                >
                  {digit}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={delDigit}
              disabled={input.length === 0 || submitting}
              className="
                mt-4
                text-xs
                text-[var(--muted)]
                transition
                hover:text-[var(--accent)]
              "
            >
              ← REMOVE LAST DIGIT
            </button>
          </div>
        )}

        {/* Logs */}
        <div className="mt-8 border-t border-[var(--line)] pt-5">
          <p className="text-xs uppercase tracking-widest text-[var(--muted)]">
            Attempt history
          </p>

          <div className="mt-3 max-h-40 overflow-y-auto pr-2">
            {attempts.length === 0 ? (
              <p className="text-sm text-[var(--muted)]">
                Waiting for input...
              </p>
            ) : (
              <ul className="space-y-2 text-sm">
                {attempts.map((attempt, index) => (
                  <li
                    key={`${attempt.digits.join("")}-${index}`}
                    className={
                      attempt.exact === 4
                        ? "text-[var(--accent)]"
                        : "text-rose-200"
                    }
                  >
                    {">"}{" "}
                    {feedbackText(
                      attempt.digits,
                      index,
                      attempt.exact,
                      attempt.partial,
                      attempt.error
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <p className="mt-8 text-center font-mono text-xs text-[var(--muted)]">
        "Some messages are meant to be discovered."
      </p>
    </div>
  );
}