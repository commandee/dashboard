<script lang="ts">
  import { login } from "../lib/login";
  import active from "svelte-spa-router/active";
</script>

<nav>
  <ul>
    <li><a href="#/" use:active>Home</a></li>
    <li><a href="#/restaurant" use:active>Restaurante</a></li>
    <li><a href="#/menu" use:active>Cardápio</a></li>
    <li><a href="#/employee" use:active>Funcionários</a></li>
  </ul>

  <ul>
    <li><strong>Commandee</strong></li>
  </ul>

  {#if $login}
    <ul>
      <li>{$login.username}</li>
      <li></li>
    </ul>
  {:else}
    <ul>
      <li><a href="#/login" role="button">Login</a></li>
    </ul>
  {/if}
</nav>

<style>
  nav {
    display: flex;
    flex-direction: row;
    background-color: hsla(0, 0%, 100%, 10%);
    padding: 1rem;

    gap: 1rem;
  }

  nav > ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    list-style: none;
    gap: 1rem;
    padding: 0;
    margin: 0;
  }

  :global(a.active) {
    pointer-events: none;
    cursor: default;

    color: hsla(0, 0%, 80%, 50%) !important;
  }

  a:not([role="button"]) {
    color: inherit;
    text-decoration: none;
  }

  a[role="button"] {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background-color: hsla(0, 0%, 100%, 10%);
    border: 1px solid hsla(0, 0%, 100%, 20%);
  }

  nav ul:first-child {
    flex: 1 0 auto;
  }
</style>
