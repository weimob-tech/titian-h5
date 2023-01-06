enum ETagVariant {
  /** 实心 */
  CONTAINED = 'contained',

  /** 填充 */
  FILLED = 'filled',

  /** 描边 */
  OUTLINED = 'outlined',
}

enum ETagSize {
  /** 小 */
  SMALL = 'small',

  /** 中 */
  MEDIUM = 'medium',

  /** 大 */
  BIG = 'big',
}

enum ETagShape {
  Normal = 'normal',

  /** 树叶形 */
  Leaf = 'leaf',

  /** 优惠券形状 */
  Coupon = 'coupon',
}

export { ETagVariant, ETagSize, ETagShape };
