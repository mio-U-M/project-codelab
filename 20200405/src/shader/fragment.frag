precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform sampler2D uTexture1;

varying vec2 vUv;

void main() {
  vec3 texture = texture2D(uTexture1, vUv).rgb;
  gl_FragColor = vec4(texture, 1.0);
}