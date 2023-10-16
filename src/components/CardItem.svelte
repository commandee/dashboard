<script lang="ts">
  import type { Item } from "../lib/items";

  export let item: Item;

  const currentFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    currencySign: "accounting",
  });

  $: price = currentFormatter.format(item.price);
</script>

<a href={`#/menu/${item.id}`}>
  <article class="item">
    <header>
      <h3>{item.name}</h3>
      {#if item.description}
        <p class="description">{item.description}</p>
      {/if}
    </header>

    <p class="price">{price}</p>
  </article>
</a>

<style>
  * {
    color: inherit;
    text-decoration: none;
  }

  article {
    --gradiente: linear-gradient(
      to bottom,
      hsla(0, 0%, 8%, 100%),
      hsla(0, 0%, 0%, 75%),
      hsla(0, 0%, 0%, 50%),
      hsla(0, 0%, 0%, 0),
      hsla(0, 0%, 0%, 10%)
    );

    position: relative;
    padding: 1rem;

    background-image: var(--gradiente), url(https://veja.abril.com.br/wp-content/uploads/2017/03/nuggets-de-frango.jpg?quality=90&strip=info&w=680&h=453&crop=1);

    width: 15rem;
    aspect-ratio: 9 / 8;
  }

  article header {
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  .description {
    font-size: 0.85rem;
    color: hsla(0, 0%, 100%, 60%);
  }

  .price {
    position: absolute;
    bottom: 0.6rem;
    right: 0.6rem;

    background-color: black;
    padding: 0.3rem;
    border-radius: 0.5rem;

    text-align: center;
  }
</style>
