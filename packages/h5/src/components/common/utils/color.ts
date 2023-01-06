/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-regex-literals */
/* eslint-disable no-bitwise */
const HSBToRGB = (h: number, s: number, b: number): [number, number, number] => {
  s /= 100;
  b /= 100;
  const k = (n: number) => (n + h / 60) % 6;
  const f = (n: number) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  const R = Math.round(255 * f(5));
  const G = Math.round(255 * f(3));
  const B = Math.round(255 * f(1));
  return [R, G, B];
};

const RGBToHSB = (r: number, g: number, b: number): [number, number, number] => {
  r /= 255;
  g /= 255;
  b /= 255;
  const v = Math.max(r, g, b);
  const n = v - Math.min(r, g, b);
  const h = n === 0 ? 0 : n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n;
  return [60 * (h < 0 ? h + 6 : h), v && (n / v) * 100, v * 100];
};

const hexToRGB = (hex: string, a?: number | string): string => {
  let alpha = false;
  let h: string | number = hex.slice(hex.startsWith('#') ? 1 : 0);
  if (h.length === 3) {
    h = [...h].map(x => x + x).join('');
  } else if (h.length === 8) {
    alpha = true;
  } else if (h.length === 6) {
    // TODO
  } else {
    return hex;
  }
  h = parseInt(h, 16);
  const isAlpha = alpha || a;
  a = a || `${h & 0x000000ff}`;
  return `rgb${isAlpha ? 'a' : ''}(${h >>> (alpha ? 24 : 16)}, ${
    (h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)
  }, ${(h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)}${isAlpha ? `, ${a}` : ''})`;
};

const RGBToHex = (r: number, g: number, b: number) => `#${((r << 16) + (g << 8) + b).toString(16).padStart(6, '0')}`;

const RGBAToHex = (rgb: string) => {
  const reg = new RegExp('^rgba?\\((.+)\\)$', 'g');

  if (!reg.test(rgb)) {
    return rgb;
  }

  const a = rgb.replace(reg, (_s, $1) => $1);
  const [r, g, b] = a.split(',').map(x => parseInt(x, 10));
  return RGBToHex(r, g, b);
};

const hexToHSB = (hex: string): [number, number, number] => {
  let alpha = false;
  let h: string | number = hex.slice(hex.startsWith('#') ? 1 : 0);
  if (h.length === 3) {
    h = [...h].map(x => x + x).join('');
  } else if (h.length === 8) {
    alpha = true;
  }
  h = parseInt(h, 16);
  const r = h >>> (alpha ? 24 : 16);
  const g = (h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8);
  const b = (h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0);
  return RGBToHSB(r, g, b);
};

const RGBToRGBA = (rgb: string, alpha = 1) => {
  const reg = new RegExp('^rgba?\\((.+)\\)$', 'g');

  if (!reg.test(rgb)) {
    return rgb;
  }

  const a = rgb.replace(reg, (_s, $1) => $1);
  const [r, g, b] = a.split(',').map(x => parseInt(x, 10));
  return `rgba(${r},${g},${b},${alpha})`;
};

const hexToRGBA = (hex: string, alpha = 1) => {
  const rgb = hexToRGB(hex);
  return RGBToRGBA(rgb, alpha);
};

const getNeutralsGrey = (precent = 85, diffs?: number[]) => {
  const group = ['#f2f2f2', '#f5f5f5', '#fafafa', '#ffffff'];
  let b = 0;
  const x = (3 * precent) / 17;

  function pipe(m: number, n: number) {
    b += m;
    const rgb = HSBToRGB(0, 0, b + n > 0 ? b + n : 0);
    return RGBToHex(...rgb);
  }

  const [d1 = 0, d2 = 0, d3 = 0, d4 = 0, d5 = 0] = diffs || [];
  const steps: [number, number][] = [
    [100 - precent, d1],
    [2 * x, d2],
    [x, d3],
    [x, d4],
    [x, d5],
  ];
  return steps.map(arr => pipe(...arr)).concat(group);
};
// console.log(getNeutralsGrey(85, [-2, 1, 2, 2, -2]));
// console.log(getNeutralsGrey(70));
// console.log(getNeutralsGrey(100));
export { HSBToRGB, RGBToHSB, hexToRGB, RGBToHex, hexToHSB, getNeutralsGrey, RGBAToHex, RGBToRGBA, hexToRGBA };
