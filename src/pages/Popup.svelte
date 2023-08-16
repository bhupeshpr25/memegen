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

  onMount(fetchMemeTemplates);

  let memeTemplates: MemeTemplate[] = [];
  let selectedTemplate: MemeTemplate | null = null;
  let templateId: string | null = null;

  async function fetchMemeTemplates() {
    memeTemplates = await fetchTemplates();
  }

  async function selectTemplate(template: MemeTemplate) {
    selectedTemplate = template;
    templateId = template.id;
  }
</script>

<main>
  <div class="flex m-3 space-x-2">
    <img src="/memegen.webp" alt="icon" class="h-8 w-8" />
    <div class="w-full flex justify-between border-b-2 border-teal-600">
      <h1 class="font-semibold text-lg text-teal-400">memegen</h1>
      <div class="text-sm text-teal-600">
        <a
          href="https://github.com/bhupeshpr25/memegen"
          target="_blank"
          rel="noopener noreferrer">code</a
        >
      </div>
    </div>
  </div>
  <div class="flex flex-col items-center justify-center">
    {#if !selectedTemplate}
      <h1 class="mt-3 font-semibold text-gray-200 text-md">Select Template</h1>

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
      <Template {selectedTemplate} onClose={() => (selectedTemplate = null)} />
    {/if}
  </div>
</main>
