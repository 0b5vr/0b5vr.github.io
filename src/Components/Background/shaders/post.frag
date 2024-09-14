#version 300 es

#define repeat(i, n) for (int i = 0; i < n; i++)
#define saturate(x) clamp(x, 0.0, 1.0)

precision highp float;

const int ZOOM_ITER = 10;

const float TIME_OFFSET = -1.0;

const vec3 LUMA = vec3(0.2126, 0.7152, 0.0722);

const vec4 COLOR_LIFT = vec4(0.0, 0.0, 0.0, 0.02);
const vec4 COLOR_GAMMA = vec4(0.0, 0.01, 0.03, 0.0);
const vec4 COLOR_GAIN = vec4(1.0, 1.0, 1.0, 1.0);

uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D uTexture;

in vec2 vUv;

out vec4 fragColor;

uvec3 hash3u(uvec3 v) {
  v = v * 1145141919u + 1919810u;
  v.x += v.y * v.z;
  v.y += v.z * v.x;
  v.z += v.x * v.y;
  v ^= v >> 16u;
  v.x += v.y * v.z;
  v.y += v.z * v.x;
  v.z += v.x * v.y;
  return v;
}

vec3 hash3f(vec3 v) {
  uvec3 r = hash3u(floatBitsToUint(v));
  return vec3(r) / float(-1u);
}

uvec3 seed;
vec3 random3() {
  seed = hash3u(seed);
  return vec3(seed) / float(-1u);
}

vec2 cis(float t) {
  return vec2(cos(t), sin(t));
}

vec3 gradient(float x) {
  return 3.0 * smoothstep(
    0.0,
    1.0,
    1.0 - 3.0 * abs(vec3(1.0, 1.5, 2.0) / 3.0 - x)
  );
}

vec2 uniformInCircle(vec2 xi) {
  return sqrt(xi.x) * cis(xi.y);
}

vec3 liftGammaGain(vec3 rgb) {
  vec4 liftt = 1.0 - pow(1.0 - COLOR_LIFT, log2(COLOR_GAIN + 1.0));

  vec4 gammat = COLOR_GAMMA.rgba - vec4(0.0, 0.0, 0.0, dot(LUMA, COLOR_GAMMA.rgb));
  vec4 gammatTemp = 1.0 + 4.0 * abs(gammat);
  gammat = mix(gammatTemp, 1.0 / gammatTemp, step(0.0, gammat));

  vec3 col = rgb;
  float luma = dot(LUMA, col);

  col = pow(col, gammat.rgb);
  col *= pow(COLOR_GAIN.rgb, gammat.rgb);
  col = max(mix(2.0 * liftt.rgb, vec3(1.0), col), 0.0);

  luma = pow(luma, gammat.a);
  luma *= pow(COLOR_GAIN.a, gammat.a);
  luma = max(mix(2.0 * liftt.a, 1.0, luma), 0.0);

  col += luma - dot(LUMA, col);

  return saturate(col);
}

void main() {
  vec2 p = 2.0 * vUv - 1.0;
  p.x *= uResolution.x / uResolution.y;
  float len = length(p);

  seed = floatBitsToUint(vec3(vUv, uTime));
  seed = uvec3(1000.0 * vec3(vUv, uTime));

  vec3 col = vec3(0.0);

  // -- barrel zoom --------------------------------------------------------------------------------
  float zoomAmp = 0.03;
  float zoomOutsideAmp = 0.03;
  float zoomOutsideOffset = 0.0;

  repeat(i, ZOOM_ITER) {
    float fi = float(i);

    float phase = (fi + random3().x) / float(ZOOM_ITER);

    float scaleAmp = (zoomOutsideAmp * len + zoomAmp) * phase + zoomOutsideOffset * len;
    vec2 pt = (1.0 - scaleAmp) * p;

    pt += 0.5 * exp(-1.0 * (uTime + TIME_OFFSET)) * uniformInCircle(random3().xy);

    vec2 uvt = pt;
    uvt.x *= uResolution.y / uResolution.x;
    uvt = 0.5 * uvt + 0.5;

    if (abs(uvt.x - 0.5) < 0.5 && abs(uvt.y - 0.5) < 0.5) {
      col += texture(uTexture, uvt).xyz * gradient(phase) / float(ZOOM_ITER);
    }
  }

  // -- vignette -----------------------------------------------------------------------------------
  col *= saturate(1.0 - 0.2 * length(p));

  // -- color grading ------------------------------------------------------------------------------
  col = liftGammaGain(col);

  // -- output -------------------------------------------------------------------------------------
  col *= smoothstep(0.0, 2.0, uTime + TIME_OFFSET);
  fragColor = vec4(col, 1.0);
}
