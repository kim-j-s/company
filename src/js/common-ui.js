import '../css/common.scss'

function slide() {
  $('.slide-act').on('click', function(){
    var data = $(this).data('slide');
    var $trg = $("[data-slidecont='" + data + "']");

    if ( $trg.css('display') == 'block' ){
      $(this).addClass('on');
      $trg.stop().slideUp(500);
    } else {
      $(this).removeClass('on');
      $trg.stop().slideDown(500);
    }
  })
}

$(function(){
  // slide
  slide();
})