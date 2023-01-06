/**
 * 将一个数值限制在一个范围内，约束参数必须大于等于 min，小于等于 max
 * @param {number} value 要限制的值
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns {number} 限制后的值
 * @example
 * clamp(0.5, 0, 1) // 0.5
 * clamp(1.5, 0, 1) // 1
 * clamp(0, 0, 1) // 0
 */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * 将值转换为百分比
 * @param value 值
 * @param min 最小值
 * @param max 最大值
 * @returns {number} 百分比
 * @example
 * toPercentage(0.5, 0, 1) // 50
 * toPercentage(1.5, 0, 1) // 100
 * toPercentage(0, 0, 1) // 0
 * toPercentage(1, 0, 1) // 100
 */
export function valueToPercent(value: number, min: number, max: number) {
  return Math.round(((value - min) / (max - min)) * 10000) / 100;
}

/**
 * 将百分比转换为值
 * @param percent 百分比
 * @param min 最小值
 * @param max 最大值
 * @returns 值
 * @example
 * percentToValue(50, 0, 1) // 0.5
 * percentToValue(100, 0, 1) // 1
 * percentToValue(0, 0, 1) // 0
 */
export function percentToValue(percent: number, min: number, max: number) {
  return Math.round(percent * (max - min) + min * 100) / 100;
}
/**
 * 将一个数值按照指定的步长，“四舍五入”
 * @param value 要处理的数值
 * @param step 步长
 * @returns {number} 四舍五入后的数值
 */
export function roundByStep(value: number, step: number) {
  return Math.round(value / step) * step;
}
