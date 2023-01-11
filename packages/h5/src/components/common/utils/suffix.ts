import { getResponsivePixel } from './index';

const REGEXP = /^-?[0-9]+(.[0-9]+)?$/;

export default function addUnit(value: string | number): string {
  if (REGEXP.test(`${value}`)) {
    return `${getResponsivePixel(Number(value))}px`;
  }
  return value as string;
}
