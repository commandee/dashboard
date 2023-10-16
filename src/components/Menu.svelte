<script>
  import { getMenu } from "../lib/items";
  import { login } from "../lib/login";
  import CardItem from "./CardItem.svelte";
</script>

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

    max-width: 50rem;
    min-width: 15rem;
  }
</style>
