#version 300 es

#define repeat(i, n) for (int i = 0; i < n; i++)

const float PI = acos(-1.0);
const float TAU = 2.0 * PI;

uniform float uTime;
uniform float uScrollPos;
uniform vec2 uResolution;

layout(location = 0) in float x;
layout(location = 1) in float y;

out vec3 vViewPosition;

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

vec3 uniformSphere(vec2 xi) {
  float phi = xi.x * TAU;
  float sinTheta = 1.0 - 2.0 * xi.y;
  float cosTheta = sqrt(1.0 - sinTheta * sinTheta);

  return vec3(
    cosTheta * cos(phi),
    cosTheta * sin(phi),
    sinTheta
  );
}

mat2 rotate2D(float t) {
  float c = cos(t);
  float s = sin(t);
  return mat2(c, s, -s, c);
}

float perlin3(vec3 p) {
  vec3 i = floor(p);
  vec3 f = p - i;
  vec3 fs = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);

  vec3 d000 = uniformSphere(hash3f(i + vec3(0, 0, 0)).xy);
  vec3 d100 = uniformSphere(hash3f(i + vec3(1, 0, 0)).xy);
  vec3 d010 = uniformSphere(hash3f(i + vec3(0, 1, 0)).xy);
  vec3 d110 = uniformSphere(hash3f(i + vec3(1, 1, 0)).xy);
  vec3 d001 = uniformSphere(hash3f(i + vec3(0, 0, 1)).xy);
  vec3 d101 = uniformSphere(hash3f(i + vec3(1, 0, 1)).xy);
  vec3 d011 = uniformSphere(hash3f(i + vec3(0, 1, 1)).xy);
  vec3 d111 = uniformSphere(hash3f(i + vec3(1, 1, 1)).xy);

  float v000 = dot(d000, f - vec3(0, 0, 0));
  float v100 = dot(d100, f - vec3(1, 0, 0));
  float v010 = dot(d010, f - vec3(0, 1, 0));
  float v110 = dot(d110, f - vec3(1, 1, 0));
  float v001 = dot(d001, f - vec3(0, 0, 1));
  float v101 = dot(d101, f - vec3(1, 0, 1));
  float v011 = dot(d011, f - vec3(0, 1, 1));
  float v111 = dot(d111, f - vec3(1, 1, 1));

  return mix(
    mix(
      mix(v000, v100, fs.x),
      mix(v010, v110, fs.x),
      fs.y
    ),
    mix(
      mix(v001, v101, fs.x),
      mix(v011, v111, fs.x),
      fs.y
    ),
    fs.z
  );
}

vec4 perspective(vec3 pos) {
  const float FAR = 20.0;
  const float NEAR = 0.1;
  const float INV_TAN_FOV = 1.0 / tan(PI / 8.0);

  float aspect = uResolution.x / uResolution.y;

  return vec4(pos, 1.0) * vec4(
    INV_TAN_FOV / aspect,
    INV_TAN_FOV,
    -(FAR + NEAR) / (FAR - NEAR),
    0.0
  ) + vec4(
    0.0,
    0.0,
    -(2.0 * FAR * NEAR) / (FAR - NEAR),
    -pos.z
  );
}

void main() {
  float aspect = uResolution.x / uResolution.y;

  vec3 position = vec3(x, y, 0.0);
  position.x += 0.02 * (hash3f(vec3(y)).x - 0.5);
  position *= 1.5;
  position.x *= aspect;

  vec3 pp = position;
  pp.yz *= rotate2D(0.2);

  repeat(i, 3) {
    float fi = float(i);
    float amp = 0.5 / exp2(fi);
    float freq = 0.7 * exp2(fi);
    vec3 off = vec3(0.0, -uScrollPos, fi + 0.4 * uTime);

    position += amp * vec3(
      perlin3(freq * pp.xyz + off),
      perlin3(freq * pp.xyz + off + 4.0),
      perlin3(freq * pp.xyz + off + 8.0)
    );
  }

  position.yz *= rotate2D(0.4);

  position.z -= 2.0;

  vViewPosition = position;

  gl_Position = perspective(position);
}
