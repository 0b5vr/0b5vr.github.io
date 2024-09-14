import { GL_COLOR_BUFFER_BIT, GL_DEPTH_BUFFER_BIT } from './glConstants';

export function glClear(
  gl: WebGL2RenderingContext,
  color: [number, number, number, number] | false = [0.0, 0.0, 0.0, 1.0],
  depth: number | false = 1.0
): void {
  let bit = 0;

  if (color !== false) {
    gl.clearColor(color[0], color[1], color[2], color[3]);
    bit |= GL_COLOR_BUFFER_BIT;
  }

  if (depth !== false) {
    gl.clearDepth(depth);
    gl.depthMask(true);
    bit |= GL_DEPTH_BUFFER_BIT;
  }

  gl.clear(bit);
}
