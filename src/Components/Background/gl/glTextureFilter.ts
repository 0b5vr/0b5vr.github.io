import type { GLTextureMagFilterType } from './GLTextureMagFilterType';
import type { GLTextureMinFilterType } from './GLTextureMinFilterType';
import {
  GL_TEXTURE_2D,
  GL_TEXTURE_MAG_FILTER,
  GL_TEXTURE_MIN_FILTER,
} from './glConstants';

export function glTextureFilter(
  gl: WebGL2RenderingContext,
  texture: WebGLTexture,
  mag: GLTextureMagFilterType,
  min: GLTextureMinFilterType = mag,
): WebGLTexture {
  gl.bindTexture(GL_TEXTURE_2D, texture);
  gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, mag);
  gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, min);
  gl.bindTexture(GL_TEXTURE_2D, null);

  return texture;
}
