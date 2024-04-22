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
const iimg = document.querySelector('.dom img');

const backgrounds = [
  'gsap_vision_content_01.jpg',
  'gsap_vision_content_02.jpg',
  'gsap_vision_content_03.jpg'
];

const imgs = [
  'gsap_vision_content_01.jpg',
  'gsap_vision_content_02.jpg',
  'gsap_vision_content_03.jpg'
];


textItems.forEach((item, index) => {  
  gsap.to(textItems, {
    opacity: 1,
    scrollTrigger: {
      trigger: item,
      start: 'top 50%',
      end: 'bottom 50%',
      // scrub: 1,
      markers: true,
      onEnter: function(ele) { 
        console.log('Index', index, )
        // dom.style.backgroundImage = `url(../../img/${backgrounds[index]})`
        if (index != 0) {
          dom.classList.remove('active')
          setTimeout(function(){
            dom.classList.add('active')
          }, 10)
          iimg.src = `../../img/${imgs[index]}`
        }
      },
      onEnterBack: function(ele) { 
        // console.log('Index onEnterBack', index)
        // dom.style.backgroundImage = `url(../../img/${backgrounds[index]})`
        if ((textItems.length - 1) != index) {
          dom.classList.remove('active')
          setTimeout(function(){
            dom.classList.add('active')
          }, 10)
          iimg.src = `../../img/${imgs[index]}`
        }
      },
    },
  })
});



let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const ease = 0.08; // 이동 속도 조절을 위한 값을 조절


const hoverDom = document.querySelector('.project_content_items');
let wwidth = document.documentElement.clientWidth


// hover 컨텐츠 반
const hoverDomHalf = hoverDom / 2;

// 컨텐츠 우측 끝
const domOffsetRight = hoverDom.offsetLeft + hoverDom.offsetWidth;

// window.addEventListener("mousemove", (e) => {
//   targetX = e.clientX;
//   targetY = e.clientY;
// });

// const hoverDom = document.querySelector('.project_content_items');

hoverDom.addEventListener("mousemove", (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});

hoverDom.addEventListener("mouseleave", () => {

  // 왼쪽으로 나갔을 경우
  /*
  if () {

  } else {
    
  }
  */
  targetX = 0;
  targetY = 0;
});

function updateOutput() {
  mouseX += (targetX - mouseX) * ease;
  mouseY += (targetY - mouseY) * ease;

  document.querySelector('.output').textContent = `마우스 x 축 : ${Math.round(mouseX)}, 마우스 y 축 : ${Math.round(mouseY)}`;
  document.querySelector('.fix').style.left = `${Math.round(mouseX)}px`;

  
  
  let domWidth = hoverDom.offsetWidth;
  let zeroPoint = (wwidth - 1280) / 2;
  let 공간 = wwidth - domWidth
  console.log('공간 넓이 : ', 공간);
  // const per = (targetX - zeroPoint) / domWidth * 100;
  const per = (targetX - zeroPoint) / (wwidth - 공간) * 100;
  console.log('per per per', per)
  const 분해 = per / 4;
  // const 분해증가 = Number(분해) + 35;
  const 분해증가 = Number(분해);
  const perComma = 분해증가.toFixed(3)
  console.log('소수점 정리 : ', perComma);
  $(hoverDom).children('.item').eq(0).css('width', perComma + '%')
  $(hoverDom).children('.item').eq(1).css('width', (100 - perComma) + '%')
}

function smoothUpdate() {
  updateOutput(); // 출력 업데이트
  requestAnimationFrame(smoothUpdate);
}

// 부드러운 업데이트 시작
smoothUpdate();

