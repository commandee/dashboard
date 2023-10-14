<script>
  import Router from "svelte-spa-router";
  import routes from "./router";
  import { onMount } from "svelte";
  import { checkLogin } from "./lib/login";

</script>

<Router {routes}></Router>
