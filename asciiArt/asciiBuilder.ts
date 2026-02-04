import { writeFileSync } from 'fs';
import sharp from 'sharp';
import { brightnessToCharacter } from './characterMapper';
import { pixelBufferToBrightness } from './grayScaleMapper';
import { loadAndResize } from './imageLoader';
export async function buildAsciiArt(imagePath: string, outputPath: string, contrast: number) {
  const metadata = await sharp(imagePath).metadata();
  const imageWidth = metadata.width!;
  const imageHeight = metadata.height!;
  const terminalWidth = process.stdout.columns ?? 120;
  const terminalHeight = process.stdout.rows ?? 40;
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

  const brightnessArray: number[] = pixelBufferToBrightness(pixelArray, channels);
  const result: string[][] = brightnessToCharacter(
    brightnessArray,
    requiredWidth,
    requiredHeight,
    contrast // Pass the new contrast parameter from gemini ai agent
  );
  let asciiString = '';
  for (let i = 0; i < result.length; i++) {
    asciiString += result[i]!.join('') + '\n';
  }
  writeFileSync(outputPath, asciiString);
  return asciiString;
}
