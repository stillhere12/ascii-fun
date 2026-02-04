function calculateBrightness(r: number, g: number, b: number) {
  return Math.round(0.299 * r + 0.587 * g + 0.114 * b);
}
export function pixelBufferToBrightness(buffer: Uint8Array, channels: number) {
  const result = [];
  for (let i = 0; i < buffer.length; i += channels) {
    if (channels === 3) {
      const r = buffer[i]!;
      const g = buffer[i + 1]!;
      const b = buffer[i + 2]!;
      const colorBlock = calculateBrightness(r, g, b);
      result.push(colorBlock);
    } else if (channels === 4) {
      const r = buffer[i]!;
      const g = buffer[i + 1]!;
      const b = buffer[i + 2]!;
      const a = buffer[i + 3]! / 255;
      const rA = r * a + 255 * (1 - a);
      const gA = g * a + 255 * (1 - a);
      const bA = b * a + 255 * (1 - a);
      const colorBlock = calculateBrightness(rA, gA, bA);
      result.push(colorBlock);
    }
  }
  return result;
}
