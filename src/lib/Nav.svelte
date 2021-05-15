<script>
  export let posts;
  export let currentPath;
</script>

<nav>
  <h1>matrix-blog</h1>

  <section>
    <header>
      <h2>Posts</h2>
      <a href="/posts/new" class="add">Add</a>
    </header>

    <ul>
      {#each posts as post}
        <li>
          <a
            href="/posts/{post.id}"
            class:active={currentPath === `/posts/${post.id}`}
          >
            {post.title}
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
    color: var(--neutral700);
    text-decoration: none;
  }
  li a {
    font-size: 0.8rem;
    display: block;
    line-height: 1;
    padding: 0.5rem 1rem;
  }
  li a.active,
  li a:hover,
  li a:focus {
    background-color: var(--primary100);
  }
  header {
    display: flex;
    justify-content: space-between;
    margin-right: 1rem;
  }
  .add {
    align-self: center;
    border-radius: 2px;
    display: inline-block;
    font-size: 0.6em;
    font-weight: 500;
    padding: 0 0.5em;
    line-height: 1.875;
    background: var(--primary100);
  }
  .add:hover,
  .add:focus {
    background: var(--primary200);
  }

  .add:before {
    content: "+ ";
  }
</style>
