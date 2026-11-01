export const convertHexColorToRGB = (color: string) => {
  const red = parseInt(color.substring(1, 3), 16);
  const green = parseInt(color.substring(3, 5), 16);
  const blue = parseInt(color.substring(5, 7), 16);
  const rgb = 'rgb(' + red + ',' + green + ',' + blue + ',' + '.05)';
  return rgb;
};
