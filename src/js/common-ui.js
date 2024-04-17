import '../css/common.scss'

function slide() {
  $('.slide_act').on('click', function(){
    const parent = $(this).closest('.slide_title')
    const trg = parent.next('.slide_content')
    if ( trg.css('display') == 'block' ){
      $(this).addClass('active');
      trg.stop().slideUp(300);
    } else {
      $(this).removeClass('active');
      trg.stop().slideDown(300);
    }
  })
}

$(function(){
  // slide
  slide();
})

gsap.registerPlugin(ScrollTrigger);
gsap.to('.gsap_02_img01', {
  opacity: 1,
  y: 200,
  duration: 2,
  scrollTrigger: {
    trigger: '.gsap_02_img01',
    // start: 'top 600px',
    start: 'top 600px',
    end: 'top 100px',
    // toggleActions: 'restart pause reverse pause',
    // scrub: true,
    scrub: 1,
    // markers: {
    //   startColor: 'blue',
    //   endColor: 'red',
    //   fontSize: '50px',
    //   indent: 200
    // }
    markers: true
  }
})

