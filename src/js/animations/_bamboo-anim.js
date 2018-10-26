$(document).ready(function() {

  var line = $('.js-anim-line-scale');
  var circle = $('.js-anim-circle-scale');
  var circleLg = $('.js-anim-circle-lg-scale');
  var halfCircle = $('.js-anim-rotate');


  halfCircle.addClass('bamboo-header__bg_half-circle-full');
  circle.addClass('bamboo-header__bg_circle-full');
  circleLg.addClass('bamboo-header__bg_circle-lg-full');


  window.setInterval(function() {
    line.toggleClass('bamboo-header__bg_line-full');
  }, 1000);


});
