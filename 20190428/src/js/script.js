import { BASE_DIR } from '../constants.yml';
import { TweenMax } from 'gsap';
import chroma from 'chroma-js';
import _ from 'lodash';
import $ from 'jquery';

const rectangleList = document.querySelectorAll('.js-rectangle');
const mainFrame = document.querySelector('.js-frame');

// animation setting
const rectangleParamList = []
let param = null;

for(let i = 0; i < 10; i++) {
    param = {
        ang:random(0,360),
        speed:random(1,3)
    }

    rectangleParamList.push(param);
    param = null;
}

let x = 0;
let y = 0;
let scaleX = 0;
let scaleY = 0;
let rotX = 0;
let rotY = 0;
let rotZ = 0;
let ofX = 0;
let ofY = 0;
let color = null;


function animate() {
    // ウィンドウのリサイズ検知
    const WINDOW_WIDTH = window.innerWidth;
    const WINDOW_HEIGHT = window.innerHeight;

    // 動く範囲
    const RADIUS = WINDOW_HEIGHT * 0.1;

    TweenMax.set(mainFrame, {
        perspective: map(Math.cos(toRadian(rectangleParamList[0].ang)), 10, 500, -1, 1) + 'px'
    });

    // rectangle animation set
    _.each(rectangleList, (item, i)=> {

        const domCenter = {
            x: WINDOW_WIDTH * (i / rectangleList.length),
            y: WINDOW_HEIGHT * 0.5 + Math.sin(toRadian(rectangleParamList[1].ang + i * (360 / rectangleList.length))) * (WINDOW_HEIGHT * 0.3),
        }

        scaleX = map(Math.sin(toRadian(rectangleParamList[2].ang)), 1, 2, -1, 1);
        scaleY = map(Math.cos(toRadian(rectangleParamList[3].ang)), 1, 2, -1, 1);

        rotX = map(Math.cos(toRadian(rectangleParamList[4].ang)), -90, 90, -1, 1);
        rotY = map(Math.sin(toRadian(rectangleParamList[5].ang)), -90, 90, -1, 1);
        rotZ = map(Math.cos(toRadian(rectangleParamList[6].ang)), -90, 90, -1, 1);

        ofX = Math.cos(toRadian(rectangleParamList[7].ang)) * RADIUS;
        ofY = Math.sin(toRadian(rectangleParamList[8].ang)) * RADIUS;

        color = chroma.mix(0xFFAB91, 0x82B1FF, map(Math.cos(rectangleParamList[9].ang * 0.05), 0, 1, -1, 1)).css();

        TweenMax.set(item, {
            x: domCenter.x + ofX,
            y: domCenter.y + ofY,
            scaleX: scaleX,
            scaleY: scaleY,
            rotationX: rotX,
            rotationY: rotY,
            rotationZ: rotZ,
            backgroundColor: color
        })

        // param update
        _.each(rectangleParamList, (item) => {
            item.ang += item.speed * 0.03;
        })
    })
    
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
