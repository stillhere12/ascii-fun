function brightnessToCharacter(brightness: number[], width: number, height: number, level: number) {
  let completePalette: string[] = [
    '@#:. ', // level 0 - simple
    '@%#*+=-:. ', // level 1 - medium
    '$@B%8&WM#*oahkbdpqwm. ', // level 2 - detailed
  ];

  //   ASCII characters have different visual "density" or "weight":
  //   - @ # M W are dark/heavy (cover more space)
  //   - . : - ' are light (cover less space)
  //   -   (space) is empty

  //   The trick is mapping brightness to characters where:
  //   - Dark pixels (low brightness 0-50) → dense characters like @, #, W
  //   - Bright pixels (high brightness 200-255) → light characters like ., -,
  let result: string[][] = [];
  for (let i = 0; i < height; i++) {
    let inner: string[] = [];
    for (let j = 0; j < width; j++) {
      let palette = completePalette[level];
      let positioninOnedArray = i * width + j;
      let index = Math.floor((brightness[positioninOnedArray]! / 255) * (palette!.length - 1));
      inner.push(palette![index]!);
    }
    result.push(inner);
  }
  return result;
}
