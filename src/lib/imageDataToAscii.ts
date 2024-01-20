// Code reference: https://github.com/S4NCHOPANZ4/ASCII-converter/blob/main/src/components/ImageToAcsii.jsx

export type AsciiOptions = {
  detail: number;
  fontSize: number;
  characterset: string;
  brightness: number;
  spacing: { letter: number; line: number };
};

export const charactersets = {
  original: "@$#wa*i=;,.",
  zeroOne: "01",
  circles: "●⚈⚉◉◔◑◍❍⚇⚆○◌",
  square: "■",
};

const defaultOptions: AsciiOptions = {
  detail: 100,
  fontSize: 14,
  characterset: charactersets.original,
  brightness: -1,
  spacing: { letter: 0, line: 3 },
};

// const asciiChars = "@&%QWNM0gB$#w}C{iF|(7J)vTLs?z/*cr!+<>;=^,_:'-.`    ";
const getAsciiCharacter = (brightness: number, characterset: string = charactersets.original) => {
  // Scale the brightness to the range of asciiChars array indexes
  const scaledBrightness = Math.floor((brightness / 255) * (characterset.length - 1));

  // Get the corresponding ASCII character
  const asciiChar = characterset.charAt(scaledBrightness);

  return asciiChar;
};

const createRowsStr = (arr: string[][], spacing: number) => {
  const rowsWithSpacing = arr.map((row) => row.join("".repeat(spacing)));
  const asciiArt = rowsWithSpacing.join("<br/>");
  return asciiArt;
};

const createRows = (arr: string[], length: number) => {
  const row = [];
  for (let i = 0; i < arr.length; i += length) {
    const chunk = arr.slice(i, i + length);
    row.push(chunk);
  }
  const imgStr = createRowsStr(row, 1);

  return imgStr;
};

export const imageDataToAscii = (imageData: ImageData | null | undefined, options?: Partial<AsciiOptions>): string => {
  const data = imageData?.data;
  if (!data) return "";

  const fullOptions = {...defaultOptions, options};
  // Create an array to store the ASCII characters
  const asciiArray = [];
  // Iterate over the pixel data and convert it to ASCII characters
  for (let i = 0; i < data.length; i += 4) {
    // Get the color channel values (red, green, blue)
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];

    // Calculate the average brightness
    const brightness = red + green + blue; // dividing by 4 here sinces theres a lot of extra whitespace in ascii

    // Convert the average brightness to an ASCII character
    const asciiChar = getAsciiCharacter(brightness / 3 - fullOptions.brightness, fullOptions.characterset);

    // Store the ASCII character in the array
    // asciiArray.push(`<span style="color: rgb(${red}, ${green}, ${blue});">${asciiChar}</span>`);

    asciiArray.push(`<span style="">${asciiChar}</span>`);
  }

  const lineHeight = fullOptions.fontSize / 2 + fullOptions.spacing.line;
  const asciiContent = createRows(asciiArray, imageData.width);
  return `<div style="font-family:Terminal,monospace,sans-serif; font-size:${fullOptions.fontSize}px; line-height: ${lineHeight}px; letter-spacing:-${fullOptions.spacing.letter}px;  white-space:nowrap">${asciiContent}</div>`;
};