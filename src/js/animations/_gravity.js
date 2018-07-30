import { TimelineMax, CSSPlugin } from 'gsap';
import { logoAnim } from './_logo';
import figureFromTo from './_figureFromTo';
import OBSERVER from '../communication/_observer';
import EVENT from '../communication/_events';



const path = $('.figure svg g');

const figureLeftVector = $('.js-figure-left-vector');
const figureLeftBlur = $('.js-figure-left-blur');
const figureCenterZ = $('.js-figure-center-z');
const figureRightVector = $('.js-figure-right-vector');
const figureRightBlur = $('.js-figure-right-blur');

const arrow = $('.js-gravity-arrow');
const arrowAnim = new TimelineMax({ paused: true})
  .to(arrow, 1, { 
    alpha: 1, 
    y: 0, 
    ease: Power3.easeOut 
  }, 0)
  .eventCallback('onComplete', () => OBSERVER.ON_FIRE(EVENT.LOADER_COMPLATE), null);;

const gravityBg = $('.js-gravity-bg');
const bgAnim = new TimelineMax({ paused: true})
  .to(gravityBg, 6, {
    alpha: 1,
    ease: Power2.easeOut
  }, 0);

const lines = $('.lines path');
const linesAnim = new TimelineMax({ paused: true})
  .staggerTo(lines, 4, {
    strokeDashoffset: 0,
    ease: Power3.easeinOut
  }, 1, 'lines');

const FullAnim = new TimelineMax({ paused: true, force3D: true })
  .add(bgAnim.play(), 0)
  .add(linesAnim.play(), 0.3)
  .add(logoAnim.play(), 1)
  .add(figureFromTo({ container: figureLeftVector, fromY: '20vh', toY: 0, duration: 3, delay: 0.2 }).play(), 0)
  .add(figureFromTo({ container: figureLeftBlur, fromY: '40vh', toY: 0, ease: Power1.easeInOut, duration: 2.5, delay: 0.2 }).play(), 0.9)
  .add(figureFromTo({ container: figureCenterZ, fromY: '110vh', toY: 0, duration: 2, delay: 0.2 }).play(), 1)
  .add(figureFromTo({ container: figureRightVector, fromY: '60vh', toY: 0, duration: 3, delay: 0.2 }).play(), 0.8)
  .add(figureFromTo({ container: figureRightBlur, fromY: '40vh', toY: 0, duration: 4, delay: 0.2 }).play(), 2)
  .add(figureFromTo({ 
  		container: path, fromY: '80vh', toY: 0, duration: 2, delay: 0.2,
  		onComplete: () => { arrowAnim.play(); }
  }).play(), 1.5);

OBSERVER.SUB(EVENT.DOC_READY, () => FullAnim.play());
