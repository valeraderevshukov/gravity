// ********** COMMUNICATION ********** 
import EVENT from '../communication/_events';
import OBSERVER from '../communication/_observer';

// ********** COMPONENTS ********** 
import FP_SLIDER from '../components/_fpSlider';

// ********** SLIDES ANIMATION ********** 
import FIRST_SLIDE from './_firstSlide';
import SECOND_SLIDE from './_secondSlide';
import { THIRD_SLIDE } from './_thirdSlide';

// any const
const header = $('.js-header');
const footer = $('.js-footer');
const headerAnim = 'is-animate-header';
const footerAnim = 'is-animate-footer';

// flag
window.contactsFlag = false;

// ********** ANIATION ARRAY ********** 
const ANIATION_ARRAY = [ '', FIRST_SLIDE, SECOND_SLIDE, THIRD_SLIDE ];

//  ********** INIT FP-SLIDER
let fpSlider = new FP_SLIDER({
  container: '.js-fp-slider',
  slide: '[data-fp-slide]',
  delay: 1300
});
// disabled wheel
fpSlider.disableMousewheel = true;
OBSERVER.SUB(EVENT.LOADER_COMPLATE, () => { fpSlider.disableMousewheel = false; });

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
  ANIATION_ARRAY[+i].play(); 
});
OBSERVER.SUB(EVENT.FP_DOWN_AFTER, i => {
  window.animatinIndex = +i;
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
  if (window.contactsFlag && argument[1] === EVENT.FP_DOWN) {
    fpSlider.disableMousewheel = true;
    ANIATION_ARRAY[argument[0] + 1].play();
  }
});

OBSERVER.SUB(EVENT.POPUP_CLOSE, () => { fpSlider.disableMousewheel = false; } );

let clickFlag = true;
$('.nav a').on('click', function(e) {
  e.preventDefault();
  let index = $(this).parent().index() + 1;
  let page = $(this).attr('href');
  // fpSlider.next();
  if (!clickFlag || index === window.animatinIndex) return;
  if (index <= ANIATION_ARRAY.length - 2 ) {
    // clickFlag = false;
    // ANIATION_ARRAY[window.animatinIndex].reverse();
    // setTimeout(() => {
    //   $('[data-fp-slide]').removeClass('is-active');
    //   $(`[data-fp-slide="${page}"]`).addClass('is-active');
    //   ANIATION_ARRAY[index].play();
    //   window.animatinIndex = index;
    // }, 1300);
    // setTimeout(() => { clickFlag = true; }, 3500);
  }
  else {
    // if (window.animatinIndex === ANIATION_ARRAY.length - 1) return;
    // clickFlag = false;
    // ANIATION_ARRAY[window.animatinIndex].reverse();
    // setTimeout(() => {
    //   $('[data-fp-slide]').removeClass('is-active');
    //   $($('[data-fp-slide]')[$('[data-fp-slide]').length - 1]).addClass('is-active');
    //   ANIATION_ARRAY[index - 1].play();
    //   window.animatinIndex = index;
    // }, 1300);
    // setTimeout(() => {
    //   ANIATION_ARRAY[index].play();
    // }, 2600);
    // setTimeout(() => { clickFlag = true; }, 3500);
  }
 
});
