<script>
  import Menu from "../../components/Menu.svelte";
  import BasePage from "../../layouts/BasePage.svelte";
  import Page from "../../layouts/Page.svelte";
  import { login } from "../../lib/login";
</script>

<script context="module">
  export const authorized = true;

</script>

<Page>
  <hgroup>
    <h1>Cardápio</h1>
    <p><strong>Restaurante:</strong> {$login?.restaurant?.name}</p>
  </hgroup>

  <main>
    <Menu />
  </main>
</Page>

<style>
  hgroup {
    margin-top: 1.2rem;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  :global(.content) {
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
