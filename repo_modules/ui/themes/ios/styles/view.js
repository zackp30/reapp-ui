module.exports = (c) => ({
  self: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    pointerEvents: 'all',
    WebkitOverflowScrolling: 'touch'
  },

  inner: {
    background: c.bgLight,
    top: c.toolbarHeight,
    padding: `0 ${c.viewPad}`,
    zIndex: 1,
    position: 'absolute',
    overflowY: 'scroll',
    overflowX: 'hidden',
    left: 0,
    bottom: 0,
    right: 0,
  }
});