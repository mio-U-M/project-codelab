precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform float uImageBlend;
uniform float uWaveImpact;

varying vec2 vUv;
varying float vWave;

float blurColor = 0.3;


void main() {
  float wave = vWave * uWaveImpact;

  vec3 texture1 = texture2D(uTexture1, vUv + wave ).rgb;
  vec3 texture2 = texture2D(uTexture2, vUv + wave).rgb;
  vec3 texture = texture1 * uImageBlend + texture2 * (1.0 - uImageBlend);


  gl_FragColor = vec4(texture, 1.0);
}