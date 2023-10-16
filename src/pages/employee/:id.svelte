<script context="module" lang="ts">
  export const authorized = true;

  export function condition(detail: any) {
    return login.user?.restaurant?.role === "admin";
  }
</script>

<script lang="ts">
  import Page from "../../layouts/Page.svelte";
  import { getEmployee } from "../../lib/employee";
  import { login } from "../../lib/login";

  export let params: {
    id: string;
  };
</script>

<Page>
  <hgroup>
    <h1>Funcionário</h1>
    <h2>Detalhes do funcionário</h2>
  </hgroup>

  {#await getEmployee(params.id)}
    <p>Buscando funcionário...</p>
  {:then employee}
    <dl>
      <dt>Nome</dt>
      <dd>{employee.username}</dd>
      <dt>Função</dt>
      <dd>{employee.role}</dd>
    </dl>
  {:catch error}
    <p>{error.message}</p>
  {/await}
</Page>
