<script lang="ts">
  import { onMount } from "svelte";

  export let selectedTemplate: {
    id: string;
    box_count: number;
    url: string;
    name: string;
  };
  export let onClose: () => void;

  const username: string = import.meta.env.VITE_IMGFLIP_USERNAME;
  const password: string = import.meta.env.VITE_IMGFLIP_PASSWORD;

  interface GeneratedMeme {
    url: string;
  }

  let generatedMeme: GeneratedMeme | null = null;
  let captionInputs: string[] = [];
  let generatingMeme = false;
  let imageLoaded = false;

  onMount(() => {
    captionInputs = Array.from(
      { length: selectedTemplate.box_count },
      () => ""
    );
  });

  async function generateMeme() {
    generatingMeme = true;

    const params = new URLSearchParams();
    params.set("template_id", selectedTemplate.id);
    params.set("username", username);
    params.set("password", password);
    params.set("max_font_size", "32");

    captionInputs.forEach((caption, index) => {
      params.append(`boxes[${index}][text]`, caption);
    });

    const url = `https://api.imgflip.com/caption_image?${params.toString()}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.success) {
      generatedMeme = data.data;
    } else {
      console.error("Error generating meme:", data.error_message);
    }
    generatingMeme = false;
  }

  async function copyMemeURL() {
    if (generatedMeme) {
      try {
        await navigator.clipboard.writeText(generatedMeme.url);
        console.log("URL copied to clipboard:", generatedMeme.url);
      } catch (error) {
        console.error("Error copying URL to clipboard:", error);
      }
    }
  }

  function downloadMeme() {
    if (generatedMeme) {
      fetch(generatedMeme.url)
        .then((response) => response.blob())
        .then((blob) => {
          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = "generated-meme.png";
          link.click();
          URL.revokeObjectURL(blobUrl);
        })
        .catch((error) => {
          console.error("Error downloading meme:", error);
        });
    }
  }
</script>

<main>
  <div class="flex justify-between items-center m-2">
    <button type="button" class="text-gray-300 text-2xl" on:click={onClose}>
      ⬅
    </button>
    <h1 class="font-sans font-semibold text-gray-200 text-center flex-grow">
      Create Meme
    </h1>
  </div>

  <div class="flex flex-col items-center justify-center">
    <div class="selected-template mx-2">
      <img src={selectedTemplate.url} alt={selectedTemplate.name} />
    </div>

    <form>
      {#each captionInputs as caption, index}
        <div class="my-4 ml-3">
          <label class="font-semibold text-gray-100">
            Caption {index + 1}:
            <textarea
              placeholder=""
              class="mt-1 w-11/12 rounded-md border-teal-500 text-gray-800 border-2 shadow-sm sm:text-sm"
              bind:value={captionInputs[index]}
            />
          </label>
        </div>
      {/each}
      <button
        type="button"
        class="block mx-auto rounded-md bg-teal-600 p-2 text-sm font-medium text-white transition hover:bg-teal-700 focus:outline-none focus:ring"
        on:click={generateMeme}>Generate Meme</button
      >
    </form>

    {#if generatingMeme}
      <p class="my-4 text-gray-200">Generating meme...</p>
    {:else if generatedMeme}
      <div class="my-4">
        <img
          src={generatedMeme.url}
          alt="Generated Meme"
          on:load={() => {
            imageLoaded = true;
          }}
        />
        {#if imageLoaded}
          <div class="mt-4 flex">
            <button
              type="button"
              class="mx-auto rounded-md bg-teal-600 p-2 text-sm font-medium text-white transition hover:bg-teal-700 focus:outline-none focus:ring"
              on:click={copyMemeURL}>copy URL</button
            >
            <button
              type="button"
              class="mx-auto rounded-md bg-teal-600 p-2 text-sm font-medium text-white transition hover:bg-teal-700 focus:outline-none focus:ring"
              on:click={downloadMeme}>download</button
            >
          </div>
        {/if}
      </div>
    {/if}
  </div>
</main>
