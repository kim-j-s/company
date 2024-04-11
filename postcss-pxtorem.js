// px to rem 실행 js

"use strict";

console.log('postcss-pxtorem !!!')
const fs = require('fs');
const postcss = require('postcss');
const pxtorem = require('postcss-pxtorem');
const exceptionSelectorList = [/^html$/, '.not_rem']; // 예외처리

const fn_pxtorem = (path) => {
  // input file
  const css = fs.readFileSync(path, 'utf8');

  // options
  const options = {
    rootValue: 16,
    propList: ['*'],
    replace: true,
    mediaQuery: false,
    minPixelValue: 1,
    // 예외 처리 셀렉터
    selectorBlackList: exceptionSelectorList,
  };
  
  const processedCss = postcss(pxtorem(options)).process(css).css;
  
  // output file
  fs.writeFile(path, processedCss, function (err) {
    if (err) {
      throw err;
    }
    console.log('Rem file written.');
  });
}

// style.css
fn_pxtorem('./dist/css/style.css');


/* 
!! px -> rem 자동변환 !!
하단에 함수 실행
pxtorem(css 파일 경로);
 */


