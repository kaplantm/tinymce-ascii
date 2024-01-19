// Code reference: https://github.com/S4NCHOPANZ4/ASCII-converter/blob/main/src/components/ImageToAcsii.jsx

const fontSize = 14;
const letterSpacing = 0;
const lineHeight = fontSize/2+1;

const getAsciiCharacter = (brightness: number) => {
  // const asciiChars = '@ $#wa*i=;,.    ';
  const asciiChars = '■';
  // const asciiChars = '@&%$#wa*i=-;,.    ';
  // const asciiChars = "@&%QWNM0gB$#w}C{iF|(7J)vTLs?z/*cr!+<>;=^,_:'-.`    ";
  // const asciiChars = "■◉★☃◊ ";
  // const asciiChars = ".,:!*#$@";

  // const asciiChars = "◉★◊◊";
  // const asciiChars = "𓆉";
  // .,:!*#$@
  // Scale the brightness to the range of asciiChars array indexes
  const scaledBrightness = Math.floor((brightness / 255) * (asciiChars.length - 1));

  // Get the corresponding ASCII character
  const asciiChar = asciiChars.charAt(scaledBrightness);

  return asciiChar;
  // return "■";
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

export const imageDataToAscii = (imageData: ImageData | null): string => {
  const data = imageData?.data;
  if (!data) return "";
  // Create an array to store the ASCII characters
  const asciiArray = [];
  // Iterate over the pixel data and convert it to ASCII characters
  for (let i = 0; i < data.length; i += 4) {
    // Get the color channel values (red, green, blue)
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];

    // Calculate the average brightness
    const brightness = (red + green + blue) / 4; // dividing by 4 here sinces theres a lot of extra whitespace in ascii

    // Convert the average brightness to an ASCII character
    const asciiChar = getAsciiCharacter(brightness);

    // Store the ASCII character in the array
    asciiArray.push(`<span style="color: rgb(${red}, ${green}, ${blue});">${asciiChar}</span>`);

    // asciiArray.push(`<span style="">${asciiChar}</span>`);
  }
  const asciiContent = createRows(asciiArray, imageData.width);
  return `<div style="font-family:Courier New,monospace,sans-serif; font-size:${fontSize}px; line-height: ${lineHeight}px; letter-spacing:-${letterSpacing}px; text-align:center; font-weight:800; white-space:nowrap">${asciiContent}</div>`;
};
