<script lang="ts">
  import { onMount } from "svelte";
  import { generateMeme, copyMeme, downloadMeme } from "../lib/utils/memeUtils";
  import type { GeneratedMeme } from "../lib/utils/memeUtils";

  export let selectedTemplate: {
    id: string;
    box_count: number;
    url: string;
    name: string;
  };

  // Callback for close action
  export let onClose: () => void;

  // Load environment variables
  const username: string = import.meta.env.VITE_IMGFLIP_USERNAME;
  const password: string = import.meta.env.VITE_IMGFLIP_PASSWORD;

  let generatedMemeUrl: string | null = null;
  let captionInputs: string[] = [];
  let generatingMeme = false;
  let imageLoaded = false;

  let buttonContainer: HTMLDivElement | null = null;

  // Initialize caption inputs based on template's box count
  onMount(() => {
    captionInputs = Array.from(
      { length: selectedTemplate.box_count },
      () => ""
    );
  });

  // Generate meme function
  async function generateMemeFunction() {
    generatingMeme = true;

    const generatedMeme: GeneratedMeme | null = await generateMeme(
      selectedTemplate.id,
      captionInputs,
      username,
      password
    );

    // Update generated meme state
    if (generatedMeme) {
      generatedMemeUrl = generatedMeme.url;

      // Scroll to the generated meme
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
    generatingMeme = false;
  }

  // Copy meme function
  async function copyMemeFunction() {
    if (generatedMemeUrl) {
      await copyMeme({ url: generatedMemeUrl });
    }
  }

  // Download meme function
  function downloadMemeFunction() {
    if (generatedMemeUrl) {
      downloadMeme({ url: generatedMemeUrl });
    }
  }
</script>

<main>
  <!-- Header -->
  <div class="flex justify-between items-center m-2">
    <button type="button" class="text-gray-300 text-2xl" on:click={onClose}>
      ⬅
    </button>
    <h1 class="font-sans font-semibold text-gray-200 text-center flex-grow">
      Create Meme
    </h1>
  </div>

  <!-- Selected template -->
  <div class="flex flex-col items-center justify-center">
    <div class="mx-2">
      <img src={selectedTemplate.url} alt={selectedTemplate.name} />
    </div>

    <!-- Caption input Form -->
    <form>
      {#each captionInputs as caption, index}
        <div class="my-4 ml-3">
          <label class="font-semibold text-gray-100">
            Caption {index + 1}:
            <textarea
              placeholder=""
              class="mt-1 p-2 w-11/12 rounded-md border-teal-500 text-gray-800 border-2 shadow-sm sm:text-sm"
              bind:value={captionInputs[index]}
            />
          </label>
        </div>
      {/each}
      <button
        type="button"
        class="block mx-auto rounded-md bg-teal-600 p-2 text-sm font-medium text-white transition hover:bg-teal-700 focus:outline-none focus:ring"
        on:click={generateMemeFunction}>Generate Meme</button
      >
    </form>

    <!-- Loading and displaying generated meme -->
    {#if generatingMeme}
      <p class="my-4 text-gray-200">generating meme...</p>
    {:else if generatedMemeUrl}
      <div class="my-4">
        <img
          src={generatedMemeUrl}
          alt="Generated Meme"
          on:load={() => {
            imageLoaded = true;

            //scroll to generated image
            requestAnimationFrame(() => {
              window.scrollTo(0, document.body.scrollHeight);
            });
          }}
        />
        {#if imageLoaded}
          <div class="mt-4 flex" bind:this={buttonContainer}>
            <button
              type="button"
              class="mx-auto rounded-md w-16 bg-teal-600 p-2 text-sm font-medium text-white transition hover:bg-teal-700 focus:outline-none focus:ring"
              on:click={copyMemeFunction}>Copy</button
            >
            <button
              type="button"
              class="mx-auto rounded-md w-16 bg-teal-600 p-2 text-sm font-medium text-white transition hover:bg-teal-700 focus:outline-none focus:ring"
              on:click={downloadMemeFunction}>Save</button
            >
          </div>
        {/if}
      </div>
    {/if}
  </div>
</main>
