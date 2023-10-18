<script lang="ts">
  import active from "svelte-spa-router/active";
  import { routePermissions } from "../router";
  import type { Action } from "svelte/action";
  import { login } from "../lib/login";

  export let href: `#${string}`;

    const allowed: Action = (node) => {
    const anchor = node as unknown as HTMLAnchorElement;
    const link = anchor.getAttribute("href");

    if (!link || !routePermissions[link] || routePermissions[link].length === 0) return;

    const unsubscribe = login.subscribe(async (user) => {
      const permissions = routePermissions[link];

      for (const condition of permissions) {
        if (!await condition(link)) {
          try {
            anchor.classList.add("unauthorized");
            return;
          } catch {}
        }
      }

      anchor.classList.remove("unauthorized");
    });

    return {
      destroy() {
        unsubscribe();
        anchor.classList.remove("unauthorized");
      },
    };
  };
</script>

<a {href} use:active use:allowed><slot /></a>

<style>
    :global(a.active) {
    pointer-events: none;
    cursor: default;

    color: hsla(0, 0%, 80%, 50%) !important;
  }

  :global(a.unauthorized) {
    pointer-events: none;
    cursor: default;

    color: hsla(0, 47%, 60%, 0.5) !important;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
</style>
