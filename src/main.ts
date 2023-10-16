import "./global.css"
import App from './App.svelte'
import { checkLogin } from './lib/login';

const mountOn = document.getElementById('app')!;

await checkLogin();

const app = new App({
  target: mountOn
})

mountOn.classList.add("loaded");

export default app
