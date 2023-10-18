import { wrap } from "svelte-spa-router/wrap";
import { login } from "./lib/login";
import { loc, type Location, type RouteDetail, type RoutePrecondition } from "svelte-spa-router";

const pages = import.meta.glob("/src/pages/**/*.svelte", {
  eager: true,
}) as Record<string, {} & { default: unknown }>;

const routes: Record<string, RoutePrecondition[]> = {};
const routePermissions: Record<string, Array<(href: string) => boolean | Promise<boolean>>> = {};

function addRoute(path: string, route: any) {
  const component = route.default;

  const conditions: RoutePrecondition[] = [];

  if (route.authorized) {
    conditions.push((detail) => {
      detail.userData ??= {};
      (detail.userData as Record<string, unknown>).reason = "auth";
      return !!login.user;
    });
  }

  if (route.admin) {
    conditions.push((detail) => {
      detail.userData ??= {};
      (detail.userData as Record<string, unknown>).reason = "admin";

      return login.user?.restaurant?.role === "admin";
    });
  }

  const mountedRoute =
    conditions.length > 0
      ? wrap({
          component,
          userData: {},
          conditions: conditions,
        })
      : component;

  routePermissions[`#${path}`] = conditions.map(
    (condition) => {
      return (href: string) => {
        const detail: RouteDetail = {
          route: path,
          location: href,
          querystring: href.split("?")[1] ?? "",
          userData: {},
          params: null
        }

        return condition(detail);
      };
    }
  );
  routes[path] = mountedRoute;
}

if (pages["/src/pages/Index.svelte"]) {
  addRoute("/", pages["/src/pages/Index.svelte"]);
  delete pages["/src/pages/Index.svelte"];
}

let notFound: undefined | unknown;

if (pages["/src/pages/404.svelte"]) {
  notFound = pages["/src/pages/404.svelte"];
  delete pages["/src/pages/404.svelte"];
}

for (const path in pages) {
  const relativePath = path
    .match(/\/src\/pages(.*?)(?:\/Index|\/index)?\.svelte/)![1]
    .toLowerCase();
  addRoute(relativePath, pages[path]);
}

if (notFound) {
  addRoute("*", notFound);
}

export default routes;
export { routePermissions }
