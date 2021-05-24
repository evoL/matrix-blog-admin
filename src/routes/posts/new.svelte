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
    if (response.ok) {
      const json = await response.json();
      postStore.update((posts) => [json.post, ...posts]);
      alert("Update succeeded!");
    } else {
      const text = await response.text();
      alert(`Error ${response.status}: ${text}`);
    }
  }
</script>

<svelte:head>
  <title>New post — matrix-blog</title>
</svelte:head>

<PostEditor on:save={handleSave} />

<style>
</style>
