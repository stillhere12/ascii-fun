import sharp from 'sharp';
// Purpose: load image, resize image, prepare for preprocessing
export async function loadAndResize(
  imagePath: string,
  width: number,
  height: number,
  outputPath: string
) {
  await sharp(imagePath).resize(width, height, { kernel: sharp.kernel.nearest }).toFile(outputPath);
  const metadata = await sharp(outputPath).metadata();
  const channels = metadata.channels!;
  const { data } = await sharp(outputPath).raw().toBuffer({ resolveWithObject: true });
  const pixelArray = new Uint8Array(data.buffer);
  // return pixel array, actual width and height
  return {
    channels,
    pixelArray,
  };
}
