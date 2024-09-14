import { GL_LINEAR, GL_NEAREST } from './glConstants';

export type GLTextureMagFilterType =
  | typeof GL_NEAREST
  | typeof GL_LINEAR;
