<script>
  export let showModal;

  let dialog; // HTMLDialogElement

  // Show dialog if it exists and showModal is true
  $: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  class="flex flex-col items-center justify-center mx-auto max-w-screen-md rounded-lg bg-gray-900 text-gray-200 border-2 border-teal-500"
  bind:this={dialog}
  on:close={() => (showModal = false)}
  on:click|self={() => dialog.close()}
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="p-4" on:click|stopPropagation>
    <slot name="star" />
    <hr class="my-4" />
    <slot name="fix" />
  </div>

  <!-- svelte-ignore a11y-autofocus -->
  <button
    class="block p-2 my-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md"
    autofocus
    on:click={() => dialog.close()}>Close</button
  >
</dialog>
