<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { postStore } from "$lib/stores";

  let postId = $page.params.postId;

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

<p>It's a blog post!</p>

<button type="button" on:click={handleDelete}>Delete</button>
