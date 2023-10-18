<script lang="ts">
  import Page from "../../layouts/Page.svelte";
  import * as itemControl from "../../lib/items";

  export let params: {
    id: string;
  };

  const priceFormatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "BRL",
  });
</script>

<script context="module">
</script>

<Page>
  {#await itemControl.get(params.id)}
    <p>Carregando...</p>
  {:then item}
    <hgroup>
      <h1>{item.name}</h1>
      {#if item.description}
        <p>{item.description}</p>
      {/if}
    </hgroup>
    <p>{priceFormatter.format(item.price)}</p>
  {:catch error}
    {error.message}
  {/await}
</Page>
