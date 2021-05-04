<script>
  import MarkdownIt from "markdown-it";

  export let content;
  let preview;

  const md = new MarkdownIt();
  preview = md.render(content);
</script>

<div class="content-preview">
  <article>{@html preview}</article>
</div>

<style>
  .content-preview {
    box-sizing: border-box;
    height: 100%;
    overflow: auto;
    padding: 1em;
  }
  article {
    line-height: 1.75;
  }
  article :global h1,
  article :global h2,
  article :global h3,
  article :global h4,
  article :global h5 {
    margin: 3rem 0 1.38rem;
    line-height: 1.3;
  }
  article :global h1 {
    margin-top: 0;
  }
  article :global p {
    margin-bottom: 1rem;
  }
</style>
