precision highp float;

attribute vec3 position;
attribute vec2 uv;

uniform vec2 uResolution;
uniform float uTime;

varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 pos = position;

  gl_Position = vec4(position, 1.0);
}