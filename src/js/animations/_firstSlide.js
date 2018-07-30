import figureTo from './_figureTo';
import dashoffsetAnim from './_dashoffsetAnim';
import stagger from './_stagger';

import { svgAnim } from './_logo';

import { figureAnim } from './_figureAnim';

export default (() => {
  const path = $('.figure svg g');
  const svg = $('.js-logo svg');
  const figureLeftVector = $('.js-figure-left-vector');
  const figureLeftBlur = $('.js-figure-left-blur');
  const figureCenterZ = $('.js-figure-center-z');
  const figureRightVector = $('.js-figure-right-vector');
  const figureRightBlur = $('.js-figure-right-blur');
  const arrow = $('.js-gravity-arrow');
  const rectangles = $('.js-rectangles');

  // stagger
  const staggerUp = $('[data-fp-slide="cases"] [data-stagger="up-left"]');
  const staggerLeft = $('[data-fp-slide="cases"] [data-stagger="left"]');
  const staggerBottom = $('[data-fp-slide="cases"] [data-stagger="bottom"]');

  // clases
  const firstAnim = 'is-first-animate';
  const secondAnim = 'is-second-animate';

  // flag
  let rectanglesFlag = false;
  let figureFirstFlag = true;

  const firstSlide = new TimelineMax({ paused: true });
  const play = () => {
    firstSlide
      .add(stagger({ elements: [staggerUp, staggerLeft], duration: 1.5, ease: Power3.easeInOut, delay: -0.3 }).play(), 1.2)
      .add(stagger({ elements: staggerBottom, duration: 1.5, ease: Power3.easeInOut }).play(), 1.1)
      .call(() => {
        if (!figureFirstFlag) return;
        new TimelineMax()
          .to(arrow, 0.1, {
            alpha: 0,
            ease: Power0.easeNone
          }, 0)
          .to(svg, 1.5, {
            strokeDashoffset: 2000,
            ease: Expo.easeOut
          }, 0)
          .add(figureTo({ container: figureLeftVector, x: '300px', y: '350px', duration: 1.6, ease: Power2.easeInOut }).play(), 0)
          .add(figureTo({ container: figureLeftBlur, x: '330px', y: '-100px', duration: 1.6, ease: Power2.easeInOut }).play(), 0)
          .add(figureTo({ container: figureCenterZ, x: '80px', y: '-50px', duration: 1.6, ease: Power2.easeInOut }).play(), 0)
          .add(figureTo({ container: figureRightVector, x: '330px', y: '-180px', duration: 1.6, ease: Power2.easeInOut }).play(), 0)
          .add(figureTo({ container: figureRightBlur, x: '100px', y: '150px', duration: 1.6, ease: Power2.easeInOut }).play(), 0)
          .add(figureTo({ container: path, x: '310px', y: '-230px', duration: 1.6, ease: Power2.easeInOut, delay: 0.05}).play(), 0.5);
        figureFirstFlag = false;
      }, null, null, 0)
    	.play();
    if (rectanglesFlag) return;
    rectangles.addClass(firstAnim);
    
  };
  const reverse = () => {
    rectangles.addClass(secondAnim);
    figureAnim.play();
    firstSlide.reverse();
  };
  return { play, reverse };	
})();
