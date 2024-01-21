import { AsciiOptions, imageDataToAscii } from "./imageDataToAscii";
import { srcToImageData } from "./srcToImageData";

export const srcToAscii = async (
  imageSrc: string | null,
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  options?: AsciiOptions
) => {
  console.log("***srcToAscii1")
  const imageData = await srcToImageData(imageSrc, canvasRef);
  console.log("***srcToAscii2")
  return imageDataToAscii(imageData, options);
};
