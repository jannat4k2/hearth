import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-8", className)}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M6 20.5c0-6.2 4.4-11.2 10-12.5 5.6 1.3 10 6.3 10 12.5 0 1.8-.4 3.4-1.2 4.8H7.2C6.4 23.9 6 22.3 6 20.5Z"
        className="fill-clay"
      />
      <path
        d="M16 9.2c.4 2.4-.4 4.2-1.8 5.6 2.4-.2 4.2-1.8 5-4.2-1 .8-2 1.2-3.2 1.2V9.2Z"
        className="fill-paper"
      />
      <path
        d="M5 26h22"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        className="text-ink"
      />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display text-[1.35rem] font-semibold tracking-tight text-ink", className)}>
      Hearth
    </span>
  );
}
