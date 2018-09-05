import { TimelineMax, CSSPlugin } from 'gsap';
import { logoAnim } from './_logo';
import figureFromTo from './_figureFromTo';
import OBSERVER from '../communication/_observer';
import EVENT from '../communication/_events';
import { ANIMATE } from '../constants';


const path = $('.figure svg g');

const figureLeftVector = $('.js-figure-left-vector');
const figureLeftBlur = $('.js-figure-left-blur');
const figureCenterZ = $('.js-figure-center-z');
const figureRightVector = $('.js-figure-right-vector');
const figureRightBlur = $('.js-figure-right-blur');

const arrow = $('.js-gravity-arrow');
const toggleDuration = 0.6;
const arrowAnim = new TimelineMax({ paused: true})
  .call(() => { arrow.addClass(ANIMATE); }, null, null, 0)
  // .addLabel('start')
  // .addLabel('secondStart', toggleDuration)
  // .to(arrow, toggleDuration, {
  //   x: -20,
  //   ease: Back.easeIn.config(1.7)
  // }, 'start')
  // .to('.gravity__arrow', toggleDuration, {
  //   y: -115,
  //   scale: 0.5,
  //   ease: Back.easeOut.config(1.7)
  // }, 'start')
  // .to(arrow, toggleDuration + 1, {
  //   x: 0,
  //   ease: Power1.easeIn
  // }, 'secondStart')
  // .to('.gravity__arrow', toggleDuration + 1, {
  //   y: 0,
  //   scale: 1,
  //   ease: Power1.easeOut
  // }, 'secondStart')
  // .to('body', toggleDuration + 1, {
  //   blur: 10,
  //   ease: Power1.easeOut
  // }, 'secondStart')
  .eventCallback('onComplete', () => OBSERVER.ON_FIRE(EVENT.LOADER_COMPLATE), null);;

const gravityBg = $('.js-gravity-bg');
const bgAnim = new TimelineMax({ paused: true})
  .to(gravityBg, 3, {
    alpha: 1,
    ease: Power2.easeOut
  }, 0);

const lines = $('.lines path');
const linesAnim = new TimelineMax({ paused: true})
  .staggerTo(lines, 2, {
    strokeDashoffset: 0,
    ease: Power3.easeinOut
  }, 0.5, 'lines')
  .eventCallback('onComplete', () => {$('.js-lines-blur').addClass(ANIMATE);});

const FullAnim = new TimelineMax({ paused: true, force3D: true })
  .add(bgAnim.play(), 0)
  .add(linesAnim.play(), 0.3)
  .add(logoAnim.play(), 1)
  .add(figureFromTo({ container: figureLeftVector, fromY: '20vh', toY: 0, duration: 1.5, delay: 0.2 }).play(), 0)
  .add(figureFromTo({ container: figureLeftBlur, fromY: '40vh', toY: 0, ease: Power1.easeInOut, duration: 1.25, delay: 0.1 }).play(), 0.4)
  .add(figureFromTo({ container: figureCenterZ, fromY: '110vh', toY: 0, duration: 1, delay: 0.2 }).play(), 0.5)
  .add(figureFromTo({ container: figureRightVector, fromY: '60vh', toY: 0, duration: 1.5, delay: 0.2 }).play(), 0.4)
  .add(figureFromTo({ container: figureRightBlur, fromY: '40vh', toY: 0, duration: 2, delay: 0.2 }).play(), 1)
  .add(figureFromTo({ 
  		container: path, fromY: '80vh', toY: 0, duration: 1, delay: 0.1,
  		onComplete: () => { arrowAnim.play(); }
  }).play(), 0.75);

OBSERVER.SUB(EVENT.DOC_READY, () => FullAnim.play());
