import { useCallback, useEffect, useMemo, useState } from "react";
import { imageDataToAscii } from "../lib/imageDataToAscii";

const scaleImage = (image: HTMLImageElement, maxDimension = 500) => {
  // const actualMax = Math.max(Math.min(window.innerHeight-100, window.innerWidth-100), maxDimension);

  const actualMax = 300;
  const scale = actualMax / Math.max(image.width, image.height);
  return { height: image.height * scale, width: image.width * scale };
};

export const useAsciiImage = (imageSrc: string, canvasRef: React.MutableRefObject<HTMLCanvasElement | null>) => {
  const [imageData, setImageData] = useState<ImageData | null>(null);

  const updateImageData = useCallback(async () => {
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
      ascii: imageDataToAscii(imageData),
      height: imageData?.height,
      width: imageData?.width,
    }),
    [imageData]
  );
};
