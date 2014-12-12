var {
  linearExit,
  linearEnter,
  symmetrical } = require('ui/lib/animate/helpers');

var Animations = module.exports = {
  viewParallax(index, step, props) {
    var width = props.width;
    var translateX = (index - step) * width;
    if (index < step) translateX = translateX / 2;

    return {
      translate: { x: translateX },
      'box-shadow': `0 0 15px rgba(0,0,0,${linearEnter(step,index) / 2})`
    };
  },

  viewSideBySide(index, step, props) {
    var width = props.width;
    var translateX = (index - step) * width;

    return {
      translate: { x: translateX }
    };
  },

  fadeLeft(index, step, props) {
    return {
      translate: { x: - (step - index) * (props.width/2.5) },
      opacity: symmetrical(step, index)
    };
  },

  fadeDown(index, step) {
    return {
      opacity: symmetrical(step, index),
      height: symmetrical(step, index) * 100 + '%'
    };
  },

  moveToRight(index, step, props) {
    return {
      translate: { x: (step - index) * (props.width/2.5) }
    };
  },

  card(index, step) {
    return {
      translate: { y: step * index + symmetrical(step) * 10 }
    };
  },

  fade(index, step) {
    return {
      opacity: symmetrical(step, index)
    };
  },

  scaleDown(index, step) {
    return {
      scale: linearExit(step, index) * 1.9
    };
  },

  rotate(index, step) {
    return {
      rotate: step * 360
    };
  }
};