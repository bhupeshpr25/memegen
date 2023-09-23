<script lang="ts">
  import { onMount } from "svelte";
  import { fetchTemplates } from "../lib/utils/fetchTemplates";
  import Template from "./Template.svelte";
  import Search from "../lib/components/Search.svelte";

  interface MemeTemplate {
    id: string;
    url: string;
    name: string;
    box_count: number;
  }

  // Fetch meme templates on component mount
  onMount(fetchMemeTemplates);

  let memeTemplates: MemeTemplate[] = [];
  let selectedTemplate: MemeTemplate | null = null;
  let templateId: string | null = null;
  let filteredTemplates: MemeTemplate[] = [];
  let selectedTemplateName: string = "";

  // Fetch templates
  async function fetchMemeTemplates() {
    memeTemplates = await fetchTemplates();
  }

  // Select a template
  async function selectTemplate(template: MemeTemplate) {
    selectedTemplate = template;
    templateId = template.id;
  }

  // For Search Input
  let searchTerm = "";
  // resets language menu if search input is used
  $: if (searchTerm) selectedTemplateName = "";

  const searchTemplates = () => {
    return (filteredTemplates = memeTemplates.filter((template) => {
      let temmplateName = template.name.toLowerCase();
      return temmplateName.includes(searchTerm.toLowerCase());
    }));
  };
</script>

<main>
  <!-- Header -->
  <div class="flex m-3 space-x-2">
    <img src="/memegen.webp" alt="icon" class="h-8 w-8" />
    <div class="w-full flex justify-between border-b-2 border-teal-600">
      <h1 class="font-semibold text-lg text-teal-400">memegen</h1>
      <div class="text-sm text-teal-600">
        <a
          href="https://github.com/bhupeshpr25/memegen"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/github.png" alt="code" width="32" height="32" />
        </a>
      </div>
    </div>
  </div>
  <div class="flex flex-col items-center justify-center">
    <!-- Conditional rendering based on selected template -->
    {#if !selectedTemplate}
      <!-- Search -->
      <div class="w-full h-20 p-4">
        <Search bind:searchTerm on:input={searchTemplates} />
      </div>

      <!-- Display all templates -->
      <div>
        {#if searchTerm && filteredTemplates.length === 0}
          <div class="text-lg text-white mt-20">no results :/</div>
        {:else if filteredTemplates.length > 0}
          {#each filteredTemplates as template}
            <div
              class="m-4 border-2 border-gray-300 rounded-md"
              on:click={() => selectTemplate(template)}
              on:keypress
            >
              <div class="m-2 text-white font-semibold">
                {template.name}
              </div>
              <img src={template.url} alt={template.name} />
            </div>
          {/each}
        {:else}
          {#each memeTemplates as template}
            <div
              class="m-4 border-2 border-gray-300 rounded-md"
              on:click={() => selectTemplate(template)}
              on:keypress
            >
              <div class="m-2 text-white font-semibold">
                {template.name}
              </div>
              <img src={template.url} alt={template.name} />
            </div>
          {/each}
        {/if}
      </div>
    {:else}
      <!-- Render selected template -->
      <Template {selectedTemplate} onClose={() => (selectedTemplate = null)} />
    {/if}
  </div>
</main>
