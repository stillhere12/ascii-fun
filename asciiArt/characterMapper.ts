export function brightnessToCharacter(
  brightness: number[],
  width: number,
  height: number,
  contrast: number
) {
  // Master density ramp: densest → sparsest → spaces (same as well-known Python ramp)
  const DENSITY =
    '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,"^`\'.            ';
  // Trim based on contrast (-10 to 10), mirrors Python: density[:-11+contrast]
  const palette = DENSITY.slice(0, DENSITY.length + contrast - 11);
  // splice original array is affected in slice orginal array remains as it is and returns new array
  const n = palette.length;
  let result: string[][] = [];
  for (let i = 0; i < height; i++) {
    let inner: string[] = [];
    for (let j = 0; j < width; j++) {
      let k = Math.floor((brightness[i * width + j]! / 256) * n);
      inner.push(palette[n - 1 - k]!);
    }
    result.push(inner);
  }
  return result;
}
