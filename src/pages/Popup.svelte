<script lang="ts">
  import { onMount } from "svelte";
  import { fetchTemplates } from "../lib/fetchTemplates";
  import Template from "./Template.svelte";

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

  // Fetch templates
  async function fetchMemeTemplates() {
    memeTemplates = await fetchTemplates();
  }

  // Select a template
  async function selectTemplate(template: MemeTemplate) {
    selectedTemplate = template;
    templateId = template.id;
  }
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
      <h1 class="mt-3 font-semibold text-gray-200 text-md">Select Template</h1>

      <!-- Display all templates -->
      <div class="template-list">
        {#each memeTemplates as template}
          <div
            class="m-4"
            on:click={() => selectTemplate(template)}
            on:keypress
          >
            <img src={template.url} alt={template.name} />
          </div>
        {/each}
      </div>
    {:else}
      <!-- Render selected template -->
      <Template {selectedTemplate} onClose={() => (selectedTemplate = null)} />
    {/if}
  </div>
</main>
