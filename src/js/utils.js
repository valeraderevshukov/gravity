import { HTMLBODY } from './constants';

export const {
  GET_RANDOM,
  TOUCH,
  SCROLL_TO,
  INIT_SLIDER,
  IS_FUNC,
  BUILD_ICON
} = {
  GET_RANDOM(min, max) {
    return Math.random() * (max - min) + min;
  },
  TOUCH() {
    return 'ontouchstart' in window;
  },
  SCROLL_TO(position) {
    HTMLBODY.animate({
      scrollTop: position
    }, 700);
  },
  INIT_SLIDER( slider ) {
  	return slider.on('init', () => {
  		setTimeout(() => {
  			slider.addClass('is-loaded');
  		}, 200);
  	});
  },
  IS_FUNC(func) {
    return (typeof func != 'function') ? false : true;
  },
  BUILD_ICON(name) {
    return `<svg class="icon icon-${name}"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-${name}"></use></svg>`;
  }
};
