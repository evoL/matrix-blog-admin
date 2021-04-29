const node = require("@sveltejs/adapter-node");
const preprocess = require("svelte-preprocess");

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: node(),
    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",
  },
};
