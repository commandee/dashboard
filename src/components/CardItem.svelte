<script lang="ts">
  import type { Item } from "../lib/items";

  export let item: Item;
</script>

<article class="item">
  <header><h3>{item.name}</h3></header>
  <p>{item.price}</p>
</article>

<style>
  .item, .item header {
  }
</style>
