export function resizeDataUrlImage({
  dataUrl,
  width,
  height,
}: {
  dataUrl: string;
  width: number;
  height: number;
}): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = width;
      canvas.height = height;

      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        const resizedDataUrl = canvas.toDataURL();
        resolve(resizedDataUrl);
      } else {
        resolve("");
      }
    };

    img.src = dataUrl;
  });
}
