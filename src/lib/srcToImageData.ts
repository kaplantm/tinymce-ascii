
const scaleImage = (image: HTMLImageElement, maxDimension = 300) => {
  // const scale = maxDimension / Math.max(image.width, image.height);
  // console.log({
  //   scale,
  //   height: image.height * scale,
  //   width: image.width * scale,
  //   imageH: image.height,
  //   imageW: image.width,
  // });
  const scale = 1;
  return { height: image.height * scale, width: image.width * scale };
};

export const srcToImageData = async (
  imageSrc: string | null,
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
) => {
  console.log("srcToImageData1");
  if (!imageSrc) return null;
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d");

  console.log("srcToImageData2");
  if (!canvas || !ctx) return;
  const img = new Image();
  img.src = imageSrc;
console.log("***img.src ", img.src )
  console.log("srcToImageData3");
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject
  });

  canvas.style.width = `${img.width}`;
  canvas.style.height = `${img.height}`;

  console.log("srcToImageData4");
  const scaledDimensions = scaleImage(img);
  // Set the new size of the canvas
  canvas.width = img.width;
  canvas.height = img.height;

  console.log("srcToImageData5");
  // Draw the original image onto the canvas
  ctx.drawImage(img, 0, 0, img.width, img.height);

  console.log("srcToImageData6");
  // Get the pixel data from the canvas context
  return ctx.getImageData(0, 0, img.width, img.height);
};
