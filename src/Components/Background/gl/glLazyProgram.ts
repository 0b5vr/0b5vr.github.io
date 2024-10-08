import { GL_COMPILE_STATUS, GL_COMPLETION_STATUS_KHR, GL_FRAGMENT_SHADER, GL_LINK_STATUS, GL_SEPARATE_ATTRIBS, GL_VERTEX_SHADER } from './glConstants';

export interface LazyProgramOptions {
  tfVaryings?: string[],

  /**
   * `gl.SEPARATE_ATTRIBS` by default
   */
  tfBufferMode?: number,
}

export function glLazyProgram(
  gl: WebGL2RenderingContext,
  vert: string,
  frag: string,
  options: LazyProgramOptions = {},
): Promise<WebGLProgram> {
  const { tfVaryings, tfBufferMode } = options;
  const extParallel = gl.getExtension( 'KHR_parallel_shader_compile' )!;

  let vertexShader: WebGLShader | undefined;
  let fragmentShader: WebGLShader | undefined;
  let program: WebGLProgram | undefined;

  try {
    // == vert =====================================================================================
    vertexShader = gl.createShader( GL_VERTEX_SHADER )!;

    gl.shaderSource( vertexShader, vert );
    gl.compileShader( vertexShader );

    if ( import.meta.env.DEV ) {
      if ( !gl.getShaderParameter( vertexShader, GL_COMPILE_STATUS ) ) {
        throw new Error( gl.getShaderInfoLog( vertexShader ) ?? undefined );
      }
    }

    // == frag =====================================================================================
    fragmentShader = gl.createShader( GL_FRAGMENT_SHADER )!;

    gl.shaderSource( fragmentShader, frag );
    gl.compileShader( fragmentShader );

    if ( import.meta.env.DEV ) {
      if ( !gl.getShaderParameter( fragmentShader, GL_COMPILE_STATUS ) ) {
        throw new Error( gl.getShaderInfoLog( fragmentShader ) ?? undefined );
      }
    }

    // == program ==================================================================================
    program = gl.createProgram()!;

    gl.attachShader( program, vertexShader );
    gl.attachShader( program, fragmentShader );

    if ( tfVaryings ) {
      gl.transformFeedbackVaryings(
        program,
        tfVaryings,
        tfBufferMode ?? GL_SEPARATE_ATTRIBS,
      );
    }

    gl.linkProgram( program );

    return new Promise( ( resolve, reject ) => {
      // if the environment doesn't support parallel shader compilation,
      // just return the program synchronously
      if ( !extParallel ) {
        resolve( program! );
        return;
      }

      const update = (): void => {
        if ( gl.getProgramParameter( program!, GL_COMPLETION_STATUS_KHR ) ) {
          if ( import.meta.env.DEV ) {
            if ( !gl.getProgramParameter( program!, GL_LINK_STATUS ) ) {
              const error = gl.getProgramInfoLog( program! )!;
              gl.deleteProgram( program! );
              reject( error );
              return;
            }
          }

          resolve( program! );
          return;
        }

        setTimeout( update, 10 );
      };
      update();
    } );
  } catch ( e ) {
    gl.deleteProgram( program! );

    return Promise.reject( e );
  } finally {
    gl.deleteShader( fragmentShader! );
    gl.deleteShader( vertexShader! );
  }
}
