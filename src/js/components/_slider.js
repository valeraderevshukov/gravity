import slick from 'slick-carousel';
import { ACTIVE } from './../constants';
import { BUILD_ICON } from './../utils';


const smallSlider = $('.js-small-slider');
const sliderText = $('.js-slider-text');
const slider = $('.js-slider');
const slidersWrap = $('.js-slider-wrap');

let direction = '';

const PREV = 'is-prev';
const NEXT = 'is-next';

const ANIMATE_NEXT = 'is-animate-next';
const ANIMATE_PREV = 'is-animate-prev';

const POINTERNONE = 'is-pointer-none';

// START SLIDER TEXT
const sliderTextOptions = {
  dots: false,
  arrows: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipe: false,
  cssEase: 'cubic-bezier(.47,.01,.18,.99)',
  speed: 900,
};
sliderText.slick(sliderTextOptions);
// END SLIDER TEXT

// START SLIDER RIGHT
let slide = null;
let slideActive = null;

let prevIcon = BUILD_ICON('arrow-left');
let nextIcon = BUILD_ICON('arrow-right');

const options = {
  dots: false,
  arrows: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipe: false,
  speed: 0,
  prevArrow: `<button type="button" class="slider__prev js-slider-prev">${prevIcon}</button>`,
  nextArrow: `<button type="button" class="slider__next js-slider-next">${nextIcon}</button>`,
};

slider
  .on('init', () => { 
    const btnPrev = $('.js-slider-prev');
    const btnNext = $('.js-slider-next');
    btnPrev.on('click', () => {
      slidersWrap.addClass(ANIMATE_PREV);
      direction = NEXT;

      sliderText.slick('slickPrev');
      smallSlider.slick('slickPrev');
    });
    btnNext.on('click', () => {
      slidersWrap.addClass(ANIMATE_NEXT);
      direction = PREV;

      sliderText.slick('slickNext');
      smallSlider.slick('slickNext');
    });
  })
  .slick(options)
  .on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    slide = $('.js-slider .slick-slide');
    slideActive = $('.js-slider .slick-active');
    
    slide.addClass(ACTIVE);
    slidersWrap.addClass(POINTERNONE);

    setTimeout(() => { 
      if (direction === PREV) {
        slideActive
          .removeClass(ACTIVE)
          .addClass(PREV);
      }
      else {
        slideActive
          .next()
          .removeClass(ACTIVE)
          .addClass(NEXT);
      }
      slide.removeClass(ACTIVE);
    }, 50 );
    
    setTimeout(() => { 
      slide.removeClass(PREV);
      slide.removeClass(NEXT);
      slidersWrap.removeClass(POINTERNONE);
      slidersWrap.removeClass(ANIMATE_NEXT);
      slidersWrap.removeClass(ANIMATE_PREV);
    }, 900 );

  })
  .on('afterChange', function(event, slick, currentSlide, nextSlide) {
    slideActive = $('.js-slider .slick-active');
    slideActive.addClass(ACTIVE);
  });
// END SLIDER RIGHT


// START SMALL SLIDER
let smSlide = null;
let smSlideActive = null;
const smallSliderOptions = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipe: false,
  dots: false,
  arrows: false,
  speed: 0
};
smallSlider
  .slick(smallSliderOptions)
  .on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    smSlide = $('.js-small-slider .slick-slide');
    smSlideActive = $('.js-small-slider .slick-active');
    
    smSlide.addClass(ACTIVE);

    setTimeout(() => { 
      if (direction === PREV) {
        smSlideActive
          .prev()
          .removeClass(ACTIVE)
          .addClass(PREV);
      }
      else {
        smSlideActive
          .next()
          .removeClass(ACTIVE)
          .addClass(NEXT);
      }
      smSlide.removeClass(ACTIVE);
    }, 50 );
    
    setTimeout(() => { 
      smSlide.removeClass(PREV);
      smSlide.removeClass(NEXT);
    }, 900 );

  })
  .on('afterChange', function(event, slick, currentSlide, nextSlide) {
    smSlideActive = $('.js-small-slider .slick-active');
    slideActive.addClass(ACTIVE);
  });
// END SMALL SLIDER
