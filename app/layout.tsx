import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = {
  title: { default: "last messages", template: "%s · last messages" },
  description: "Notes, projects, and small experiments by a curious developer.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "last messages",
    description:
      "Notes, projects, and small experiments by a curious developer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="shell flex-1 py-14 sm:py-20">{children}</main>
        <footer className="shell border-t border-[var(--line)] py-8 text-sm text-[var(--muted)]">
          © {new Date().getFullYear()} · Built quietly, on the web.
        </footer>
      </body>
    </html>
  );
}
