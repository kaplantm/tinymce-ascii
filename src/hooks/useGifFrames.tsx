import { useCallback, useEffect, useMemo, useState } from "react";
import { gifFrames } from "gif-frames";

export const useGifFrames = (imageSrc: string | null) => {
  const [frames, setFrames] = useState<(ImageData | null)[]>([]);

  const updateFrames = useCallback(async () => {
    if (!imageSrc) setFrames([]);
    try {
      const frameData = await gifFrames({ url: 'https://i.giphy.com/3o7btYoGy2JkgrLowE.gif', frames: "all", outputType: "canvas", quality: 20 });
      const example = frameData[0].getImage();
      console.log({ example });
      setFrames([]);
    } catch (e) {
      console.error(e);
      setFrames([]); // TODO: set frame to funny error img
    }
  }, [imageSrc]);

  useEffect(() => {
    updateFrames();
  }, [updateFrames]);

  return useMemo(
    () => ({
      frames,
    }),
    [frames]
  );
};
