// in this file we focus on
// Mini-Project: "Pixel Inspector"

// Load any image file
// Print its dimensions and format
// Extract and display the RGB values of the first 5 pixels

const sharp = require('sharp');

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
