import { createApp } from "./src/entrance.js";
import { reactive, watchEffect } from "./src/reactivity.js";
import { h } from "./src/renderer.js";

const mini_vue = {
  createApp,
  reactive,
  watchEffect,
  h
}

export {
  mini_vue as default,
  createApp,
  reactive,
  watchEffect,
  h
}