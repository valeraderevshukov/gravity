import { SCROLL_TO } from './utils';
import { DOC, WIN } from './constants';
// components
import './components/_lang';

DOC.ready(() => {
  const btnUp = $('.js-scroll-to');
  btnUp.on('click', function() {
	  let that = $(this);
	  let id = that.attr('href');
	  let elPos = $(id).offset().top;
	  SCROLL_TO(elPos);
	  return false;
  });
});

