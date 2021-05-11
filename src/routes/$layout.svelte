<script context="module">
  export async function load({ fetch }) {
    const posts = await fetch("/posts.json").then((r) => r.json());

    return {
      props: {
        posts,
      },
    };
  }
</script>

<script>
  import Nav from "$lib/Nav.svelte";
  import { postStore } from "$lib/stores";
  import { page } from "$app/stores";
  import "../global.css";

  export let posts = [];

  if (posts.length) {
    postStore.set(posts);
  }
</script>

<Nav posts={$postStore} currentPath={$page.path} />

<main>
  <div class="viewport">
    <slot />
  </div>
</main>

<style>
  main {
    flex: 1;
  }
  .viewport {
    margin: 0 auto;
    max-width: 72ch;
    padding: 1rem;
  }
</style>
