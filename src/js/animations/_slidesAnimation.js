// ********** COMMUNICATION ********** 
import EVENT from '../communication/_events';
import OBSERVER from '../communication/_observer';

// ********** COMPONENTS ********** 
import FP_SLIDER from '../components/_fpSlider';

// ********** SLIDES ANIMATION ********** 
import FIRST_SLIDE from './_firstSlide';
import SECOND_SLIDE from './_secondSlide';
import { THIRD_SLIDE } from './_thirdSlide';

import { ACTIVE } from '../constants';

// any const
const header = $('.js-header');
const footer = $('.js-footer');
const headerAnim = 'is-animate-header';
const footerAnim = 'is-animate-footer';
const trigger = $('.js-gravity-arrow');
const navItems = $('.js-nav-item');
// index currentSlide
window.currentSlide = 0;

// flag
window.contactsFlag = false;

// ********** ANIATION ARRAY ********** 
const ANIATION_ARRAY = [ '', FIRST_SLIDE, SECOND_SLIDE, THIRD_SLIDE ];

//  ********** INIT FP-SLIDER
const fpSliderDelay = 650;
let fpSlider = new FP_SLIDER({
  container: '.js-fp-slider',
  slide: '[data-fp-slide]',
  delay: fpSliderDelay
});
// disabled wheel
fpSlider.disableMousewheel = true;
// OBSERVER.SUB(EVENT.LOADER_COMPLATE, () => { fpSlider.disableMousewheel = false; });

trigger.on('click', () => {
  fpSlider.disableMousewheel = false;
  fpSlider.next();
  $(navItems[0]).addClass(ACTIVE);
});

// ********** EVENTS WHITS WHEELS **********

// events on wheels
OBSERVER.SUB(EVENT.FP_UP, i => {
  if (+i === 1) window.contactsFlag = false;
  if (+i === 0) return;
  ANIATION_ARRAY[+i + 1].reverse(); 
});

OBSERVER.SUB(EVENT.FP_DOWN, i => {
  if (+i === 1) ANIATION_ARRAY[+i].play();
  if (+i - 1 === 0) return;
  ANIATION_ARRAY[+i - 1].reverse(); 
});


// events after added state 
OBSERVER.SUB(EVENT.FP_UP_AFTER, i => {
  if (+i === 0) return;
  window.currentSlide = +i;
  ANIATION_ARRAY[+i].play(); 
});
OBSERVER.SUB(EVENT.FP_DOWN_AFTER, i => {
  window.currentSlide = +i;
  if (+i === ANIATION_ARRAY.length) return;
  if (+i >= 2) ANIATION_ARRAY[+i].play();
  // animate header/footer
  if (+i === 1) {
    header.addClass(headerAnim);
    footer.addClass(footerAnim);
  }
  if (+i === 2) window.contactsFlag = true;
});

OBSERVER.SUB(EVENT.FP_WHEEL, argument => {
  // if (window.contactsFlag && argument[1] === EVENT.FP_DOWN) {
  //   fpSlider.disableMousewheel = true;
  //   ANIATION_ARRAY[argument[0] + 1].play();
  // }
  navItems.removeClass(ACTIVE);
  $(navItems[argument[0] - 1]).addClass(ACTIVE);
});

OBSERVER.SUB(EVENT.POPUP_CLOSE, () => { fpSlider.disableMousewheel = false; } );

// ------------ NAVIGATION -------------
const link = $('.js-nav-link');
let clickFlag = true;
link.on('click', function(e) {
  e.preventDefault();
  
  if (!clickFlag) return;

  clickFlag = false;

  let that = $(this);
  let parent = that.parents('.js-nav-item');
  let index = parent.index();

  navItems.removeClass(ACTIVE);
  parent.addClass(ACTIVE);
  // tests
  let textForPopup = (index + 1 === navItems.length);
  let testForNext = (index + 1 > window.currentSlide && index < navItems.length && !textForPopup && index + 1 !== window.currentSlide);
  let testForPrev = (index < window.currentSlide);

  if (testForNext) fpSlider.next();
  if (testForPrev) fpSlider.prev();
  if (textForPopup) ANIATION_ARRAY[index + 1].play();
  
  setTimeout(() => { clickFlag = true;}, fpSliderDelay*2);
});
