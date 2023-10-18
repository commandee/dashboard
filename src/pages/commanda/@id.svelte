<script context="module" lang="ts">
  export const authorized = true;
</script>

<script lang="ts">
  import Page from "../../layouts/Page.svelte";
  import * as commandaControl from "../../lib/commanda";

  export let params: {
    id: string;
  };
</script>

<Page>
  <hgroup>
    <h1>Commanda #{params.id}</h1>
  </hgroup>

  {#await commandaControl.getById(params.id)}
    <p>Carregando...</p>
  {:then commanda}
    <dl>
      <dt>Mesa</dt>
      <dd>{commanda.table ?? "C"}</dd>
      <dt>Cliente</dt>
      <dd>{commanda.costumer}</dd>
    </dl>
  {:catch error}
    {error.message}
  {/await}
</Page>

