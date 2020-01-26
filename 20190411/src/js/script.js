import { BASE_DIR } from '../constants.yml';
import { TweenMax } from 'gsap';
import chroma from 'chroma-js';
import _ from 'lodash';
import axios from 'axios';
import $ from 'jquery'

const getData = (data) => {
    console.log("data:" + JSON.stringify(data));

    let insert = document.querySelector('.js-insert');
    insert.innerHTML = JSON.stringify(data);
}

function translate(inputText) {
    $.ajax({
        type: "GET",
        url: "https://script.google.com/macros/s/AKfycbwb5zufclIQdcmzi2GHH08fACFvKDQHx80Uz8dw4ZJa3EXMVrwp/exec",
        data: {
            text: inputText
        },
        dataType: "jsonp",
        contentType: "application/JSON",
        scriptCharset: "utf-8",
        success:function(res){
            getData(res.message);
        },
        error:function(res){
            console.log("error:"+res);
        }
    })
}

const translateBtn = document.querySelector('.js-translate');
translateBtn.addEventListener('click', () => {
    let text = 'ウォーターサーバーの水がなくなったらボトルを交換してくれ。マジで。何で私は約半年で8回もボトルを交換する羽目になるんだ？';
    translate(text);
})




const textList = document.querySelectorAll('.js-text');

const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;

// 動く範囲
const RADIUS_X = WINDOW_WIDTH * 0.2;
const RADIUS_Y = WINDOW_HEIGHT * 0.2;

// animation setting
// テキストのアニメーション用の初期値設定
const textParamList = []
let textParam = null;

_.each(textList, (item)=> {
    textParam = {
        textDom : item,
        x: {
            angle: random(0, 360),
            speed: random(-3.0, 3.0)
        },
        y: {
            angle: random(0, 360),
            speed: random(-3.0, 3.0)
        },
        z: {
            angle: random(0, 360),
            speed: random(-1.0, 1.0)
        },
    }

    textParamList.push(textParam);
    textParam = null;
})

let x = 0;
let y = 0;
let z = 0;
let scaleX = 0;
let scaleY = 0;


function animate() {
    _.each(textParamList, (item)=> {
        x = Math.sin(toRadian(item.x.angle)) * RADIUS_X;
        y = Math.sin(toRadian(item.y.angle)) * RADIUS_X;
        z = Math.sin(toRadian(item.z.angle)) * RADIUS_X;

        scaleX = map(Math.sin(toRadian(item.x.angle)), 1, 2, -1, 1);
        scaleY = map(Math.cos(toRadian(item.y.angle)), 1, 2, -1, 1);

        TweenMax.set(item.textDom, {
            x: x,
            y: (WINDOW_WIDTH * 0.5 - item.offsetHeight * 0.5) + y,
            z: z,
            rotationX: item.x.angle,
            rotationY: item.y.angle,
            rotationZ: item.z.angle
        })

        // 増加
        item.x.angle += item.x.speed;
        item.y.angle += item.y.speed;
        item.z.angle += item.z.speed;
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
