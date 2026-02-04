import { buildAsciiArt } from './asciiBuilder';
async function main() {
  const contrasts = [-5, 0, 10];

  for (let i = 0; i < contrasts.length; i++) {
    console.log(`Contrast ${contrasts[i]}`);
    const ascii = await buildAsciiArt('./saturn1.jpg', `./output-${i}.txt`, contrasts[i]!);
    console.log(ascii);
  }
}
main();
