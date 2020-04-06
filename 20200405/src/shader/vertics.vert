precision highp float;

#pragma glslify: snoise = require('./util/noise3D.frag')

attribute vec3 position;
attribute vec2 uv;

uniform vec2 uResolution;
uniform float uTime;

varying vec2 vUv;
varying float vWave;

void main() {
  vUv = uv;

  vec3 pos = position;
  float noiseFreq = 1.5;
  float noiseAmp = 0.01;
  vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
  pos.z += snoise(noisePos) * noiseAmp;
  vWave = pos.z;

  gl_Position = vec4(position, 1.0);
}