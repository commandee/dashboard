<script lang="ts">
  import type { EventHandler } from "svelte/elements";
  import { signin } from "../lib/login";

  const submit: EventHandler<SubmitEvent, HTMLFormElement> = async (event) => {
    const loginData = {
      email: String(event.currentTarget.email.value as string),
      password: String(event.currentTarget.password.value as string),
    };

    try {
      await signin(loginData);
      alert("Logged in!")
    } catch (err) {
      const error = err as Error;
      alert(error.message);
    }
  };
</script>

<form method="post" on:submit|preventDefault={submit}>
  <h4>Login</h4>

  <label for="email">Email</label>
  <input
    name="email"
    placeholder="E-mail"
    value={import.meta.env.DEV ? import.meta.env.VITE_EMAIL : ""}
    required
  />

  <label for="password">Senha</label>
  <input
    type="password"
    name="password"
    placeholder="Password"
    value={import.meta.env.DEV ? import.meta.env.VITE_PASSWORD : ""}
    required
  />

  <button type="submit">Login</button>
</form>

<style>
  form {
    padding: 2rem;
    background-color: hsla(0, 0%, 100%, 10%);
    border-radius: 1rem;
    backdrop-filter: blur(1rem);

    max-width: 30rem;

    margin: none;
  }

  input {
    border: none;
  }

  button {
    margin: 1.2rem 0 0 0;
  }
</style>
