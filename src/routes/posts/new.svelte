<script>
  import PostEditor from "$lib/PostEditor.svelte";
  import { postStore } from "$lib/stores";

  async function handleSave(e) {
    const post = e.detail;

    const response = await fetch("/posts.json", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    const json = await response.json();

    postStore.update((posts) => [json.post, ...posts]);
  }
</script>

<PostEditor on:save={handleSave} />

<style>
</style>
