import { writeFileSync } from 'fs';
import sharp from 'sharp';
import { brightnessToCharacter } from './characterMapper';
import { pixelBufferToBrightness } from './grayScaleMapper';
import { loadAndResize } from './imageLoader';
export async function buildAsciiArt(imagePath: string, outputPath: string, contrast: number) {
  const metadata = await sharp(imagePath).metadata();
  const imageWidth = metadata.width!;
  const imageHeight = metadata.height!;
  const terminalWidth = process.stdout.columns ?? 171;
  const terminalHeight = process.stdout.rows ?? 47;
  const scaleW = terminalWidth / imageWidth;
  const scaleH = terminalHeight / imageHeight;
  const scale = Math.min(scaleW, scaleH);
  const requiredWidth = Math.floor(imageWidth * scale);
  const requiredHeight = Math.floor(imageHeight * scale);
  const { channels, pixelArray } = await loadAndResize(
    imagePath,
    requiredWidth,
    requiredHeight,
    outputPath
  );

  const colorArrayinRGB: number[] = pixelBufferToBrightness(pixelArray, channels);
  const result: string[][] = brightnessToCharacter(
    colorArrayinRGB,
    pixelArray,
    channels,
    requiredWidth,
    requiredHeight,
    contrast
  );
  let asciiString = '';
  for (let i = 0; i < result.length; i++) {
    console.log(result[i]?.length);
    const padding = Math.floor((terminalWidth - result[i]!.length) / 2);
    for (let j = 0; j < padding; j++) {
      asciiString += ' ';
    }
    asciiString += result[i]!.join('') + '\x1b[0m\n';
  }
  // see it is coming to left side of terminal
  // we have to shift it to center
  writeFileSync(outputPath, asciiString);
  return asciiString;
}
