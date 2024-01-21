import { AsciiOptions, defaultAsciiOptions } from "./imageDataToAscii";

const scaleImage = (image: HTMLImageElement, options: AsciiOptions) => {
  if (!options.scale && !options.maxDimension) return { height: image.height, width: image.width };

  const maxDimensionScale = options.maxDimension
    ? options.maxDimension / Math.max(image.width, image.height)
    : options.scale;
  const scale = Math.min(maxDimensionScale, options.scale);
  console.log({
    scale,
    maxDimensionScale,
    option: options.scale,
    width: image.width,
    height: image.height,
    maxD: options.maxDimension,
  });
  return { height: image.height * scale, width: image.width * scale };
};

export const getScaledImageData = (img, canvas, ctx, options = {}) => {
  const fullOptions = { ...defaultAsciiOptions, ...options };
  const scaledDimensions = scaleImage(img, fullOptions);
  // Set the new size of the canvas
  canvas.width = scaledDimensions.width;
  canvas.height = scaledDimensions.height;

  // Draw the original image onto the canvas
  ctx.drawImage(img, 0, 0, scaledDimensions.width, scaledDimensions.height);

  // Get the pixel data from the canvas context
  return ctx.getImageData(0, 0, scaledDimensions.width, scaledDimensions.height);
};

export const srcToImageData = async (
  imageSrc: string | null,
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  options: AsciiOptions
) => {
  if (!imageSrc) return null;
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d");

  if (!canvas || !ctx) return;
  const img = new Image();
  img.src = imageSrc;

  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
  });

  return getScaledImageData(img, canvas, ctx, options);
};
