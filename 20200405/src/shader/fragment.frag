precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform sampler2D uTexture1;
uniform float uBlurOpacity;

varying vec2 vUv;

void main() {
  vec3 texture = texture2D(uTexture1, vUv).rgb;
  texture *= vec3(uBlurOpacity);
  gl_FragColor = vec4(texture, 1.0);
}