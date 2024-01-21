import { AsciiOptions, defaultAsciiOptions, imageDataToAscii } from "./imageDataToAscii";
import { srcToImageData } from "./srcToImageData";

export const srcToAscii = async (
  imageSrc: string | null,
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  options?: Partial<AsciiOptions>
) => {

  const fullOptions = {...defaultAsciiOptions, ...options};
  const imageData = await srcToImageData(imageSrc, canvasRef, fullOptions);
  return imageDataToAscii(imageData, fullOptions);
};
