// Fetch meme templates
export async function fetchTemplates() {
  try {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const data = await response.json();
    return data.data.memes;
  } catch (error) {
    console.error("Error fetching meme templates:", error);
    return [];
  }
}
