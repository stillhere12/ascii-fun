import { buildAsciiArt } from './asciiBuilder';
import { extractFrames } from './frameExtractor';
async function main() {
  // just implementing frameExtractor connection
  // output images will be pushed in this directory.
  try {
    const frames = await extractFrames('./cat.gif', 'temp', 3);
    console.log(frames);
    // now show the frames in terminal
    for (let i = 0; i < frames.length; i++) {
      const ascii = await buildAsciiArt(frames[i]!, `./output-${i}.txt`, 0);
      console.log(ascii);
    }
  } catch (error) {
    console.log(error);
  }
}
main();
