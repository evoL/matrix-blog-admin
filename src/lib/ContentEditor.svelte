<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { EditorView, EditorState, basicSetup } from "@codemirror/basic-setup";
  import { markdown } from "@codemirror/lang-markdown";

  export let content = "";
  let hostElement;
  let view;
  const dispatch = createEventDispatcher();

  let timeout;
  function updateDoc() {
    dispatch("contentupdate", view.state.doc.toString());
  }
  function scheduleUpdate() {
    if (timeout != null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      updateDoc();
      timeout = undefined;
    }, 1000);
  }

  onMount(() => {
    const state = EditorState.create({
      doc: content,
      extensions: [
        basicSetup,
        markdown(),
        EditorView.updateListener.of((value) => {
          if (value.docChanged) {
            scheduleUpdate();
          }
        }),
      ],
    });
    view = new EditorView({
      state,
      parent: hostElement,
    });
  });
</script>

<div class="content-editor" bind:this={hostElement} />

<style>
  .content-editor,
  .content-editor :global .cm-editor,
  .content-editor :global .cm-content,
  .content-editor :global .cm-gutter {
    height: 100%;
  }
  .content-editor :global .cm-scroller {
    overflow: auto;
  }
  .content-editor :global .cm-gutters {
    background-color: var(--neutral50);
    color: var(--neutral500);
    border-right: 1px solid var(--neutral200);
  }
  .content-editor :global .cm-wrap {
    border: 1px solid var(--neutral200);
  }
  .content-editor :global .cm-focused {
    outline: none;
    border-color: var(--primary300);
  }
</style>
