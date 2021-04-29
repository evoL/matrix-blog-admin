<script>
  export let posts;
</script>

<nav>
  <h1>matrix-blog</h1>

  <section>
    <h2>Posts</h2>
    <ul>
      {#each posts as post}
        <li>
          <a href="/posts/{post.id}">
            {post.title || "(untitled post)"}
          </a>
        </li>
      {/each}
    </ul>
  </section>
</nav>

<style>
  nav {
    background-color: var(--primary50);
    width: 15em;
  }
  h1 {
    font-size: 1.2rem;
    line-height: 3rem;
    padding: 0 1rem;
  }
  h2 {
    font-size: 0.8rem;
    line-height: 2rem;
    padding: 0 1rem;
  }
  a {
    color: #768f7a;
    font-size: 0.8rem;
    display: block;
    line-height: 1.5rem;
    padding: 0 1rem;
    text-decoration: none;
  }
  a:hover,
  a:focus {
    background-color: var(--primary100);
  }
</style>
