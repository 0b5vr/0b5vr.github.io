#version 300 es

precision highp float;

in vec3 vViewPosition;

out vec4 fragColor;

void main() {
  float alpha = 0.3 * smoothstep(4.0, 2.0, -vViewPosition.z);
  fragColor = vec4(vec3(1.0), alpha);
}
