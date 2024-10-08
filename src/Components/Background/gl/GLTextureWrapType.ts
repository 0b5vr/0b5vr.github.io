import { GL_CLAMP_TO_EDGE, GL_MIRRORED_REPEAT, GL_REPEAT } from './glConstants';

export type GLTextureWrapType =
  | typeof GL_REPEAT
  | typeof GL_CLAMP_TO_EDGE
  | typeof GL_MIRRORED_REPEAT;
