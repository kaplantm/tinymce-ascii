import { useCallback, useEffect, useMemo, useState } from "react";
import { AsciiOptions, imageDataToAscii } from "../lib/imageDataToAscii";

const scaleImage = (image: HTMLImageElement, maxDimension = 100) => {
  const scale = maxDimension / Math.max(image.width, image.height);
  console.log({
    scale,
    height: image.height * scale,
    width: image.width * scale,
    imageH: image.height,
    imageW: image.width,
  });
  return { height: image.height * scale, width: image.width * scale };
};

export const useAsciiImage = (imageSrc: string | null, canvasRef: React.MutableRefObject<HTMLCanvasElement | null>, options?: AsciiOptions) => {
  const [imageData, setImageData] = useState<ImageData | null>(null);

  const updateImageData = useCallback(async () => {
    if (!imageSrc) return setImageData(null);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      const scaledDimensions = scaleImage(img);
      // Set the new size of the canvas
      canvas.width = scaledDimensions.width;
      canvas.height = scaledDimensions.height;

      // Draw the original image onto the canvas
      ctx.drawImage(img, 0, 0, scaledDimensions.width, scaledDimensions.height);

      // Get the pixel data from the canvas context
      setImageData(ctx.getImageData(0, 0, scaledDimensions.width, scaledDimensions.height));
    };
    return img;
  }, [imageSrc, canvasRef]);

  useEffect(() => {
    updateImageData();
  }, [updateImageData]);

  return useMemo(
    () => ({
      ascii: imageDataToAscii(imageData, options),
      height: imageData?.height,
      width: imageData?.width,
    }),
    [imageData, options]
  );
};
