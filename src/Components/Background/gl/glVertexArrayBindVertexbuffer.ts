import { GL_ARRAY_BUFFER, GL_FLOAT } from './glConstants';

export function glVertexArrayBindVertexbuffer(
  gl: WebGL2RenderingContext,
  vertexArray: WebGLVertexArrayObject,
  buffer: WebGLBuffer,
  location: number,
  size: number,
  divisor = 0,
  stride = 0,
  offset = 0,
): void {
  gl.bindVertexArray(vertexArray);

  gl.bindBuffer(GL_ARRAY_BUFFER, buffer);
  gl.enableVertexAttribArray(location);
  gl.vertexAttribPointer(location, size, GL_FLOAT, false, stride, offset);
  gl.vertexAttribDivisor(location, divisor);

  gl.bindVertexArray(null);
}
