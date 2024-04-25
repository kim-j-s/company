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
      // markers: true,
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


// project 효과
/*
let mouseX = 0;
let targetX = 0;
let domX = 0;
let targetDomX = 0;
// 컨텐츠 0점 + 컨텐츠 넓이
let domOffsetRight = 0;
// 컨텐츠 왼쪽 잔류 영역 계산
let zeroPoint = 0;
const ease = 0.07; // 이동 속도 조절을 위한 값을 조절 : 낮을수록 느림

// 컨텐츠 선언
const hoverDom = document.querySelector('.project_content_items');

// 컨텐츠 넓이
const domWidth = hoverDom.offsetWidth;

window.addEventListener("mousemove", (e) => {
  targetX = e.clientX;
});

hoverDom.addEventListener("mousemove", (e) => {
  domX = e.clientX;
  zeroPoint = hoverDom.offsetLeft;
  domOffsetRight = hoverDom.offsetLeft + hoverDom.offsetWidth;
  console.log('zeroPoint : ', zeroPoint);
  console.log('domOffsetRight : ', domOffsetRight);  
});

hoverDom.addEventListener("mouseleave", () => {
  setTimeout(function(){
    if (targetX < zeroPoint) {
      domX = zeroPoint;
      // console.log('왼쪽으로 나갔을 경우');
    } else if (domX < targetX && targetX > domOffsetRight) {
      domX = domOffsetRight;
      // console.log('오른쪽으로 나갔을 경우');
    }
  }, 10)
});


function updateOutput() {
  mouseX += (targetX - mouseX) * ease;
  targetDomX += (domX - targetDomX) * ease;

  document.querySelector('.output').textContent = `마우스 x 축 : ${Math.round(mouseX)}`;
  document.querySelector('.fix').style.left = `${Math.round(mouseX)}px`;
  document.querySelector('.fix').textContent = domX
  document.querySelector('.fix2').textContent = targetDomX.toFixed(2)

  const calc = (((targetDomX - zeroPoint) / domWidth * 100) / 5) + 40
  const perComma = calc.toFixed(2) + 40
  $(hoverDom).children('.item').eq(0).css('width', perComma + '%')
  $(hoverDom).children('.item').eq(1).css('width', (100 - perComma) + '%')
}

function smoothUpdate() {
  updateOutput(); // 출력 업데이트
  requestAnimationFrame(smoothUpdate);
}

// 부드러운 업데이트 시작
smoothUpdate();
*/

/*----------------------------------------*/


// project 효과
/*
let mousePositions = []; // 각 컨텐츠의 마우스 위치를 저장하기 위한 배열
let targets = []; // 각 컨텐츠의 목표 위치를 저장하기 위한 배열
let domPositions = []; // 각 컨텐츠의 현재 위치를 저장하기 위한 배열
let targetDomPositions = []; // 각 컨텐츠의 목표 DOM 위치를 저장하기 위한 배열
let domOffsetRights = []; // 각 컨텐츠의 offsetRight 값을 저장하기 위한 배열
let zeroPoints = []; // 각 컨텐츠의 왼쪽 잔류 영역을 저장하기 위한 배열
let domWidths = []; // 각 컨텐츠의 너비를 저장하기 위한 배열
const ease = 0.07; // 이동 속도 조절을 위한 값을 조절 : 낮을수록 느림

// 컨텐츠 선언
const hoverDoms = document.querySelectorAll('.project_content_items');

hoverDoms.forEach((hoverDom, index) => {
  // 컨텐츠 넓이
  const domWidth = hoverDom.offsetWidth;
  domWidths.push(domWidth); // 너비를 배열에 저장
  mousePositions.push(0);
  targets.push(0);
  domPositions.push(0);
  targetDomPositions.push(0);
  domOffsetRights.push(0);
  zeroPoints.push(0);

  window.addEventListener("mousemove", (e) => {
    targets[index] = e.clientX;
  });

  hoverDom.addEventListener("mousemove", (e) => {
    console.log('진입');
    domPositions[index] = e.clientX;
    zeroPoints[index] = hoverDom.offsetLeft;
    domOffsetRights[index] = hoverDom.offsetLeft + hoverDom.offsetWidth;
  });

  hoverDom.addEventListener("mouseleave", () => {
    console.log('leave');
    setTimeout(function(){
      if (targets[index] < zeroPoints[index]) {
        domPositions[index] = zeroPoints[index];
      } else if (domPositions[index] < targets[index] && targets[index] > domOffsetRights[index]) {
        domPositions[index] = domOffsetRights[index];
      }
    }, 10)
  });
});

function updateOutput() {
  mousePositions.forEach((mouseX, index) => {
    mouseX += (targets[index] - mouseX) * ease;
    targetDomPositions[index] += (domPositions[index] - targetDomPositions[index]) * ease;

    const calc = (((targetDomPositions[index] - zeroPoints[index]) / domWidths[index] * 100) / 5) + 40;
    // console.log(calc.toFixed(2));
    const perComma = calc.toFixed(2);
    $(hoverDoms[index]).children('.item').eq(0).css('width', (100 - perComma) + '%');
    $(hoverDoms[index]).children('.item').eq(1).css('width', perComma + '%');
  });
}

function smoothUpdate() {
  updateOutput(); // 출력 업데이트
  requestAnimationFrame(smoothUpdate);
}

// 부드러운 업데이트 시작
smoothUpdate();
*/

/*----------------------------------------*/


// project 효과

// 윈도우 마우스 X
// let mouseX = 0;
// 계산된 윈도우 마우스 X
// let targetX = 0;
// element 마우스 X
// let domX = 0;
// dom 의 넓이
// let domWidth = 0;
// 계산된 element 마우스 X
// let targetDomX = 0;
// 컨텐츠 왼쪽 잔류 영역 계산
// let zeroPoint = 0;


// 윈도우 마우스 X / 모션
let mouseX = 0;
// 계산된 윈도우 마우스 X
let targetX = 0;
// element 마우스 X
// let domX = [];
let domX = [];
// 계산된 element 마우스 X / 모션
// let targetDomX = [];
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

// project 영역
const eventDom = document.querySelector('.project');

// 윈도우 마우스 X 값 출력
window.addEventListener("mousemove", (e) => {
  targetX = e.clientX;
});

// 마우스 부드러운 계산식
// window 용
function windowMotion() {
  mouseX += (targetX - mouseX) * ease;
  // console.log(mouseX);
  document.querySelector('.output').textContent = `마우스 x 축 : ${Math.round(mouseX)}`;
  document.querySelector('.fix').style.left = `${Math.round(mouseX)}px`;
  document.querySelector('.fix').textContent = `${Math.round(mouseX)}px`;
}

// 윈도우 X 좌표는 상시 출력
function windowXmotion() {
  // console.log('구동');
  windowMotion(); // 출력 업데이트
  requestAnimationFrame(windowXmotion);
}
windowXmotion();

// dom 용
// 개별로 적용
function domMotion() {
  // targetDomX += (domX - targetDomX) * ease;
  domX[index] += (targetDomX[index] - domX[index]) * ease;
}

// 개별로 적용
// function mouseXMotion() {
//   domMotion()  
//   document.querySelector('.fix').textContent = domX
//   document.querySelector('.fix2').textContent = targetDomX.toFixed(2)
//   raf = requestAnimationFrame(mouseXMotion);
// }

// project 영역 진입 시 모션 시작
/*
eventDom.addEventListener('mouseenter', () => {
  console.log('project 영역 진입');
  // mouseXMotion()
})
*/

// project 영역 나갔을 경우 모션 정지
// eventDom.addEventListener('mouseleave', () => {
//   setTimeout(function(){
//     cancelAnimationFrame(raf)
//   }, 1000)
//   /*
//   개선 내용 : 
//   requestAnimationFrame을 사용해서 mouseX(윈도우 마우스 포인트) === domX(돔의 마우스 위치) 
//   가 동일할 경우 cancelAnimationFrame(raf) 실행하여 requestAnimationFrame 멈춤
//   */
//   // console.log('나감');
// })

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

    // if (raf === false) {
    //   raf = true
    //   console.log(raf);
    //   console.log('index : ', index)
    // }
    console.log('진입 인덱스 : ', index)
    motionUpdate(index);

    // 각각 dom의 자식에게 넓이를 배정하는 기능
    // domX[index] += (targetDomX[index] - domX[index]) * ease;
    // const calc = (((domX[index] - zeroPoint[index]) / domWidths[index] * 100) / 5) + 40;
    // const perComma = calc.toFixed(2);
    // $(hoverDoms[index]).children('.item').eq(0).css('width', (100 - perComma) + '%');
    // $(hoverDoms[index]).children('.item').eq(1).css('width', perComma + '%');
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
      // cancelAnimationFrame(raf)
      cancelAnimationFrame(rafs[index]);
    }, 10)
    // hoverDom.style.background = 'blue'
  });


  // motion
  function motionFuntion(index) {
    // const indexNum = index;
    console.log('motion index : ', index)
    domX[index] += (targetDomX[index] - domX[index]) * ease;
    const calc = (((domX[index] - zeroPoint[index]) / domWidths[index] * 100) / 5) + 40;
    const perComma = calc.toFixed(2);
    // console.log('percent : ', perComma);
    $(hoverDoms[index]).children('.item').eq(0).css('width', (100 - perComma) + '%');
    $(hoverDoms[index]).children('.item').eq(1).css('width', perComma + '%');
  }
  function motionUpdate(index) {
    motionFuntion(index); // 출력 업데이트
    // console.log('index : ', index);
    // requestAnimationFrame(motionUpdate);
    cancelAnimationFrame(rafs[index]);
    // raf = requestAnimationFrame(motionUpdate);
    rafs[index] = requestAnimationFrame(() => motionUpdate(index));
  }
  // motionUpdate();
})
