enum EPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
  // ABSOLUTE = 'absolute'
}

const ETransitionClass: {
  [key in EPosition]: string;
} = {
  [EPosition.TOP]: 'slide-down',
  [EPosition.BOTTOM]: 'slide-up',
  [EPosition.LEFT]: 'slide-left',
  [EPosition.RIGHT]: 'slide-right',
  [EPosition.CENTER]: 'fade',
  // [EPosition.ABSOLUTE]: 'slide-up'
};

export { EPosition, ETransitionClass };
