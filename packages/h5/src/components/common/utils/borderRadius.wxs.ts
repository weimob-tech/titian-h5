function computedStyle(shape) {
  const style = {};
  if (shape === 'capsule' || shape === 'circle') {
    style['--base-radius-size'] = '999px';
  } else if (shape === 'rect' || shape === 'square') {
    style['--base-radius-size'] = '-999px';
  }
  return style;
}

export default {
  handler: computedStyle,
};
