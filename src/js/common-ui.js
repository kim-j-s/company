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

// BODALAB
gsap.to('.gsap_bodalab_img01', {
  opacity: 1,
  y: 200,
  duration: 2,
  scrollTrigger: {
    trigger: '.gsap_bodalab_img01',
    start: 'top 90%',
    end: 'bottom center',
    // scrub: true,
    scrub: 1,
    // markers: true
  }
})
gsap.to('.gsap_bodalab_img02', {
  opacity: 1,
  y: -140,
  duration: 2,
  scrollTrigger: {
    trigger: '.gsap_bodalab_img02',
    start: 'top 90%',
    end: 'top 60%',
    // scrub: true,
    scrub: 1,
    // markers: true
  }
})
gsap.to('.gsap_bodalab_img03', {
  opacity: 1,
  x: -200,
  duration: 2,
  scrollTrigger: {
    trigger: '.gsap_bodalab',
    start: 'top 90%',
    end: 'bottom center',
    // scrub: true,
    scrub: 1,
    // markers: true
  }
})

gsap.to('.gsap_bodalab_text .text', {
  backgroundPositionX: "0%",
  stagger: 20,
  duration: 20,
  scrollTrigger: {
    trigger: '.gsap_bodalab_text .text',
    start: 'top 80%',
    end: 'bottom 25%',
    scrub: 1,
    // markers: true
  }
})


// VISION
const textItems = document.querySelectorAll('.text_item');
const dom = document.querySelector('.dom');

const backgrounds = [
  'gsap_vision_content_01.jpg',
  'gsap_vision_content_02.jpg',
  'gsap_vision_content_03.jpg'
];


textItems.forEach((item, index) => {
  let backgroundIndex;
  switch (index) {
    case 0:
    case 1:
      backgroundIndex = 0;
      break;
    case 2:
      backgroundIndex = 2;
      break;
    default:
      backgroundIndex = 0;
  }
  
  const trigger = index === 0 ? 'top' : 'center'; // Trigger point for each section
  const scrub = index === 0 ? 0 : 1; // 0 for fixed background, 1 for scrolling with content
  gsap.to(dom, {
    scrollTrigger: {
      trigger: item,
      start: 'top 90%',
      end: 'bottom 25%',
      // scrub: true,
      markers: true,
      // toggleActions: 'restart pause reverse pause',
      // onEnter: function(ele) { 
      //   console.log('Index', index)
      //   dom.style.backgroundImage = `url(../../img/${backgrounds[index]})`
      // },
      // onLeave: function(ele) { 
      //   console.log('Index Leave', index)
      //   dom.style.backgroundImage = `url(../../img/${backgrounds[index]})`
      // },
    },
    backgroundImage: `url(../../img/${backgrounds[index]})`,
  });
});