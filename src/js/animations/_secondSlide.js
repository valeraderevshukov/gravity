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
      .add(stagger({ elements: staggerUpRight, duration: 0.65, ease: Power0.easeNone, delay: -0.15 }).play(), 0.35)
      .add(stagger({ elements: staggerBottomRight, duration: 0.65, ease: Power0.easeNone, delay: 0.2 }).play(), 0.35)
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
