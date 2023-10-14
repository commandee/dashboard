<script lang="ts">
  import Login from "../components/Login.svelte";
  import CenterPage from "../layouts/CenterPage.svelte";
  import { login } from "../lib/login";
  import { restaurantLogin } from "../lib/login";
  import { getRestaurants } from "../lib/restaurant";

  async function submit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    const data = String(event.currentTarget.restaurantId.value);

    try {
      await restaurantLogin(data);
      alert("Logged in!")
    } catch (err) {
      const error = err as Error;
      alert(error.message);
    }
  }
</script>

<CenterPage>
    <Login />

    {#if $login}
        <h1>Logado!</h1>
        <span>{$login.email}</span>

        {#await getRestaurants()}
          <p>Carregando restaurantes...</p>
        {:then restaurants}
        <form on:submit|preventDefault={submit}>
            <select name="restaurantId">
              {#each restaurants as restaurant}
                <option value={restaurant.id}>{restaurant.name}</option>
              {/each}
            </select>
            <button type="submit">Login</button>
          </form>
        {:catch error}
          <p>Erro ao carregar restaurantes: {error.message}</p>
        {/await}
    {/if}

    {$login?.restaurant?.name}
    Role: {$login?.restaurant?.role}
</CenterPage>
