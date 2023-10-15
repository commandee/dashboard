<script>
  import { getMenu } from "../lib/items";
  import { login } from "../lib/login";
  import CardItem from "./CardItem.svelte";
</script>

<h2><strong>Restaurant: </strong>{$login?.restaurant?.name}</h2>
<div class="cardapio">
  {#await getMenu()}
    <p>Carregando cardápio...</p>
  {:then menu}
    {#each menu as item}
      <CardItem {item} />
    {/each}
  {/await}
</div>

<style>
  .cardapio {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
</style>
