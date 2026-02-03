// in this file we focus on
// Mini-Project: "Pixel Inspector"

// Load any image file
// Print its dimensions and format
// Extract and display the RGB values of the first 5 pixels

const sharp = require('sharp');
import { grayScaleConverter } from '../grayScaler/index.js';
const image = sharp('./ben.jpg');
console.log(typeof image); // checking what it returns

console.log(image);

// some modification to ben bro
sharp('./ben.jpg')
  .resize(1183, 2560)
  .toFile('./ben2.jpg', (err, info) => {
    console.log(err); // null so no error
    console.log(info); // i got an object
    console.log(typeof info);
  });

sharp('./ben.jpg').toFile('./ben3.jpg', (err, info) => {
  console.log(err);
  console.log(info); // we get information about the image
});

// loading the image file
const image2 = sharp('./ben.jpg');
// now printing dimensions and format
async function getData(image) {
  const { autoOrient } = await sharp(image).metadata();
  // await because it returns a promise
  console.log(`Width: ${autoOrient.width}, Height: ${autoOrient.height}`);
  console.log(autoOrient.format);
}
const data = await getData('./ben.jpg');
console.log(data);

// to check if object returned is promise
const isPromise = (obj) => {
  return typeof obj?.then === 'function';
};

// checking if sharp is promise
console.log(`checking if sharp is promise: ${isPromise(sharp('./ben.jpg'))}`);

async function getPixels(image) {
  try {
    const metaData = await sharp(image).metadata();
    const { data, info } = await sharp(image).raw().toBuffer({ resolveWithObject: true });
    const pixelArray = new Uint8Array(data.buffer);
    if (metaData.channels === 3) {
      console.log(`It is rgb.`);
      // getting the first 5 pixels
      for (let i = 0; i < 15; i += 3) {
        console.log(`R: ${pixelArray[i]}, G: ${pixelArray[i + 1]}, B: ${pixelArray[i + 2]}`);
      }
    } else if (metaData.channels === 4) {
      console.log(`It is rgba.`);
      // getting the first 5 pixels
      for (let i = 0; i < 20; i += 4) {
        console.log(
          `R: ${pixelArray[i]}, G: ${pixelArray[i + 1]}, B: ${pixelArray[i + 2]}, A: ${pixelArray[i + 3]}`
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
}
getPixels('./ben.jpg');

async function ImageInspectorReal(iamge: string) {
  const instance = sharp(iamge);
  const metadata = await instance.metadata();
  console.log(`Width: ${metadata.width}, Height: ${metadata.height}`);
  console.log(`Format: ${metadata.format}`);
  console.log(`Channels: ${metadata.channels}`);
  console.log(`Format type: ${metadata.channels === 3 ? 'RGB' : 'RGBA'}`);
  const { data } = await instance.raw().toBuffer({ resolveWithObject: true });
  const pixelArray = new Uint8Array(data.buffer);
  const channels = metadata.channels;
  for (let i = 0; i < pixelArray.length; i += channels) {
    if (channels === 3) {
      const r = pixelArray[i];
      const g = pixelArray[i + 1];
      const b = pixelArray[i + 2];

      // Create colored block using ANSI escape codes
      const colorBlock = `\x1b[48;2;${r};${g};${b}m     \x1b[0m`;
      // took help from claude alot here.
      console.log(`${colorBlock} Pixel ${i + 1} : RGB(${r}, ${g}, ${b})`);
    } else if (channels === 4) {
      console.log(`pixelArray[i], pixelArray[i + 1], pixelArray[i + 2], pixelArray[i + 3]`);
    }
    console.log('\n');
  }
}

async function ImageInspectorGrayScale(image: string) {
  const instance = sharp(image);
  const metadata = await instance.metadata();
  console.log(`Width: ${metadata.width}, Height: ${metadata.height}`);
  console.log(`Format: ${metadata.format}`);
  console.log(`Channels: ${metadata.channels}`);
  console.log(`Format type: ${metadata.channels === 3 ? 'RGB' : 'RGBA'}`);
  const { data } = await instance.raw().toBuffer({ resolveWithObject: true });
  const pixelArray = new Uint8Array(data.buffer);
  if (!pixelArray) {
    throw new Error('Pixel array is empty');
  }
  const channels = metadata.channels;
  for (let i = 0; i < pixelArray.length; i += channels) {
    if (channels === 3) {
      // it tells typescript that it is a number and not undefined
      let r = pixelArray[i]!;
      let g = pixelArray[i + 1]!;
      let b = pixelArray[i + 2]!;

      const grayScale = grayScaleConverter(r, g, b);
      r = g = b = grayScale;
      // Create colored block using ANSI escape codes
      const colorBlock = `\x1b[48;2;${r};${g};${b}m     \x1b[0m`;
      console.log(`${colorBlock} Pixel ${i + 1} : RGB(${r}, ${g}, ${b})`);
    } else if (channels === 4) {
      console.log(`pixelArray[i], pixelArray[i + 1], pixelArray[i + 2], pixelArray[i + 3]`);
    }
    console.log('\n');
  }
}
ImageInspectorGrayScale('./ben.jpg');
