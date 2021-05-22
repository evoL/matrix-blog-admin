<script context="module">
  export async function load({ page, fetch }) {
    const { postId } = page.params;
    const post = await fetch(`/posts/${postId}.json`).then((p) => p.json());

    return {
      props: { post },
    };
  }
</script>

<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import PostEditor from "$lib/PostEditor.svelte";
  import { postStore } from "$lib/stores";

  export let post;
  $: postId = $page.params.postId;

  async function handleSave(e) {
    const newPost = e.detail;

    const response = await fetch(`/posts/${postId}.json`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });
    if (response.ok) {
      const json = await response.json();
      postStore.update((posts) =>
        posts.map((p) => (p.id === postId ? json : p))
      );
      post = json;
      alert("Update succeeded!");
    } else {
      const text = await response.text();
      alert(`Error ${response.status}: ${text}`);
    }
  }

  async function handleDelete() {
    if (!confirm("Do you really want to delete this post?")) return;

    const response = await fetch(`/posts/${postId}.json`, { method: "delete" });
    if (response.ok) {
      postStore.update((posts) => posts.filter((post) => post.id !== postId));
      postStore.subscribe((posts) => {
        if (posts.length) {
          goto(`/posts/${posts[0].id}`);
        } else {
          goto("/");
        }
      })();
    } else {
      const text = await response.text();
      alert(`Error ${response.status}: ${text}`);
    }
  }
</script>

<PostEditor
  {post}
  allowDelete={true}
  on:save={handleSave}
  on:delete={handleDelete}
/>
