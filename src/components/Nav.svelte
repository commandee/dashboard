<script lang="ts">
  import { login } from "../lib/login";
  import active from "svelte-spa-router/active";
  import Link from "./Link.svelte";
</script>

<nav>
  <ul>
    <li><Link href="#/">Home</Link></li>
    <li><Link href="#/restaurant">Restaurantes</Link></li>
    <li><Link href="#/commanda">Commandas</Link></li>
    <li><Link href="#/employee">Funcionários</Link></li>
    <li><Link href="#/menu">Cardápio</Link></li>
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

  nav ul:first-child {
    flex: 1 0 auto;
  }
</style>
