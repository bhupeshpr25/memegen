<script lang="ts">
  import { onMount } from "svelte";

  export let selectedTemplate: any;
  export let onClose: any;

  const username = import.meta.env.VITE_IMGFLIP_USERNAME;
  const password = import.meta.env.VITE_IMGFLIP_PASSWORD;

  let captionInputs: string[] = [];
  let generatedMeme: any = null;

  onMount(() => {
    captionInputs = Array.from(
      { length: selectedTemplate.box_count },
      () => ""
    );
  });

  async function generateMeme() {
    const body = new URLSearchParams();
    body.set("template_id", selectedTemplate.id);
    body.set("username", username);
    body.set("password", password);

    captionInputs.forEach((caption, index) => {
      body.set(`text${index}`, caption);
    });

    const response = await fetch("https://api.imgflip.com/caption_image", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    const data = await response.json();

    if (data.success) {
      generatedMeme = data.data;
    } else {
      console.error("Error generating meme:", data.error_message);
    }
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
      const link = document.createElement("a");
      link.href = generatedMeme.url;
      link.download = "generated-meme.png";
      link.click();
    }
  }
</script>

<main>
  <button type="button" class="m-2 text-gray-300 text-sm" on:click={onClose}
    >back</button
  >
  <div class="flex flex-col items-center justify-center">
    <h1 class="my-2 font-sans font-semibold text-gray-200">Create Meme</h1>

    <div class="selected-template">
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

    {#if generatedMeme}
      <div class="my-4">
        <img src={generatedMeme.url} alt="Generated Meme" />
        <div class="mt-4 flex">
          <button
            type="button"
            class="block mx-auto rounded-md bg-teal-600 p-2 text-sm font-medium text-white transition hover:bg-teal-700 focus:outline-none focus:ring"
            on:click={copyMemeURL}>copy URL</button
          >
          <button
            type="button"
            class="block mx-auto rounded-md bg-teal-600 p-2 text-sm font-medium text-white transition hover:bg-teal-700 focus:outline-none focus:ring"
            on:click={downloadMeme}>open</button
          >
        </div>
      </div>
    {/if}
  </div>
</main>