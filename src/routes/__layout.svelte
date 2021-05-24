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
    display: grid;
    grid-template-columns: 1fr minmax(min-content, 72ch) 1fr;
    margin: 0 auto;
    padding: 1rem;
  }

  @media screen and (max-width: 1279px) {
    .viewport {
      max-width: 72ch;
    }
  }
</style>
