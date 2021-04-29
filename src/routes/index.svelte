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

<h1>{blog.title}</h1>
<p class="topic">{blog.summary || ""}</p>

<style>
  h1 {
    font-size: 3rem;
    line-height: 1;
    margin-top: 5rem;
  }
  p {
    color: var(--neutral700);
    line-height: 1.5rem;
    margin-top: 1rem;
  }
</style>
