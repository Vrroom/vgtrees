/**
 * @file Color palette for different components.
 *
 * @author Sumit Chaturvedi
 */

function rgb2string(rgb, a) {
  const [r, g, b] = rgb;
  return `rgb(${r}, ${g}, ${b}, ${a})`;
}

const selectColor = [187, 225, 250];

const nodeColors = {
  mergeAllowed: [155, 222, 172],
  mergeNotAllowed: [231, 48, 91],
  suggestedGroup: [255, 248, 205],
  group: [243, 249, 251],
  contractedGroup: [214, 224, 240],
  hover: [144, 136, 212]
};

export { selectColor, nodeColors, rgb2string };
