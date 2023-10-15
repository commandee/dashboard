<script lang="ts">
  import { login } from "../lib/login";
</script>

<nav>
  <ul>
    <li><a href="#/">Home</a></li>
    <li><a href="#/dashboard">Dashboard</a></li>
    <li><a href="#/cardapio">Cardápio</a></li>
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
    background-color: #333;
    color: #fff;
    padding-inline: 1rem 0.5rem;
  }

  a[role="button"] {
    background-color: #fff;
    color: #333;
  }
</style>
