<script lang="ts">
  import Modal from "./Modal.svelte";
  export let showModal: boolean = false;
</script>

{#if showModal}
  <Modal bind:showModal>
    <div slot="star">
      <h2 class="text-white font-extrabold">Thank you for using memegen</h2>
      <p class="text-gray-100 mt-2 text-sm">
        If memegen helped you create some funny memes, consider giving it a star
        on <a
          href="https://github.com/bhupeshpr25/memegen"
          target="_blank"
          rel="noopener noreferrer"
          class="text-teal-400 hover:underline">GitHub</a
        >
      </p>
    </div>
    <div slot="fix">
      <h2 class="text-white font-extrabold">Copy button does not work?</h2>

      <h4 class="text-gray-50 mt-2">Reason -</h4>

      <p class="text-gray-100 text-sm my-3">
        On some Firefox browsers, this feature might be turned off by default.
      </p>

      <h4 class="text-gray-50 mt-4">Fix -</h4>

      <ul class="text-gray-100 text-sm mt-2">
        <div class="flex">
          <p>1. Visit the page -</p>
          <p class="text-teal-200 ml-2">about:config</p>
        </div>
        <div class="flex flex-col my-1">
          <p>2. Search for the following flag -</p>
          <p class="text-sm text-teal-200">
            dom.events.asyncClipboard.clipboardItem
          </p>
        </div>
        <p>3. Set it to true</p>
      </ul>
    </div>
  </Modal>
{/if}
