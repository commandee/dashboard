<script lang="ts">
  import type { Commanda } from "../lib/commanda";
  import Link from "./Link.svelte";

  export let commanda: Commanda;
</script>

<a href={`#/commanda/${commanda.id}`}>
  <span class="table">{commanda.table ?? "C"}</span>
  {commanda.costumer}
</a>

<style>
  a {
    all: unset;
  }
</style>
