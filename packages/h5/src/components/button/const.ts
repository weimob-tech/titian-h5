enum EButtonVariant {
  /** 实心 */
  CONTAINED = 'contained',

  /** 填充 */
  FILLED = 'filled',

  /** 描边 */
  OUTLINED = 'outlined',

  /** 文字 */
  TEXT = 'text',
}

enum EButtonSize {
  TINY = 'tiny',
  SMALL = 'small',
  MEDIUM = 'medium',
  BIG = 'big',
  LARGE = 'large',
}

enum EButtonShape {
  /** 圆角胶囊 */
  CAPSULE = 'capsule',

  /** 圆角 */
  ROUND = 'round',

  /** 矩形 */
  RECT = 'rect',
}

enum EButtonType {
  /** 默认主题 */
  PRIMARY = 'primary',

  /** 警告 */
  WARNING = 'warning',

  /** 错误 */
  ERROR = 'error',

  /** 成功 */
  SUCCESS = 'success',

  /** 信息 */
  INFO = 'info',

  /** outlined 模式下可用，灰色调 */
  SIMPLE = 'simple',
}

export { EButtonVariant, EButtonSize, EButtonShape, EButtonType };
