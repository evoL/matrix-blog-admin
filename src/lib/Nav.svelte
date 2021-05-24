<script>
  export let posts;
  export let currentPath;

  let collapsed = false;
</script>

<nav class:collapsed>
  <h1>matrix-blog</h1>

  <button
    class="toggle"
    title={collapsed ? "Expand" : "Collapse"}
    on:click={() => (collapsed = !collapsed)}
  >
    {collapsed ? "▶" : "◀"}
  </button>

  <section class="posts">
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
    position: relative;
    min-width: 15em;
    width: 15em;
  }
  nav.collapsed {
    min-width: 2em;
    width: 2em;
  }
  .collapsed h1,
  .collapsed .posts {
    display: none;
  }
  .collapsed .toggle {
    right: 0.25rem;
  }

  .toggle {
    border: 0;
    padding: 0;
    position: absolute;
    top: 1.5rem;
    transform: translateY(-50%);
    right: 1rem;
    width: 1.5rem;
    height: 1.5rem;
  }
  .toggle:hover {
    background-color: var(--primary100);
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
