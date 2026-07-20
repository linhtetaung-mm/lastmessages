export function PageHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <header className="mb-10 max-w-2xl">
      <p className="mb-3 font-mono text-xs uppercase tracking-[.2em] text-[var(--accent)]">
        {eyebrow}
      </p>
      <h1 className="text-4xl font-semibold tracking-[-.04em] sm:text-5xl">
        {title}
      </h1>
      <div className="mt-4 leading-7 text-[var(--muted)]">{children}</div>
    </header>
  );
}
