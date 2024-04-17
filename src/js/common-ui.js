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
    start: 'top 600px',
    end: 'top 100px',
    // scrub: true,
    scrub: 1,
    // markers: true
  }
})
gsap.to('.gsap_02_img02', {
  opacity: 1,
  y: -140,
  duration: 2,
  scrollTrigger: {
    trigger: '.gsap_02_img02',
    start: 'top 650px',
    end: 'top 100px',
    // scrub: true,
    scrub: 1,
    // markers: true
  }
})
gsap.to('.gsap_02_img03', {
  opacity: 1,
  x: -200,
  duration: 2,
  scrollTrigger: {
    trigger: '.gsap_02',
    start: 'top 600px',
    end: 'top 100px',
    // scrub: true,
    scrub: 1,
    // markers: true
  }
})

gsap.to('.gasp_03 .text', {
  backgroundPositionX: "0%",
  stagger: 20,
  duration: 20,
  scrollTrigger: {
    trigger: '.gasp_03 .text',
    start: 'top 80%',
    end: 'bottom 25%',
    scrub: 1,
    // markers: true
  }
})
