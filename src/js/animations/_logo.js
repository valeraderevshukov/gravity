import { TimelineMax, CSSPlugin } from 'gsap';
import dashoffsetAnim from './_dashoffsetAnim';

const container = $('.js-logo');
const svg = $('.js-logo svg');

export const svgAnim = new TimelineMax({ paused: true })
  .to(svg, 4, {
    strokeDashoffset: 0,
    ease: Expo.easeIn
  }, 0);

export const logoAnim = new TimelineMax({ paused: true })
  .to(container, 8, {
    transform: 'translate3d(0,-20vh,0)',
    ease: Expo.easeOut
  }, 0)
  .add(svgAnim.play(), 0);
