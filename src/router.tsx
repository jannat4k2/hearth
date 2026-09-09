import { createBrowserHistory, createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "./lib/error-component";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  const history = createBrowserHistory();

  return createRouter({
    routeTree,
    history,
    defaultErrorComponent: AppErrorComponent,
    defaultPreload: "intent",
    trailingSlash: "always",
    scrollRestoration: true,
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
