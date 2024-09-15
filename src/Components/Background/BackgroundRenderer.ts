import { arraySerial, TRIANGLE_STRIP_QUAD } from '@0b5vr/experimental';
import { glCreateVertexbuffer } from './gl/glCreateVertexBuffer';
import { glVertexArrayBindVertexbuffer } from './gl/glVertexArrayBindVertexbuffer';
import { glLazyProgram } from './gl/glLazyProgram';
import linesVert from './shaders/lines.vert?raw';
import quadVert from './shaders/quad.vert?raw';
import whiteFrag from './shaders/white.frag?raw';
import postFrag from './shaders/post.frag?raw';
import { glLazyMultisampleTarget } from './gl/glLazyMultisampleTarget';
import { GL_BLEND, GL_FRAMEBUFFER, GL_ONE, GL_ONE_MINUS_SRC_ALPHA, GL_SRC_ALPHA, GL_ZERO } from './gl/glConstants';
import { glClear } from './gl/glClear';

const LINE_SEGMENTS = 256;
const LINE_COUNT = 128;

export class BackgroundRenderer {
  public scrollPos: number;

  private _time;

  private readonly _canvas: HTMLCanvasElement;
  private readonly _gl: WebGL2RenderingContext;

  private readonly _vaoLines: WebGLVertexArrayObject;
  private readonly _vaoQuad: WebGLVertexArrayObject;

  private _target: ReturnType<typeof glLazyMultisampleTarget>;

  private _programLines?: WebGLProgram | null;
  private _programPost?: WebGLProgram | null;

  public constructor(canvas: HTMLCanvasElement) {
    this.scrollPos = 0;

    this._time = 0;

    this._canvas = canvas;

    this._gl = canvas.getContext('webgl2')!;
    this._gl.enable(GL_BLEND);

    this._target = glLazyMultisampleTarget(this._gl, this._canvas.width, this._canvas.height, 4, this._gl.RGBA8);

    this._vaoQuad = this._createVAOQuad();
    this._vaoLines = this._createVAOLines();

    this._createProgramLines().then((program) => {
      this._programLines = program;
    });
    this._createProgramPost().then((program) => {
      this._programPost = program;
    });
  }

  public render(delta: number): void {
    this._time += delta;

    this._renderLines();
    this._target.copy();
    this._renderPost();
  }

  public resize(width: number, height: number): void {
    this._canvas.width = width;
    this._canvas.height = height;

    this._target = glLazyMultisampleTarget(this._gl, this._canvas.width, this._canvas.height, 4, this._gl.RGBA8);
  }

  private _createVAOLines(): WebGLVertexArrayObject {
    const gl = this._gl;

    const vao = gl.createVertexArray()!;

    const bufferInstanceSegments = glCreateVertexbuffer(gl, new Float32Array(
      arraySerial(LINE_SEGMENTS).map((v) => (v / (LINE_SEGMENTS - 1) * 2.0 - 1.0))
    ));
    const bufferInstanceCount = glCreateVertexbuffer(gl, new Float32Array(
      arraySerial(LINE_COUNT).map((v) => (v / (LINE_COUNT - 1) * 2.0 - 1.0))
    ));

    glVertexArrayBindVertexbuffer(gl, vao, bufferInstanceSegments, 0, 1);
    glVertexArrayBindVertexbuffer(gl, vao, bufferInstanceCount, 1, 1, 1);

    return vao;
  }

  private _createVAOQuad(): WebGLVertexArrayObject {
    const gl = this._gl;

    const vao = gl.createVertexArray()!;

    const source = new Float32Array(TRIANGLE_STRIP_QUAD);
    const buffer = glCreateVertexbuffer(gl, source);

    glVertexArrayBindVertexbuffer(gl, vao, buffer, 0, 2);

    return vao;
  }

  private _createProgramLines(): Promise<WebGLProgram> {
    return glLazyProgram(this._gl, linesVert, whiteFrag);
  }

  private _createProgramPost(): Promise<WebGLProgram> {
    return glLazyProgram(this._gl, quadVert, postFrag);
  }

  private _renderLines(): void {
    const gl = this._gl;

    if (this._programLines == null) { return; }

    gl.bindFramebuffer(GL_FRAMEBUFFER, this._target.framebuffer);
    gl.viewport(0, 0, this._canvas.width, this._canvas.height);
    glClear(gl, [0.0, 0.0, 0.0, 0.0], 1.0);

    gl.useProgram(this._programLines);
    gl.blendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
    gl.bindVertexArray(this._vaoLines);

    gl.uniform1f(
      gl.getUniformLocation(this._programLines, 'uTime'),
      this._time,
    );
    gl.uniform1f(
      gl.getUniformLocation(this._programLines, 'uScrollPos'),
      this.scrollPos,
    )
    gl.uniform2f(
      gl.getUniformLocation(this._programLines, 'uResolution'),
      this._canvas.width,
      this._canvas.height,
    );

    gl.drawArraysInstanced(gl.LINE_STRIP, 0, LINE_SEGMENTS, LINE_COUNT);
  }

  private _renderPost(): void {
    const gl = this._gl;

    if (this._programPost == null) { return; }

    gl.bindFramebuffer(GL_FRAMEBUFFER, null);
    gl.viewport(0, 0, this._canvas.width, this._canvas.height);

    gl.useProgram(this._programPost);
    gl.blendFunc(GL_ONE, GL_ZERO);
    gl.bindVertexArray(this._vaoQuad);

    gl.uniform1f(
      gl.getUniformLocation(this._programPost, 'uTime'),
      this._time,
    );
    gl.uniform2f(
      gl.getUniformLocation(this._programPost, 'uResolution'),
      this._canvas.width,
      this._canvas.height,
    );

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this._target.texture);
    gl.uniform1i(gl.getUniformLocation(this._programPost, 'uTexture'), 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}
