<script>
  import { createEventDispatcher } from "svelte";
  import slug from "slug";
  import ContentEditor from "./ContentEditor.svelte";
  import ContentPreview from "./ContentPreview.svelte";

  export let post = {
    title: undefined,
    summary: undefined,
    slug: undefined,
    content: undefined,
  };
  let currentTab = "markdown";
  const dispatch = createEventDispatcher();

  function generateSlug(title) {
    if (!title) return "title-goes-here";
    return slug(title);
  }

  function handleContentUpdate(e) {
    post.content = e.detail;
  }
  function handleSubmit() {
    dispatch(
      "save",
      Object.assign(
        {},
        post,
        post.slug ? undefined : { slug: generateSlug(post.title) }
      )
    );
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div class="field title">
    <label>
      <span>Title</span>
      <input
        type="text"
        required
        placeholder="Title goes here"
        bind:value={post.title}
      />
    </label>
  </div>
  <div class="field summary">
    <label>
      <span>Summary</span>
      <input
        type="text"
        placeholder="What it's going to be about"
        bind:value={post.summary}
      />
    </label>
  </div>
  <div class="field slug">
    <label>
      <span>Slug</span>
      <input
        type="text"
        placeholder={generateSlug(post.title)}
        bind:value={post.slug}
      />
    </label>
  </div>
  <div class="field">
    <div class="tabs">
      <button
        class="tab"
        class:active={currentTab === "markdown"}
        type="button"
        on:click={(e) => (currentTab = "markdown")}
      >
        Markdown
      </button>
      <button
        class="tab"
        class:active={currentTab === "preview"}
        type="button"
        on:click={(e) => (currentTab = "preview")}
      >
        Preview
      </button>
    </div>
    <div class="content">
      {#if currentTab === "markdown"}
        <ContentEditor
          content={post.content}
          on:contentupdate={handleContentUpdate}
        />
      {:else if currentTab === "preview"}
        <ContentPreview content={post.content} />
      {/if}
    </div>
  </div>

  <div class="actions">
    <button type="submit">Create</button>
  </div>
</form>

<style>
  .field + .field {
    margin-top: 0.5em;
  }
  .field span {
    display: block;
    font-size: var(--text-2);
  }
  .actions {
    margin-top: 1em;
  }

  input[type="text"] {
    width: 100%;
  }

  .title input[type="text"] {
    letter-spacing: -0.03em;
    font-size: var(--text04);
    font-weight: bold;
  }
  .summary input[type="text"] {
    font-size: var(--text01);
  }
  .slug input[type="text"] {
    font-family: monospace;
  }

  .content {
    height: 24em;
  }
  .content :global .content-preview {
    border: 1px solid var(--neutral200);
  }
</style>
