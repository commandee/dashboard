<script>
  import Nav from "../components/Nav.svelte";
</script>

<Nav />

<div class="content">
  <slot />
</div>

<footer>
  <ul>
    <li>Lorem, ipsum.</li>
    <li>Possimus, provident.</li>
    <li>Fugit, ratione?</li>
  </ul>
</footer>

<style>
  .content {
    flex: 1 0 auto;
    padding: 2rem 2rem;
  }
</style>
