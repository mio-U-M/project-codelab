import { BASE_DIR } from '../constants.yml';
import { TweenMax } from 'gsap';

const circle = document.querySelector('.js-circle');
const smallcircle = document.querySelector('.js-smallcircle');

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


window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

function update() {
    // circle set
    circlePos.x += (mouse.x - circlePos.x) * ease;
    circlePos.y += (mouse.y- circlePos.y) * ease;

    TweenMax.set(circle, {
        x: circlePos.x - (circle.clientWidth * 0.5),
        y: circlePos.y - (circle.clientHeight * 0.5),
    });

    // small circle set
    smallCirclePos.vx += (mouse.x - smallCirclePos.x) * power;
    smallCirclePos.vy += (mouse.y- smallCirclePos.y) * power;
    smallCirclePos.x += (smallCirclePos.vx *= power);
    smallCirclePos.y += (smallCirclePos.vy *= power);

    TweenMax.set(smallcircle, {
        x: smallCirclePos.x - (smallcircle.clientWidth * 0.5),
        y: smallCirclePos.y - (smallcircle.clientHeight * 0.5),
    });

    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);
