<script>
  import Nav from "../components/Nav.svelte";
</script>

<Nav />

<main class="container">
    <slot />
</main>

<footer>
  <ul>
    <li>Lorem, ipsum.</li>
    <li>Possimus, provident.</li>
    <li>Fugit, ratione?</li>
  </ul>
</footer>

<style>
  main {
    flex: 1 0 auto;    
  }
</style>
