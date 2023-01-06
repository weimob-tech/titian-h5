export default (() => {
  let zIndex = 10000;
  return {
    getZIndex() {
      zIndex += 1;
      return zIndex;
    },
  };
})();
