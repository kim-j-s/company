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

// BODALAB GSAP
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


// VISION GSAP
const textItems = document.querySelectorAll('.text_item');
const dom = document.querySelector('.dom');
const iimg = document.querySelector('.dom img');

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
      // markers: true,
      onEnter: function(ele) { 
        // console.log('Index', index)
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

// PROJECT GSAP
const projectItems = document.querySelectorAll('.project_content .project_content_items');
projectItems.forEach((item, index) => {
  gsap.set(item, { opacity: 0, y: 150 });
  gsap.to(item, {
    y: 0,
    opacity: 1,
    duration: 0.5,
    ease: "power3.in",
    scrollTrigger: {
      trigger: item,
      start: () => "-400 " + item.offsetHeight,
      toggleActions: 'play none none none',
      // markers: true
    }
  })
})


/*----------------------------------------*/

// project 효과

// 윈도우 마우스 X / 모션
let mouseX = 0;
// 계산된 윈도우 마우스 X
let targetX = 0;
// element 마우스 X
let domX = [];
// 계산된 element 마우스 X / 모션
let targetDomX = [];
// 각 컨텐츠의 너비를 저장하기 위한 배열
let domWidths = []; 
// 돔 최대 길이
let domMaxWidths = [];
// 컨텐츠 왼쪽 잔류 영역 계산
let zeroPoint = [];
// 이동 속도 조절을 위한 값을 조절 : 낮을수록 느림
const ease = 0.04;

// requestAnimationFrame 초기화
// let raf = false;
let rafs = [];

// let cancelLet = false;
let cancelLet = [];

// 윈도우 마우스 X 값 출력
window.addEventListener("mousemove", (e) => {
  targetX = e.clientX;
});

// 마우스 부드러운 계산식
// window 용
function windowMotion() {
  mouseX += (targetX - mouseX) * ease;
}

// 윈도우 X 좌표는 상시 출력
function windowXmotion() {
  // console.log('구동');
  windowMotion(); // 출력 업데이트
  requestAnimationFrame(windowXmotion);
}
windowXmotion();

// 컨텐츠 선언
const hoverDoms = document.querySelectorAll('.project_content_items');
hoverDoms.forEach((hoverDom, index) => {
  
  // 초기세팅
  const domWidth = hoverDom.offsetWidth;
  // 너비를 배열에 저장
  domWidths.push(domWidth); 
  // dom 단위 x 값 모션 변수
  domX.push(0);
  // dom 단위 x 값 변수
  targetDomX.push(0);
  // zeroPoints 0점
  zeroPoint.push(0);

  // dom 에 마우스 진입 시 이벤트
  hoverDom.addEventListener("mousemove", (e) => {
    // console.log(e);
    // dom의 X 좌표
    targetDomX[index] = e.clientX;
    // console.log(domX[index])
    // dom의 컨텐트 왼쪽 0점
    zeroPoint[index] = hoverDom.offsetLeft;

    // 각각 최대 넓이값 추가
    domMaxWidths[index] = hoverDom.offsetLeft + hoverDom.offsetWidth;    
    // console.log('진입 인덱스 : ', index)
    motionUpdate(index);
  })

  // dom 에 마우스 나갈 시 이벤트
  hoverDom.addEventListener("mouseleave", () => {
    // console.log('mouseX : ', mouseX);
    setTimeout(function(){
      // 돔의 x 좌표가 돔의 0점보다 높다 크다 비교
      if (targetX < zeroPoint[index]) {
        targetDomX[index] = zeroPoint[index];
        // console.log('left', mouseX)
      /*
      우측으로 나갈 경우 돔의 X 좌표가 윈도우 X 좌표보다 작고, 
      윈도우 X 좌표가 돔의 전체 길이보다 큰 경우
      */
      } else if (targetX > targetDomX[index] && targetX > domWidths[index]) {
        targetDomX[index] = domMaxWidths[index];
        // console.log('right', domMaxWidths[index])
      }
      // console.log('후보정 이벤트 작성 구간')
      // 나갈 경우 requestAnimationFrame 종료
      console.log('종료');
      setTimeout(function(){
        cancelAnimationFrame(rafs[index]);
      }, 3500)
    }, 10)
  });

  // motion
  function motionFuntion(index) {
    // console.log('motion index : ', index)
    domX[index] += (targetDomX[index] - domX[index]) * ease;
    const calc = (((domX[index] - zeroPoint[index]) / domWidths[index] * 100) / 5) + 39;
    const perComma = calc.toFixed(2);
    const dom1 = $(hoverDoms[index]).children('.item').eq(0).outerWidth();
    const dom2 = $(hoverDoms[index]).children('.item').eq(1).outerWidth();
    // console.log(cancelLet[index])
    if (cancelLet[index] === undefined) {
      cancelLet[index] = false
      console.log('돔의 ',index, '번째 의 넓이', dom1, ' px / 컨텐츠 넓이는?', domWidths[index]);
      console.log('돔의 ',index, '번째 의 넓이', dom2, ' px / 컨텐츠 넓이는?', domWidths[index]);
      const fixedWidth = (dom1 / domWidths[index]) * 100
      const cf = fixedWidth.toFixed(2)
      console.log(cf)
      // $(hoverDoms[index]).children('.item').eq(0).css('width', cf + '%');
      // $(hoverDoms[index]).children('.item').eq(1).css('width', (100 - cf) + '%');
      $(hoverDoms[index]).children('.item').eq(0).css('width', '39%');
      $(hoverDoms[index]).children('.item').eq(1).css('width', '61%');
    }

    if (cancelLet[index] === false) {
      $(hoverDoms[index]).children('.item').eq(0).css('width', (100 - perComma) + '%');
      $(hoverDoms[index]).children('.item').eq(1).css('width', perComma + '%');
    }
    // $(hoverDoms[index]).children('.item').eq(0).css('width', (100 - perComma) + '%');
    // $(hoverDoms[index]).children('.item').eq(1).css('width', perComma + '%');
    
    
  }
  function motionUpdate(index) {
    motionFuntion(index); // 출력 업데이트
    cancelAnimationFrame(rafs[index]);
    rafs[index] = requestAnimationFrame(() => motionUpdate(index));
  }
})
