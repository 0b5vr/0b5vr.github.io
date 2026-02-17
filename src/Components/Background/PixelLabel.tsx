import { useCallback, useMemo, useState } from 'react';
import { useResize } from './utils/useResize';

// == constants ====================================================================================
const charTable =
  '000001110155000avavau5ekfh842h61m9m110006111634443le4el44v440001100v0000001g8421vhlhv32222vgv1vvgvgvhhvggv1vgvv1vhvvggggvhvhvvhvgv0101001011421240v0v012421vhs0400000vhvhhf9vhvv111vfhhhfv1v1vv1f11v1thvhhvhh11111ggghvh979h1111vvllllvhhhhvhhhvvhv11vhhpvvhv9hv1vgvv4444hhhhvhhha4llllvha4ahhhvgvv842v711171248g744474ah000000v12000vhvhhf9vhvv111vfhhhfv1v1vv1f11v1thvhhvhh11111ggghvh979h1111vvllllvhhhhvhhhvvhv11vhhpvvhv9hv1vgvv4444hhhhvhhha4llllvha4ahhhvgvv842v62326111113262302l80';
//                 SP   !    "    #    $    %    &    '    (    )    *    +    ,    -    .    /    0    1    2    3    4    5    6    7    8    9    :    ;    <    =    >    ?    @    A    B    C    D    E    F    G    H    I    J    K    L    M    N    O    P    Q    R    S    T    U    V    W    X    Y    Z    [    \    ]    ^    _    `    a    b    c    d    e    f    g    h    i    j    k    l    m    n    o    p    q    r    s    t    u    v    w    x    y    z    {    |    }    ~

const charWidthTable =
  '21355551335515155255555555113535555555555155555555555555555353552555555551555555555555555553135';
//                       !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~

// == functions ====================================================================================
function charToIndex(char: string): number {
  const index = char.charCodeAt(0) - 32;
  if (index < 0 || index >= charWidthTable.length) {
    return 31; // ?
  }
  return index;
}

function calcTotalWidth(text: string): number {
  const chars = [...text];
  const indices = chars.map(charToIndex);

  let totalWidth = 0;
  for (let i = 0; i < indices.length; i++) {
    const index = indices[i];
    totalWidth += parseInt(charWidthTable[index], 10) + 1;
  }
  totalWidth -= 1;

  return totalWidth;
}

function drawText(canvas: HTMLCanvasElement, text: string): void {
  const context = canvas.getContext('2d');
  if (context == null) {
    return;
  }

  const chars = [...text];
  const indices = chars.map(charToIndex);

  // set size
  const width = calcTotalWidth(text);
  const height = 5;

  canvas.width = width;
  canvas.height = height;

  // let's do this
  const data = context.getImageData(0, 0, width, height);

  let currentX = 0;
  for (let iChar = 0; iChar < indices.length; iChar++) {
    const index = indices[iChar];
    const charWidth = parseInt(charWidthTable[index], 10);
    for (let y = 0; y < 5; y++) {
      const row = parseInt(charTable[index * 5 + y], 32);
      for (let x = 0; x < charWidth; x++) {
        if (((row >> x) & 1) === 1) {
          const px = currentX + x;
          const py = y;
          const offset = (py * width + px) * 4;
          data.data[offset + 0] = 255;
          data.data[offset + 1] = 255;
          data.data[offset + 2] = 255;
          data.data[offset + 3] = 255;
        }
      }
    }
    currentX += charWidth + 1;
  }

  context.putImageData(data, 0, 0);
}

// == component ====================================================================================
export function PixelLabel({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const totalWidth = useMemo(() => calcTotalWidth(text), [text]);

  const [dpr, setDpr] = useState(devicePixelRatio);
  useResize(() => {
    setDpr(devicePixelRatio);
  });
  const ratio = useMemo(() => Math.max(1.0, Math.round(dpr)) / dpr, [dpr]);

  const refCanvas = useCallback(
    (canvas: HTMLCanvasElement | null) => {
      if (canvas == null) {
        return;
      }

      drawText(canvas, text);
    },
    [text],
  );

  return (
    <canvas
      ref={refCanvas}
      className={className}
      style={{
        width: `${ratio * totalWidth}px`,
        imageRendering: 'pixelated',
      }}
    />
  );
}
