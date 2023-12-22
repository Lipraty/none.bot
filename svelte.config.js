import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  // onwarn: (warning, handler) => {
  //   // suppress warnings on `vite dev` and `vite build`; but even without this, things still work
  //   if (warning.code === "a11y-click-events-have-key-events") return;
  //   if (warning.code === "a11y-no-static-element-interactions") return;
  //   handler(warning);
  // },
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  
  // kit: { adapter: adapter() },
}
