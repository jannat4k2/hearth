import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { LogoMark, Wordmark } from "./logo";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/lib/favorites";

const NAV = [
  { to: "/recipes", label: "Recipes" },
  { to: "/collections", label: "Collections" },
  { to: "/saved", label: "Saved" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const savedCount = useFavorites((s) => s.slugs.length);
  const shownCount = mounted ? savedCount : 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    void navigate({ to: "/recipes", search: { q: q || undefined, cat: undefined, diet: undefined } });
    setOpen(false);
  }

  return (
    <header className="no-print sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="Hearth home">
          <LogoMark />
          <Wordmark />
        </Link>

        <nav className="ml-4 hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors duration-150",
                  active ? "text-ink" : "text-ink-soft hover:text-ink",
                )}
              >
                {item.label}
                {item.to === "/saved" && shownCount > 0 ? (
                  <span className="ml-1.5 tabular-nums text-clay">{shownCount}</span>
                ) : null}
                {active ? (
                  <span className="absolute inset-x-3 -bottom-[13px] h-px bg-clay" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <form onSubmit={onSearch} className="ml-auto hidden max-w-xs flex-1 md:block">
          <label className="relative block">
            <span className="sr-only">Search recipes</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-faint" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search recipes"
              className="h-10 w-full rounded-md bg-elevated pl-9 pr-3 text-sm text-ink shadow-[0_0_0_1px_var(--color-line)] placeholder:text-ink-faint focus:outline-none focus:shadow-[0_0_0_2px_var(--color-clay)]"
            />
          </label>
        </form>

        <button
          type="button"
          className="ml-auto inline-flex size-11 items-center justify-center rounded-md text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-line bg-paper px-4 py-4 md:hidden">
          <form onSubmit={onSearch} className="mb-3">
            <label className="relative block">
              <span className="sr-only">Search recipes</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-faint" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search recipes"
                className="h-11 w-full rounded-md bg-elevated pl-9 pr-3 text-sm text-ink shadow-[0_0_0_1px_var(--color-line)] placeholder:text-ink-faint focus:outline-none focus:shadow-[0_0_0_2px_var(--color-clay)]"
              />
            </label>
          </form>
          <nav className="flex flex-col" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex min-h-11 items-center border-b border-line text-base font-medium text-ink last:border-0"
              >
                {item.label}
                {item.to === "/saved" && shownCount > 0 ? (
                  <span className="ml-2 tabular-nums text-clay">{shownCount}</span>
                ) : null}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
