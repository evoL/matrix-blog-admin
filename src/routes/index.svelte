<script context="module">
  export async function load({ fetch }) {
    const blog = await fetch("/metadata.json").then((r) => r.json());

    return {
      props: {
        blog,
      },
    };
  }
</script>

<script>
  export let blog;
</script>

<svelte:head>
  <title>matrix-blog</title>
</svelte:head>

<article>
  <h1>{blog.title}</h1>
  {#if blog.summary}
    <p class="topic">{blog.summary}</p>
  {/if}
  <p>
    Pick a post from the sidebar or <a href="/posts/new">create a new post</a>.
  </p>
</article>

<style>
  article {
    grid-column: 2;
  }
  h1 {
    font-size: 3rem;
    line-height: 1;
    margin-top: 5rem;
  }
  p {
    line-height: 1.5rem;
    margin-top: 1rem;
  }
  .topic {
    color: var(--neutral700);
  }
</style>
