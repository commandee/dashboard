<script lang="ts">
  import Router, { replace } from "svelte-spa-router";
  import routes from "./router";

  function redirectFailed(event: any) {
    if (event.detail.userData.reason === "auth") {
      replace("#/login");
      return;
    }

    if (event.detail.userData.reason === "admin") {
      replace("#/restaurant");
      return;
    }
  }
</script>

<Router {routes} on:conditionsFailed={redirectFailed}></Router>
