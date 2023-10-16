import { wrap } from "svelte-spa-router/wrap";
import { login } from "./lib/login";

const pages = import.meta.glob("/src/pages/**/*.svelte", {
  eager: true
}) as Record<string, {} & { default: unknown }>;

const routes: Record<string, unknown> = {};

function prepareRoute(route: any) {
  const component = route.default;

  console.log(route);

  const conditions: (() => boolean)[] = [];

  if (route.authorized) {
    conditions.push(() => !!login.user);
  }

  if (route.condition) {
    conditions.push(route.condition);
  }

  if (conditions.length > 0) {
    return wrap({
      component,
      userData: {
        login
      },
      conditions
    });
  }

  return component;
}

if (pages["/src/pages/Index.svelte"]) {
  routes["/"] = prepareRoute(pages["/src/pages/Index.svelte"]);
  delete pages["/src/pages/Index.svelte"];
}

let notFound: undefined | unknown;

if (pages["/src/pages/404.svelte"]) {
  notFound = prepareRoute(pages["/src/pages/404.svelte"]);
  delete pages["/src/pages/404.svelte"];
}

for (const path in pages) {
  const relativePath = path.match(/\/src\/pages(.*?)(?:\/Index)?\.svelte/)![1].toLowerCase();
  routes[relativePath] = prepareRoute(pages[path]);
}

if (notFound) {
  routes["*"] = notFound;
}

export default routes;
