import { GL_CLAMP_TO_EDGE, GL_COLOR_ATTACHMENT0, GL_COLOR_BUFFER_BIT, GL_DEPTH_ATTACHMENT, GL_DEPTH_COMPONENT24, GL_DRAW_FRAMEBUFFER, GL_FRAMEBUFFER, GL_LINEAR, GL_NEAREST, GL_READ_FRAMEBUFFER, GL_RENDERBUFFER, GL_RGBA8, GL_TEXTURE_2D } from './glConstants';
import { glTextureFilter } from './glTextureFilter';
import { glTextureWrap } from './glTextureWrap';

export function glLazyMultisampleTarget(
  gl: WebGL2RenderingContext,
  width: number,
  height: number,
  samples: number,
  internalformat: GLenum,
): {
  framebuffer: WebGLFramebuffer;
  texture: WebGLTexture;
  copy: () => void;
  dispose: () => void;
} {
  const renderbufferColor: WebGLRenderbuffer = gl.createRenderbuffer()!;
  const renderbufferDepth: WebGLRenderbuffer = gl.createRenderbuffer()!;
  const multisampleFramebuffer: WebGLFramebuffer = gl.createFramebuffer()!;
  const framebuffer: WebGLFramebuffer = gl.createFramebuffer()!;
  const texture = gl.createTexture()!;

  const dispose = (): void => {
    gl.deleteTexture( texture );
    gl.deleteRenderbuffer( renderbufferColor );
    gl.deleteRenderbuffer( renderbufferDepth );
    gl.deleteFramebuffer( multisampleFramebuffer );
    gl.deleteFramebuffer( framebuffer );
  };

  try {
    // == renderbuffer color =======================================================================
    gl.bindRenderbuffer( GL_RENDERBUFFER, renderbufferColor );
    gl.renderbufferStorageMultisample( GL_RENDERBUFFER, samples, internalformat, width, height );
    gl.bindRenderbuffer( GL_RENDERBUFFER, null );

    gl.bindFramebuffer( GL_FRAMEBUFFER, multisampleFramebuffer );
    gl.framebufferRenderbuffer(
      GL_FRAMEBUFFER,
      GL_COLOR_ATTACHMENT0,
      GL_RENDERBUFFER,
      renderbufferColor,
    );
    gl.bindFramebuffer( GL_FRAMEBUFFER, null );

    // == renderbuffer depth =======================================================================
    gl.bindRenderbuffer( GL_RENDERBUFFER, renderbufferDepth );
    gl.renderbufferStorageMultisample( GL_RENDERBUFFER, samples, GL_DEPTH_COMPONENT24, width, height );
    gl.bindRenderbuffer( GL_RENDERBUFFER, null );

    gl.bindFramebuffer( GL_FRAMEBUFFER, multisampleFramebuffer );
    gl.framebufferRenderbuffer(
      GL_FRAMEBUFFER,
      GL_DEPTH_ATTACHMENT,
      GL_RENDERBUFFER,
      renderbufferDepth,
    );
    gl.bindFramebuffer( GL_FRAMEBUFFER, null );

    // == texture ==================================================================================
    gl.bindTexture( GL_TEXTURE_2D, texture );
    gl.texStorage2D( GL_TEXTURE_2D, 1, internalformat, width, height );
    gl.bindTexture( GL_TEXTURE_2D, null );

    glTextureFilter( gl, texture, GL_LINEAR );
    glTextureWrap( gl, texture, GL_CLAMP_TO_EDGE );

    // == framebuffer ==============================================================================
    gl.bindFramebuffer( GL_FRAMEBUFFER, framebuffer );
    gl.framebufferTexture2D( GL_FRAMEBUFFER, GL_COLOR_ATTACHMENT0, GL_TEXTURE_2D, texture, 0 );
    gl.bindFramebuffer( GL_FRAMEBUFFER, null );

    // == functions ================================================================================
    const copy = (): void => {
      gl.bindFramebuffer( GL_READ_FRAMEBUFFER, multisampleFramebuffer );
      gl.bindFramebuffer( GL_DRAW_FRAMEBUFFER, framebuffer );

      gl.blitFramebuffer(
        0, 0, width, height,
        0, 0, width, height,
        GL_COLOR_BUFFER_BIT,
        GL_NEAREST,
      );

      gl.bindFramebuffer( GL_DRAW_FRAMEBUFFER, null );
      gl.bindFramebuffer( GL_READ_FRAMEBUFFER, null );
    }

    // == almost done ==============================================================================
    return {
      framebuffer: multisampleFramebuffer,
      texture,
      copy,
      dispose,
    };

  } catch ( e ) {
    dispose();
    throw e;
  }
}
