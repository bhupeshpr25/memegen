<script>
  export let searchTerm;
</script>

<div class="my-4">
  <input
    type="text"
    class="p-2 rounded-md w-full"
    placeholder="search template"
    autocomplete="off"
    bind:value={searchTerm}
    on:input
  />
</div>
