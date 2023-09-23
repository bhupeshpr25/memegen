export interface GeneratedMeme {
  url: string;
}

export async function generateMeme(
  selectedTemplateId: string,
  captionInputs: string[],
  username: string,
  password: string
): Promise<GeneratedMeme | null> {
  // API request parameters
  const params = new URLSearchParams();
  params.set("template_id", selectedTemplateId);
  params.set("username", username);
  params.set("password", password);
  params.set("max_font_size", "32");

  // Append captions to parameters
  captionInputs.forEach((caption, index) => {
    params.append(`boxes[${index}][text]`, caption);
  });

  // API request to generate meme
  const url = `https://api.imgflip.com/caption_image?${params.toString()}`;
  const response = await fetch(url);
  const data = await response.json();

  // Update generated meme state
  if (data.success) {
    return data.data;
  } else {
    console.error("Error generating meme:", data.error_message);
    return null;
  }
}

export async function copyMeme(generatedMeme: GeneratedMeme): Promise<void> {
  if (generatedMeme) {
    try {
      const response = await fetch(generatedMeme.url);
      const blob = await response.blob();

      const blobUrl = URL.createObjectURL(blob);

      const img = new Image();
      img.src = blobUrl;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const context = canvas.getContext("2d");

        if (context) {
          context.drawImage(img, 0, 0);

          canvas.toBlob((imageBlob) => {
            if (imageBlob) {
              const dataUrl = URL.createObjectURL(imageBlob);
              navigator.clipboard.write([
                new ClipboardItem({
                  [imageBlob.type]: imageBlob,
                }),
              ]);
              console.log("Image copied to clipboard");
            }
          });
        }
      };
    } catch (error) {
      console.error("Error copying image:", error);
    }
  }
}

export function downloadMeme(generatedMeme: GeneratedMeme): void {
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
