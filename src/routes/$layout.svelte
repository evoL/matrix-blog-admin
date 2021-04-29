<script>
  import Nav from "$lib/Nav.svelte";
  import "../global.css";

  export let posts = [
    {
      id: "foo",
      title: "Example post title",
    },
  ];
</script>

<Nav {posts} />

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
    padding: 0 1rem;
  }
</style>
