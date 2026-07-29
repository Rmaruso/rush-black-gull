import { screenToLogical } from '../rendering/PixelScaler';
import type { Point } from '../navigation/Walkbox';

export class PointerInput {
  constructor(canvas: HTMLCanvasElement, handler: (point: Point) => void) {
    canvas.addEventListener('click', (event) => {
      handler(
        screenToLogical(
          event.clientX,
          event.clientY,
          canvas.getBoundingClientRect(),
        ),
      );
    });
  }
}
