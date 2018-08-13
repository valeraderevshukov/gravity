import figureTo from './_figureTo';
const path = $('.figure svg g');
const figureLeftVector = $('.js-figure-left-vector');
const figureLeftBlur = $('.js-figure-left-blur');
const figureCenterZ = $('.js-figure-center-z');
const figureRightVector = $('.js-figure-right-vector');
const figureRightBlur = $('.js-figure-right-blur');
const rectangles = $('.js-rectangles');

export const figureAnim = new TimelineMax({ paused: true, delay: 0.5 })
  .add(figureTo({ container: figureLeftBlur, x: '-15px', y: '0px', duration: 1, ease: Power2.easeInOut }).play(), 0)
  .add(figureTo({ container: figureCenterZ, x: '-180px', y: '-20px', duration: 1, ease: Power2.easeInOut }).play(), 0)
  .add(figureTo({ container: figureRightVector, x: '-283px', y: '80px', duration: 1, ease: Power2.easeInOut }).play(), 0)
  .add(figureTo({ container: path, x: '-195px', y: '-90px', duration: 1.1, ease: Power2.easeInOut, delay: 0.05}).play(), 0);
