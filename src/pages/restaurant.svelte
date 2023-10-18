<script lang="ts">
  import Page from "../layouts/Page.svelte";
  import { employeeCount } from "../lib/employee";
  import { login, restaurantLogin } from "../lib/login";
  import { getRestaurants } from "../lib/restaurant";

  let restaurantId: string;
</script>

<script context="module">
  export const authorized = true;
</script>

<Page>
  <hgroup>
    <h1>Restaurante</h1>
    {#await getRestaurants()}
      <p>Carregando...</p>
    {:then restaurants}
      <select name="restaurantId" bind:value={restaurantId} on:change={() => restaurantLogin(restaurantId)}>
        {#each restaurants as restaurant}
          <option value={restaurant.id} selected={restaurant.id === $login?.restaurant?.id}>{restaurant.name}</option>
        {/each}
      </select>
    {/await}
  </hgroup>

  <hr>

  <main>
    <table>
      <tr>
        <th>Nome</th>
        <td>{$login?.restaurant?.name}</td>
      </tr>
      <tr>
        <th>Endereço</th>
        <td>{$login?.restaurant?.address}</td>
      </tr>
      {#if $login?.restaurant?.role === "admin"}
        <tr>
          <th>Funcionários</th>
          {#await employeeCount()}
            <td>Carregando...</td>
          {:then count}
            <td>{count}</td>
          {:catch error}
            <td>{error.message}</td>
          {/await}
        </tr>
      {/if}
    </table>
  </main>
</Page>

<style>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  table {
    border-collapse: collapse;
  }

  th {
    text-align: left;
    text-align: right;
    padding-right: 2rem;
  }

  td {
    padding-left: 2rem;
  }

  *:where(th, td) {
    padding: 0.8rem;
  }


  tr:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }
</style>
