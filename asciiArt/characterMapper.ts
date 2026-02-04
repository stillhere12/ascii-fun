export function brightnessToCharacter(
  brightness: number[],
  pixelArray: Uint8Array,
  channels: number,
  width: number,
  height: number,
  contrast: number
) {
  // Master density ramp: densest → sparsest → spaces (same as well-known Python ramp)
  const DENSITY =
    '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,"^`\'.            ';
  // Trim based on contrast (-10 to 10), mirrors Python: density[:-11+contrast]
  const palette = DENSITY.slice(0, DENSITY.length + contrast - 11);
  const n = palette.length;
  let result: string[][] = [];
  for (let i = 0; i < height; i++) {
    let inner: string[] = [];
    for (let j = 0; j < width; j++) {
      const pixelIndex = i * width + j;
      let k = Math.floor((brightness[pixelIndex]! / 256) * n);
      const char = palette[n - 1 - k]!;
      // ANSI 24-bit foreground color: \x1b[38;2;R;G;Bm
      const bufIdx = pixelIndex * channels;
      const r = pixelArray[bufIdx]!;
      const g = pixelArray[bufIdx + 1]!;
      const b = pixelArray[bufIdx + 2]!;
      inner.push(`\x1b[38;2;${r};${g};${b}m${char}`);
    }
    result.push(inner);
  }
  return result;
}
