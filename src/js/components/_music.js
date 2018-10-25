
function stopTrack(id) {
  $('.js-vinil-'+id).addClass('play').toggleClass('paused');
}
function playTrack(id) {
  $('.js-play').click(function() {
    var id_track = $(this).attr('data-id_track');
    if ($('.track-'+id_track).get(0).paused) {
      $('.track-'+id_track).get(0).play();
      $(this).text('Stop');
    } else {
      $('.track-'+id_track).get(0).pause();
      $(this).text('Play');
    }
    $('.vinyl-'+id_track).addClass('play').toggleClass('paused');
  });
}
$(function() {
  playTrack();
});
  
