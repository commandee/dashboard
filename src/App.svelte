<script lang="ts">
  import Router, { replace } from "svelte-spa-router";
  import routes from "./router";

  function redirectFailed(event: any) {
    if (event.detail.userData.login) {
      replace("#/login");
    }
  }
</script>

<Router {routes} on:conditionsFailed={redirectFailed}></Router>
