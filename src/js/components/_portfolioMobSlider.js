import slick from 'slick-carousel';
import { ACTIVE } from './../constants';
import { BUILD_ICON } from './../utils';

const container = $('.js-portfolio-slider');
const options = {
  dots: true,
  arrows: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  fade: true,
  speed: 500,
};
container.slick(options);
