import { buildAsciiArt } from './asciiBuilder';
import { extractFrames } from './frameExtractor';
async function main() {
  // just implementing frameExtractor connection
  // output images will be pushed in this directory.
  await extractFrames('./cat.gif', 'temp', 3);
  const contrasts = [-5, 0, 10];

  for (let i = 0; i < contrasts.length; i++) {
    console.log(`Contrast ${contrasts[i]}`);
    const ascii = await buildAsciiArt('./girl.png', `./output-${i}.txt`, contrasts[i]!);
    console.log(ascii);
  }
}
main();
