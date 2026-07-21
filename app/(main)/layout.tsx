import { Navigation } from "@/components/navigation";



export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="shell flex-1 py-14 sm:py-20">
        {children}
      </main>

      <footer className="shell border-t border-[var(--line)] py-8 text-sm text-[var(--muted)]">
        © {new Date().getFullYear()} · Built quietly, on the web.
      </footer>
    </div>
  );
}
