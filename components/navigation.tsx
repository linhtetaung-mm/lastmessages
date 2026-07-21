"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const links = [
  ["Blog", "/blog"],
  ["Projects", "/projects"],
  ["Notes", "/notes"],
  ["Media", "/media"],
  ["Puzzles", "/puzzles"],
];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="
        shell
        sticky
        top-5
        z-20
        rounded-2xl
        border
        border-[var(--line)]
        bg-[rgb(11,33,66)]/70
        px-5
        py-4
        shadow-[0_10px_40px_rgba(0,0,0,0.25)]
        backdrop-blur-xl
      "
    >
      <div className="flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="
            flex
            items-center
            gap-3
            font-mono
            text-xs
            uppercase
            tracking-[0.25em]
            hover:!text-[var(--accent)]
          "
          onClick={() => setOpen(false)}
        >
          <Image
            src="/icon.svg"
            alt="last messages"
            width={28}
            height={28}
            className="rounded-xl opacity-90"
          />

          last messages
        </Link>

        {/* Mobile button */}
        <button
          type="button"
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            border
            border-[var(--line)]
            text-lg
            leading-none
            text-[var(--accent)]
            transition
            duration-300
            hover:border-[var(--accent)]
            md:hidden
          "
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span
            className={`
              inline-block
              transition-transform
              duration-300
              ${open ? "rotate-90" : "rotate-0"}
            `}
          >
            {open ? "✕" : "☰"}
          </span>
        </button>

        {/* Desktop navigation */}
        <nav
          className="
            hidden
            items-center
            gap-1
            rounded-full
            border
            border-[var(--line)]
            bg-black/10
            p-1
            md:flex
          "
        >
          {links.map(([label, href]) => {
            const active = pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={`
                  rounded-full
                  px-3
                  py-1.5
                  text-xs
                  transition
                  hover:!text-[var(--accent)]
                  ${
                    active
                      ? "bg-white/10 !text-[var(--accent)]"
                      : "text-[var(--muted)] hover:text-[var(--ink)]"
                  }
                `}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile navigation */}
      {open && (
        <nav
          className="
            mt-4
            flex
            flex-col
            gap-1
            rounded-xl
            border
            border-[var(--line)]
            bg-black/10
            p-2
            md:hidden
          "
        >
          {links.map(([label, href]) => {
            const active = pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`
                  rounded-lg
                  px-3
                  py-2
                  text-xs
                  transition
                  ${
                    active
                      ? "bg-white/10 !text-[var(--accent)]"
                      : "text-[var(--muted)] hover:!text-[var(--accent)]"
                  }
                `}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}