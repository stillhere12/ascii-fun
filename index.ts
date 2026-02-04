import { buildAsciiArt } from './asciiArt/asciiBuilder';
async function main() {
  for (let i = 0; i < 3; i++) {
    console.log(`LEVEl ${i}`);
    await buildAsciiArt('./asciiArt/ben.jpg', i, `./output-${i}.txt`);
    console.log('\n');
  }
}
main();
