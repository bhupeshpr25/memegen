<script lang="ts">
  import Modal from "./Modal.svelte";
  export let showModal: boolean = false;
</script>

{#if showModal}
  <Modal bind:showModal>
    <div slot="star">
      <h2 class="text-white font-extrabold">🙏 Thank you for using memegen</h2>
      <p class="text-gray-100 mt-10 text-sm">
        Love the memes? <a
          href="https://www.buymeacoffee.com/bhupeshpr25"
          target="_blank"
          rel="noopener noreferrer"
          class="text-teal-400 hover:underline">brew some support! ☕ 😄</a
        >
      </p>
    </div>
    <div slot="fix" class="flex items-center">
      <div class="text-gray-200">Copy button not working?</div>
      <a
        href="https://github.com/bhupeshpr25/memegen#troubleshooting"
        class="text-teal-400 ml-3">see fix</a
      >
    </div>
  </Modal>
{/if}
