import { BASE_DIR } from '../constants.yml';
import { TweenMax } from 'gsap';

const circle = document.querySelector('.js-circle');
const smallcircle = document.querySelector('.js-smallcircle');

// animation setting
let angle = 0;
let radian = 0;

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const radius = windowHeight * 0.25;
const sradius = windowHeight * 0.5

const circlePos = {
    x: windowWidth * 0.5 - circle.clientWidth * 0.5,
    y: windowHeight * 0.5 - circle.clientHeight * 0.5
};


function animate() {
    radian = toRadian(angle);

    // 公式として覚える。ラジアンのsin×半径を位置を足していく。
    let x = circlePos.x + Math.sin(radian) * radius;
    let y = circlePos.y + Math.cos(radian) * radius;

    TweenMax.set(circle, {
        x: x,
        y: y
    })

    TweenMax.set(smallcircle, {
        x: circlePos.x + Math.sin(radian) * sradius,
        y: circlePos.y,
        z: Math.cos(radian) * sradius
    })

    // ここで設定する角度と速さはイコール関係
    angle += 2;
 
    window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);


// 度数からラジアンに変換する
// @val: 度
function toRadian(val) {
    return val * Math.PI / 180;
}

// ラジアンから度数に変換する
// @val: ラジアン
function toDegree(val) {
    return val * 180 / Math.PI;
}