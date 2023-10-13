const pages = import.meta.glob("/src/pages/**/*.svelte", {
  eager: true 
}) as Record<string, {} & { default: unknown }>;

const routes: Record<string, unknown> = {};

if (pages["/src/pages/Index.svelte"]) { 
  routes["/"] = pages["/src/pages/Index.svelte"].default;
  console.log(pages["/src/pages/Index.svelte"])

  delete pages["/src/pages/Index.svelte"];
}

let notFound: undefined | unknown;

if (pages["/src/pages/404.svelte"]) {
  notFound = pages["/src/pages/404.svelte"].default;
  delete pages["/src/pages/404.svelte"];
}

for (const path in pages) {
  const relativePath = path.match(/\/src\/pages(.*?)(?:\/Index)?\.svelte/)![1].toLowerCase();
  routes[relativePath] = pages[path].default;
}

if (notFound) {
  routes["*"] = notFound;
}

console.log(routes)

export default routes;
