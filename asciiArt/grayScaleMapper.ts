function calculateBrightness(r: number, g: number, b: number) {
  return Math.round(0.299 * r + 0.587 * g + 0.114 * b);
}
function pixelBufferToBrightness(buffer: Uint8Array, channels: number) {
  const result = [];
  for (let i = 0; i < buffer.length; i += channels) {
    if (channels === 3) {
      const r = buffer[i]!;
      const g = buffer[i + 1]!;
      const b = buffer[i + 2]!;
      const brightness = calculateBrightness(r, g, b);
      result.push(brightness);
    } else if (channels === 4) {
      // see a issue will be resolved later
      const r = buffer[i]!;
      const g = buffer[i + 1]!;
      const b = buffer[i + 2]!;
      const a = buffer[i + 3]!;
      const brightness = calculateBrightness(r, g, b);
      result.push(brightness);
    }
  }
  return result;
}
