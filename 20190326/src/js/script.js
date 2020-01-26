import { BASE_DIR } from '../constants.yml';
import { TweenMax } from 'gsap';

const circle = document.querySelector('.js-circle');

// mouse position
const mouse = { 
    x: 0,
    y: 0 
};

// circle position
const circlePos = { 
    x: 0,
    y: 0,
    vx:0,
    vy:0
};

// small sircle position
const smallCirclePos = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0
}

// easing
const ease = 0.15;

// power
const power = 0.8;

// map base value
let dist = 0;
let distX = 0;
let distY = 0;

let size = 0;

let scale = 0;
let alpha = 0;


// 値の範囲変換の公式
// @val     : 変換したい値
// @toMin   : 変換後の最小値
// @toMax   : 変換後の最大値
// @fromMin : 変換前の最小値
// @fromMax : 変換前の最大値
function map(val, toMin, toMax, fromMin, fromMax) {
    if(val <= fromMin) {
      return toMin;
    }
    if(val >= fromMax) {
      return toMax;
    }
    let p = (toMax - toMin) / (fromMax - fromMin);
    return ((val - fromMin) * p) + toMin;
}

// 値の線形補間の公式
// @from  : 始点
// @to    : 終点
// @alpha : 位置
function lerp(from, to, alpha) {
    return (from * (1 - alpha)) + (to * alpha);
}

// 線形補間を利用して色をそれぞれ設定する
function lerpColor(from, to, alpha) {
    return 'rgb(' + lerp(from.r, to.r, alpha) + ',' + lerp(from.g, to.g, alpha) + ',' + lerp(from.b, to.b, alpha) +')';
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

function update() {
    size = window.innerWidth;

    // circle position set
    circlePos.x += (mouse.x - circlePos.x) * ease;
    circlePos.y += (mouse.y- circlePos.y) * ease;

    // circle scale set
    distX = mouse.x - circlePos.x;
    distY = mouse.y - circlePos.y;
    dist = Math.sqrt(distX * distX + distY * distY);

    scale = map(dist, 1, 4, 0, size * 0.25)
    alpha = map(dist, 0, 1, 0, size * 0.1);

    TweenMax.set(circle, {
        x: circlePos.x - (circle.clientWidth * 0.5),
        y: circlePos.y - (circle.clientHeight * 0.5),
        scale: scale,
        backgroundColor: lerpColor({r:129,g:199,b:132}, {r:121,g:85,b:72}, alpha)
    });


    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);