import slick from 'slick-carousel';
import { widthSM } from './../constants';
import { BUILD_ICON } from './../utils';

const slider = $('.js-slider');
let prev = BUILD_ICON('arrow-left');
let next = BUILD_ICON('arrow-right');
const options = {
  dots: false,
  arrows: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  // speed: 0,
  // variableWidth: true,
  prevArrow: `<button type="button" class="slider__prev">${prev}</button>`,
  nextArrow: `<button type="button" class="slider__next">${next}</button>`,
  responsive: [{
    breakpoint: widthSM,
    settings: 'unslick'
  }]
};
slider.slick(options);

