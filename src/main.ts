import '@picocss/pico/css/pico.min.css'
import "./global.css"
import App from './App.svelte'

const mountOn = document.getElementById('app')!;

const app = new App({
  target: mountOn
})

mountOn.classList.add("loaded");

export default app
