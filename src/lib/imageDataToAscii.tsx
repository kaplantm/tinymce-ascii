// Code reference: https://github.com/S4NCHOPANZ4/ASCII-converter/blob/main/src/components/ImageToAcsii.jsx

const getAsciiCharacter = (brightness: number) => {
  const asciiChars = "@ $#wa*i=;,.    ";
  // .,:!*#$@
  // Scale the brightness to the range of asciiChars array indexes
  const scaledBrightness = Math.floor((brightness / 255) * (asciiChars.length - 1));

  // Get the corresponding ASCII character
  const asciiChar = asciiChars.charAt(scaledBrightness);

  return asciiChar;
};

const createRowsStr = (arr: string[][], spacing: number) => {
  const rowsWithSpacing = arr.map((row) => row.join(" ".repeat(spacing)));
  const asciiArt = rowsWithSpacing.join("\n");
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
    const brightness = (red + green + blue) / 3;

    // Convert the average brightness to an ASCII character
    const asciiChar = getAsciiCharacter(brightness);

    // Store the ASCII character in the array
    asciiArray.push(asciiChar);
  }
  return createRows(asciiArray, imageData.width);
};
