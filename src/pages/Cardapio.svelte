<script>
  import Menu from "../components/Menu.svelte";
  import Page from "../layouts/Page.svelte";
  import { login } from "../lib/login";
</script>

<script context="module">
  export const authorized = true;

  export function condition() {
    return login.user?.restaurant;
  }
</script>

<Page>
  <Menu />
</Page>
