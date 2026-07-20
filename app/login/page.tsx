"use client";
import { feedbackText, usePasscode } from "@/app/login/usePasscode";

export default function LoginPage() {
  const { input, attempts, solved, shaking, submitting, addDigit, delDigit } =
    usePasscode();

  console.log(process.env.ACCESS_PASSCODE)
  return (
    <div className="mx-auto max-w-xl">
      <p className="mb-3 font-mono text-xs uppercase tracking-[.2em] text-[var(--accent)]">
        Restricted area
      </p>
      <h1 className="text-4xl font-semibold tracking-[-.045em] sm:text-5xl">
        Access Terminal
      </h1>
      <p className="mt-4 leading-7 text-[var(--muted)]">
        Solve the four-digit crack code. Each attempt reports exact and
        misplaced digits.
      </p>
      <section
        className={`mt-10 rounded-xl border p-6 font-mono ${solved ? "border-[var(--accent)] bg-[rgba(145,215,199,.08)]" : "border-[var(--line)] bg-black/10"} ${shaking ? "shake" : ""}`}
      >
        <div className="mb-7 flex items-center justify-between text-xs">
          <span className="text-[var(--muted)]">SYS.ACCESS / v1.0</span>
          <span className={solved ? "text-[var(--accent)]" : "text-amber-200"}>
            {solved ? "OPEN" : "LOCKED"}
          </span>
        </div>
        {solved ? (
          <div>
            <p className="text-xl text-[var(--accent)]">ACCESS GRANTED</p>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              The terminal is open. Loading the archive…
            </p>
          </div>
        ) : (
          <div>
            <p className="text-sm text-[var(--muted)]">
              CRACK_CODE [ four digits ]
            </p>
            <p className="mt-3 rounded-md border border-[var(--line)] bg-[#071a35] px-4 py-3 text-xl tracking-[.55em]">
              {input.map(String).join("") || "····"}
            </p>
            <div className="mt-4 grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit) => (
                <button
                  key={digit}
                  type="button"
                  onClick={() => addDigit(digit)}
                  disabled={submitting}
                  className="rounded-md border border-[var(--line)] py-2 text-sm transition hover:border-[var(--accent)] disabled:opacity-50"
                >
                  {digit}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={delDigit}
              disabled={input.length === 0 || submitting}
              className="mt-3 text-xs text-[var(--muted)] transition hover:text-[var(--accent)]"
            >
              ← DELETE
            </button>
          </div>
        )}
        <div className="mt-8 border-t border-[var(--line)] pt-5">
          <p className="text-xs text-[var(--muted)]">ATTEMPT LOG</p>
          {attempts.length === 0 ? (
            <p className="mt-3 text-sm text-[var(--muted)]">
              No attempts recorded.
            </p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm">
              {attempts.map((attempt, index) => (
                <li
                  key={`${attempt.digits.join("")}-${index}`}
                  className={
                    attempt.exact === 4
                      ? "text-[var(--accent)]"
                      : "text-rose-200"
                  }
                >
                  ›{" "}
                  {feedbackText(
                    attempt.digits,
                    index,
                    attempt.exact,
                    attempt.partial,
                    attempt.error,
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
