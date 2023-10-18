<script>
  import CommandaCard from "../../components/CommandaCard.svelte";
import Page from "../../layouts/Page.svelte";
  import * as commandaControl from "../../lib/commanda";
</script>

<script context="module">
  export const authorized = true;
</script>

<Page>
  <hgroup>
    <h1>Commandas</h1>
  </hgroup>

  {#await commandaControl.getAll()}
    <p>Carregando...</p>
  {:then commandas}
    <ul>
      {#each commandas as commanda}
        <li><CommandaCard commanda={commanda}></CommandaCard></li>
      {/each}
    </ul>
  {:catch error}
    {error.message}
  {/await}
</Page>
