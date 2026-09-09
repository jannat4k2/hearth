import { ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Recipe } from "@/lib/recipes";
import { Button } from "@/components/ui/button";

export function CookMode({ recipe, onClose }: { recipe: Recipe; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const step = recipe.steps[index];
  const total = recipe.steps.length;
  const duration = (step?.minutes ?? 0) * 60;
  const [remaining, setRemaining] = useState(duration);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setRemaining(duration);
    setRunning(false);
  }, [index, duration]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setRemaining((s) => {
        if (s <= 1) {
          setRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => Math.min(total - 1, i + 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, total]);

  const clock = useMemo(() => {
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  }, [remaining]);

  if (!step) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-paper"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cook-title"
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-6">
        <p id="cook-title" className="font-display text-lg font-semibold text-ink">
          {recipe.title}
        </p>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close cook mode">
          <X className="size-5" />
        </Button>
      </div>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-5 py-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay">
          Step {index + 1} of {total}
        </p>
        <p className="mt-4 font-display text-2xl leading-snug font-medium text-ink sm:text-3xl">
          {step.text}
        </p>

        {duration > 0 ? (
          <div className="mt-8 flex items-center gap-4">
            <p className="font-display text-5xl tabular-nums tracking-tight text-ink">{clock}</p>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setRunning((v) => !v)}
              aria-label={running ? "Pause timer" : "Start timer"}
            >
              {running ? <Pause className="size-4" /> : <Play className="size-4" />}
            </Button>
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-4 sm:px-6">
        <Button
          variant="outline"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
        >
          <ChevronLeft className="size-4" />
          Back
        </Button>
        {index === total - 1 ? (
          <Button variant="ink" onClick={onClose}>
            Done
          </Button>
        ) : (
          <Button onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}>
            Next
            <ChevronRight className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
