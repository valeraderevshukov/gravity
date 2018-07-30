import stagger from './_stagger';
import { figureAnim } from './_figureAnim';

export default (() => {
  // stagger
  const staggerUpRight = $('[data-fp-slide="about"] [data-stagger="up-right"]');
  const staggerBottomRight = $('[data-fp-slide="about"] [data-stagger="bottom-right"]');

  // rectangles
  const rectangles = $('.js-rectangles');

  // clases
  const firstAnim = 'is-first-animate';
  const secondAnim = 'is-second-animate';

  // flag
  let rectanglesFlag = false;

  const secondSlide = new TimelineMax({ paused: true });
  const play = () => {
    secondSlide
      .add(stagger({ elements: staggerUpRight, duration: 1.3, ease: Power3.easeOut, delay: -0.3 }).play(), 0.7)
      .add(stagger({ elements: staggerBottomRight, duration: 1.3, ease: Power3.easeOut, delay: 0.4 }).play(), 0.7)
      .play();
    if (rectanglesFlag) return;
    rectangles
      .addClass(secondAnim);
    rectanglesFlag = true;
  };
  const reverse = () => {
    rectangles.removeClass(secondAnim);
    rectanglesFlag = false;
    figureAnim.reverse();
    secondSlide.reverse();
  };
  return { play, reverse };	
})();
