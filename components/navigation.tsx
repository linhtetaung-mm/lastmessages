"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const links = [
  ["Blog", "/blog"],
  ["Projects", "/projects"],
  ["Notes", "/notes"],
  ["Media", "/media"],
  ["Puzzles", "/puzzles"],
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="
      shell
      sticky
      top-5
      z-20
      flex
      flex-wrap
      items-center
      justify-between
      gap-5
      rounded-2xl
      border
      border-[var(--line)]
      bg-[rgb(11,33,66)]/70
      px-5
      py-4
      shadow-lg
      shadow-black/10
      backdrop-blur-xl
      shadow-[0_10px_40px_rgba(0,0,0,0.25)]
      "
    > 
      
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

      <nav className="flex flex-wrap items-center gap-1 rounded-full border border-[var(--line)] bg-black/10 p-1">
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
    </header>
  );
}