const container = $('.js-bg-video video').get(0);
if (container && container.paused) {
  container.play();
}
