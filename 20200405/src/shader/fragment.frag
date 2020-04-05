precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform float uImageBlend;

varying vec2 vUv;

float blurColor = 0.3;

void main() {
  vec3 texture1 = texture2D(uTexture1, vUv).rgb;
  vec3 texture2 = texture2D(uTexture2, vUv).rgb;
  vec3 texture = texture1 * uImageBlend + texture2 * (1.0 - uImageBlend);

  // texture *= vec3(blurColor + (1.0 - blurColor) * uMainOpacity);

  gl_FragColor = vec4(texture, 1.0);
}