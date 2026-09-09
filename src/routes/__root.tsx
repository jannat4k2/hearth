import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";

const APP_NAME = "Hearth";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { title: APP_NAME },
      {
        name: "description",
        content: "Hearth is a small test kitchen. Weeknight recipes, photographed in natural light.",
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <HeadContent />
      <Outlet />
    </>
  );
}
