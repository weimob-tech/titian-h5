import addUnit from '../common/utils/suffix';

export function handleBall(size?: number) {
  if (!size) {
    return '';
  }
  const diameter = addUnit((size / 10) * 7);
  return `width:${diameter};height:${diameter};border-radius:${diameter};`;
}

export function handleBox(size: number, color: string, activeColor: string) {
  const width = addUnit((size / 4) * 7);
  const diameter = (size / 10) * 7;
  const padding = addUnit((size - diameter) / 2);
  const br = addUnit(size);
  let style = `width:${width};height:${br};padding:0 ${padding};border-radius:${br};`;
  if (color) {
    style += `--switch-bg-color: ${color};`;
  }
  if (activeColor) {
    style += `--switch-active-bg-color: ${activeColor};`;
  }
  return style;
}
