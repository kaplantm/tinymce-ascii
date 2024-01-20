import { AsciiOptions, imageDataToAscii } from "./imageDataToAscii";
import { srcToImageData } from "./srcToImageData";

export const srcToAscii = async (
  imageSrc: string | null,
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  options?: AsciiOptions
) => {
  const imageData = await srcToImageData(imageSrc, canvasRef);
  return imageDataToAscii(imageData, options);
};
