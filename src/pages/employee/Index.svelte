<script context="module" lang="ts">
  import { login } from "../../lib/login";

  export const authorized = true;

  export function condition(detail: any) {
    return login.user?.restaurant?.role === "admin";
  }
</script>

<script>
  import Page from "../../layouts/Page.svelte";
  import { getAllEmployees } from "../../lib/employee";

</script>

<Page>
  <hgroup>
    <h1>Funcionários</h1>
    <h2>Lista de funcionários</h2>
  </hgroup>

  <main>
    <ul>
      {#await getAllEmployees()}
        <p>Carregando...</p>
      {:then employees}
        {#each employees as employee}
          <li>
            <a href="#/employee/{employee.id}">
              {employee.username}
            </a>
          </li>
        {/each}
      {/await}
    </ul>
  </main>
</Page>
