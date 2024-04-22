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
        // console.log('Index', index)
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
let targetX = 0;
let domX = 0;
const ease = 0.08; // 이동 속도 조절을 위한 값을 조절

// 브라우져 넓이
let wwidth = document.documentElement.clientWidth

// 컨텐츠 선언
const hoverDom = document.querySelector('.project_content_items');

// 컨텐츠 넓이
let domWidth = hoverDom.offsetWidth;

let 공간 = wwidth - domWidth


// 계산되어야 할 전체 넓이에서 컨텐츠 넓이를 뺀 여백의 왼쪽 여백값
// let zeroPoint = (wwidth - 1280) / 2;
let zeroPoint = hoverDom.offsetLeft;

// hover 컨텐츠 반
const hoverDomHalf = domWidth / 2;
// console.log('컨텐츠 넓이 절반 넓이 : ', hoverDomHalf);

// 컨텐츠 0점 + 컨텐츠 넓이
const domOffsetRight = hoverDom.offsetLeft + hoverDom.offsetWidth;

window.addEventListener("mousemove", (e) => {
  targetX = e.clientX;
  // console.log('브라우져 X 축 값 : ', targetX);
});

hoverDom.addEventListener("mousemove", (e) => {
  domX = e.clientX;
  // console.log('컨텐츠 X 축 값 : ', domX);
});

function updateOutput() {
  mouseX += (targetX - mouseX) * ease;
  document.querySelector('.output').textContent = `마우스 x 축 : ${Math.round(mouseX)}`;
  document.querySelector('.fix').style.left = `${Math.round(mouseX)}px`;
  document.querySelector('.fix').textContent = domX
  
  // const per = (targetX - zeroPoint) / (wwidth - 공간) * 100;
  // const 분해 = per / 4;
  // const 분해증가 = Number(분해);
  // const perComma = 분해증가.toFixed(3)
  // $(hoverDom).children('.item').eq(0).css('width', perComma + '%')
  // $(hoverDom).children('.item').eq(1).css('width', (100 - perComma) + '%')
}

hoverDom.addEventListener("mouseleave", () => {
  // 왼쪽으로 나갔을 경우
  const calchoverDomHalf = wwidth / 2;
  console.log('targetX 위치 : ', targetX, 'domX 위치 : ', domX);
  setTimeout(function(){
    // if (targetX < domX && targetX < zeroPoint) {
    if (targetX < zeroPoint) {
      domX = zeroPoint;
      // console.log('left : ', hoverDomHalf, ' X 값 : ', targetX);
      console.log('left');
    } else if (domX < targetX) {
      targetX = domOffsetRight;
      console.log('right');
      // console.log('가야하는 왼쪽 길이 : ', domOffsetRight, ' X 값 : ', targetX, ' dom X 축 : ', domY, ' dom 절반 넓이 : ', hoverDomHalf);
    }
  }, 50)
});

function smoothUpdate() {
  updateOutput(); // 출력 업데이트
  requestAnimationFrame(smoothUpdate);
}

// 부드러운 업데이트 시작
smoothUpdate();

