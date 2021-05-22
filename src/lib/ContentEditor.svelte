<script>
  import { basicSetup, EditorState, EditorView } from "@codemirror/basic-setup";
  import { defaultTabBinding } from "@codemirror/commands";
  import { markdown } from "@codemirror/lang-markdown";
  import { keymap } from "@codemirror/view";
  import {
    afterUpdate,
    createEventDispatcher,
    onDestroy,
    onMount,
  } from "svelte";

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
  function finishUpdate() {
    if (timeout == null) return;
    clearTimeout(timeout);
    updateDoc();
  }

  onMount(() => {
    const state = EditorState.create({
      doc: content,
      extensions: [
        basicSetup,
        markdown(),
        keymap.of([defaultTabBinding]),
        EditorView.lineWrapping,
        EditorView.updateListener.of((value) => {
          if (value.docChanged) {
            scheduleUpdate();
          }
        }),
        EditorView.domEventHandlers({
          blur: () => {
            finishUpdate();
          },
        }),
      ],
    });
    view = new EditorView({
      state,
      parent: hostElement,
    });
  });
  afterUpdate(() => {
    view.dispatch({
      changes: {
        from: 0,
        to: view.state.doc.length,
        insert: content,
      },
    });
  });
  onDestroy(() => {
    finishUpdate();
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
