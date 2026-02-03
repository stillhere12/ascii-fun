const sharp = require('sharp');
function grayScaleConverter(r: number, g: number, b: number) {
  return Math.round(0.299 * r + 0.587 * g + 0.114 * b);
}
export { grayScaleConverter };
