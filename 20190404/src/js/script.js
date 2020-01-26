import { BASE_DIR } from '../constants.yml';
import { TweenMax } from 'gsap';
import chroma from 'chroma-js';

const circle = document.querySelector('.js-circle');

// animation setting
let angle = 0;
let radian = 0;
let val = 0;
let scale = 0;
let rotation = 0;
let color = null;
let border = 0;

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const circlePos = {
    x: windowWidth * 0.5 - circle.clientWidth * 0.5,
    y: windowHeight * 0.5 - circle.clientHeight * 0.5
};


function animate() {
    radian = toRadian(angle);
    val = Math.sin(radian);
    scale = map(val, 0.5, 5, -1, 1);
    rotation = map(val, -90, 90, -1, 1);
    color = chroma.mix(0x26C6DA, 0xFFFDE7, map(val, 0, 1, -1, 1)).css();
    border = map(val, 0, 50, -1, 1);

    TweenMax.set(circle, {
        x: circlePos.x,
        y: circlePos.y,
        scale: scale,
        rotationZ: rotation,
        backgroundColor:color,
        borderRadius: border
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