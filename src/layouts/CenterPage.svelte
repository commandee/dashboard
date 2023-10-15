<script>
  import Nav from "../components/Nav.svelte";
</script>

<Nav />

<main class="container">
    <slot />
</main>

<style>
  main {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
