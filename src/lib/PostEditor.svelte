<script>
</script>

<form>
  <div class="field title">
    <label>
      <span>Title</span>
      <input type="text" required placeholder="Title goes here" />
    </label>
  </div>
  <div class="field summary">
    <label>
      <span>Summary</span>
      <input type="text" placeholder="What it's going to be about" />
    </label>
  </div>
  <div class="field slug">
    <label>
      <span>Slug</span>
      <input type="text" placeholder="title-goes-here" />
    </label>
  </div>
  <div class="field">
    <textarea>Markdown goes here</textarea>
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
</style>
