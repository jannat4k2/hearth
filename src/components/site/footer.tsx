import { Link } from "@tanstack/react-router";
import { LogoMark, Wordmark } from "./logo";

export function SiteFooter() {
  return (
    <footer className="no-print mt-auto border-t border-line bg-paper-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <Link to="/" className="inline-flex items-center gap-2.5">
            <LogoMark />
            <Wordmark />
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
            A small test kitchen. Recipes written in grams and minutes, photographed in natural light,
            meant for the weeknight table.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/recipes" className="text-ink hover:text-clay">
                All recipes
              </Link>
            </li>
            <li>
              <Link to="/collections" className="text-ink hover:text-clay">
                Collections
              </Link>
            </li>
            <li>
              <Link to="/saved" className="text-ink hover:text-clay">
                Saved
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-ink hover:text-clay">
                About the kitchen
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">Kitchen notes</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            We test every recipe at least twice. Salt is Diamond Crystal unless noted. Oven
            temperatures are for conventional, not convection.
          </p>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-ink-faint sm:px-6">
          © {new Date().getFullYear()} Hearth. All recipes original to the test kitchen.
        </p>
      </div>
    </footer>
  );
}
