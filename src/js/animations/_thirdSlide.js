import EVENT from '../communication/_events';
import OBSERVER from '../communication/_observer';

import { ACTIVE } from '../constants';
import figureTo from './_figureTo';
import stagger from './_stagger';

const popup = $('.js-popup');
const popupOverlay = $('.js-popup-overlay');
const popupClose = $('.js-popup-close');
const popupCloseEl = $('.js-popup-close, .js-popup-overlay');
const popupBg = $('.js-popup-bg');
const popupTriangle = $('.js-popup-triangle');
const popupTriangleBlur = $('.js-popup-triangle-blur');
const staggerEl = $('[data-stagger="from-down"]');

export const THIRD_SLIDE = new TimelineMax({ paused: true })
  .call(() => { popup.addClass(ACTIVE); }, null, null, 0)
  .to(popupOverlay, 0.7, {
    opacity: 1,
    ease: Power2.easeInOut
  }, 0)
  .to(popupBg, 0.8, {
    scaleY: 1,
    ease: Power2.easeInOut
  }, 0.1)
  .to(popupClose, 0.2, {
    opacity: 1,
    ease: Power2.easeInOut
  }, 0.6)
  .to(popupTriangle, 1, {
    strokeDashoffset: 0,
    ease: Power0.easeNone
  }, 0.7)
  .to(popupTriangleBlur, 1, {
    strokeDashoffset: 0,
    ease: Power0.easeNone
  }, 0.4)
  .add(
    new TimelineMax()
      .staggerTo(staggerEl, 0.3, {
        y: 0,
        opacity: 1,
        ease: Power3.easeInOut
      }, 0.1)
    , 0.7)
  .eventCallback( 'onReverseComplete', () => {
    popup.removeClass(ACTIVE);
    OBSERVER.ON_FIRE(EVENT.POPUP_CLOSE);  
  });

popupCloseEl.on('click', () => {
  THIRD_SLIDE.reverse();
});
