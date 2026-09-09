import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/layout";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Hearth" },
      {
        name: "description",
        content: "Hearth is an independent test kitchen. We write recipes the way we cook them.",
      },
    ],
  }),
});

function AboutPage() {
  return (
    <SiteLayout>
      <main className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay">The kitchen</p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-ink">How we cook</h1>
        <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-ink">
          <p>
            Hearth is a small independent test kitchen. We write the recipes we actually make — weeknight
            chicken, a bowl of noodles, a loaf that earns the counter — and we write them the way we cook
            them: in minutes, with a scale nearby, without a paragraph of memoir before the salt.
          </p>
          <p>
            Every recipe is cooked at least twice. Yields are honest. Air-fryer times are from a basket
            model at 350–400°F, not a toaster-oven impersonator. When a dough is fussy, we say so.
          </p>
          <p>
            We do not cloak pages, flood them with ads, or treat readers as inventory. If you cook from
            here, we want the dish to work — that is the entire contract.
          </p>
          <p>
            Salt is Diamond Crystal unless noted. Eggs are large. Oven temperatures are conventional. If
            you only have Morton kosher, use about two-thirds the volume.
          </p>
        </div>
      </main>
    </SiteLayout>
  );
}
