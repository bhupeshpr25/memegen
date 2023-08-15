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

<main class="flex flex-col items-center justify-center">
  {#if !selectedTemplate}
    <h1 class="mt-3 font-sans font-semibold text-gray-200">Select Template</h1>

    <div class="template-list">
      {#each memeTemplates as template}
        <div class="m-4" on:click={() => selectTemplate(template)} on:keypress>
          <img src={template.url} alt={template.name} />
        </div>
      {/each}
    </div>
  {:else}
    <Template {selectedTemplate} onClose={() => (selectedTemplate = null)} />
  {/if}
</main>
