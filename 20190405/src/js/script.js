import { BASE_DIR } from '../constants.yml';
import { TweenMax } from 'gsap';
import chroma from 'chroma-js';

const circle = document.querySelector('.js-circle');
const smallCircle = document.querySelector('.js-smallcircle');

// animation setting
const paramX = {
    angle: random(0, 360),
    speed: -0.5,
}

const paramY = {
    angle: random(0, 360),
    speed: 2.8
}

const paramZ = {
    angle: random(0, 360),
    speed: 3.2
}

const paramSmallX = {
    angle: random(0, 360),
    speed: -1.8,
}

const paramSmallY = {
    angle: random(0, 360),
    speed: 3.8
}

const paramSmallZ = {
    angle: random(0, 360),
    speed: 2.2
}

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const circlePos = {
    x: windowWidth * 0.5 - circle.clientWidth * 0.5,
    y: windowHeight * 0.5 - circle.clientHeight * 0.5
};

// 動く範囲
const radius = windowHeight * 0.2;

function animate() {
    let x = Math.sin(toRadian(paramX.angle)) * radius;
    let y = Math.sin(toRadian(paramY.angle)) * radius;
    let z = Math.sin(toRadian(paramZ.angle)) * radius;

    TweenMax.set(circle, {
        x: circlePos.x + x,
        y: circlePos.y + y,
        z: z,
    })

    x = Math.sin(toRadian(paramSmallX.angle)) * radius;
    y = Math.sin(toRadian(paramSmallY.angle)) * radius;
    z = Math.sin(toRadian(paramSmallZ.angle)) * radius;

    TweenMax.set(smallCircle, {
        x: circlePos.x + x,
        y: circlePos.y + y,
        z: z,
    })

    // 増加
    paramX.angle += paramX.speed;
    paramY.angle += paramY.speed;
    paramZ.angle += paramZ.speed;
    paramSmallX.angle += paramSmallX.speed;
    paramSmallY.angle += paramSmallY.speed;
    paramSmallZ.angle += paramSmallZ.speed;

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

// 範囲変換
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

// min(含む)からmax(含む)までのランダムな数
// @min : 最小値
// @max : 最大値
function random(min, max) {
    return Math.random() * (max - min) + min
}
