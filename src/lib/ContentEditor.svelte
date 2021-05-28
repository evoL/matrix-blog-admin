<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let content = "";
</script>

<textarea
  bind:value={content}
  on:input={() => {
    dispatch("contentupdate", content);
  }}
/>

<style>
  textarea {
    width: 100%;
    height: 100%;
  }
</style>
