import { ANIMATE } from '../constants';
import { TimelineMax, CSSPlugin } from 'gsap';

const btnSubmit = $('.js-form-submit');
const btnAnim = new TimelineMax();

btnSubmit.on('click', function(e) {
  e.preventDefault();
  const that = $(this);
  that.addClass(ANIMATE);
});
