const sharp = require('sharp');
// Purpose: load image, resize image, prepare for preprocessing
import { grayScaleConverter } from '../grayScaler/index.js';
async function loadAndResize(imagePath: string, width: number, height: number, outputPath: string) {
  sharp(imagePath)
    .resize(width, height)
    .toFile(outputPath, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  const { autoOrient } = await sharp(outputPath).metadata();
  const originalHeight = autoOrient.height;
  const originalWidth = autoOrient.width;
  const { data } = await sharp(outputPath).raw().toBuffer({ resolveWithObject: true });
  const pixelArray = new Uint8Array(data.buffer);
  for (let i = 0; i < pixelArray.length; i += autoOrient.channels) {
    if (autoOrient.channels === 3) {
      // it tells typescript that it is a number and not undefined
      let r = pixelArray[i]!;
      let g = pixelArray[i + 1]!;
      let b = pixelArray[i + 2]!;
      const grayScale = grayScaleConverter(r, g, b);
      pixelArray[i] = pixelArray[i + 1] = pixelArray[i + 2] = grayScale;
      // we don't want to change the original image and did gray scaling
      // Create colored block using ANSI escape codes
      const colorBlock = `\x1b[48;2;${r};${g};${b}m     \x1b[0m`;
      console.log(`${colorBlock} Pixel ${i + 1} : RGB(${r}, ${g}, ${b})`);
    } else if (autoOrient.channels === 4) {
      console.log(`pixelArray[i], pixelArray[i + 1], pixelArray[i + 2], pixelArray[i + 3]`);
    }
    console.log('\n');
  }
  console.log(pixelArray);
  // return pixel array, actual width and height
  return {
    channels: autoOrient.channels,
    width: originalWidth,
    height: originalHeight,
    pixelArray,
  };
}
