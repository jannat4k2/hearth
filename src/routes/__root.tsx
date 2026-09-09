import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { JsonLd } from "@/components/site/json-ld";
import { seoHead, SITE_URL } from "@/lib/seo";

const description = "Hearth is a small independent test kitchen with practical weeknight recipes, baking, air-fryer dishes, soups, salads, and one-pan dinners.";

export const Route = createRootRoute({
  head: () =>
    seoHead({
      title: "Hearth — Recipes worth the pan",
      description,
      path: "/",
    }),
  component: RootComponent,
});

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Hearth",
  url: `${SITE_URL}/`,
  description,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/recipes/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

function StaticSeoCleanup() {
  useEffect(() => {
    document.querySelectorAll("[data-static-seo]").forEach((node) => node.remove());
  }, []);
  return null;
}

function RootComponent() {
  return (
    <>
      <HeadContent />
      <StaticSeoCleanup />
      <JsonLd data={websiteJsonLd} />
      <Outlet />
    </>
  );
}
