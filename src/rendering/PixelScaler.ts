export const LOGICAL_WIDTH = 320;
export const LOGICAL_HEIGHT = 200;

export interface CanvasLayout {
  scale: number;
  left: number;
  top: number;
  width: number;
  height: number;
}

export function calculateLayout(
  containerWidth: number,
  containerHeight: number,
): CanvasLayout {
  const scale = Math.max(
    1,
    Math.floor(
      Math.min(
        containerWidth / LOGICAL_WIDTH,
        containerHeight / LOGICAL_HEIGHT,
      ),
    ),
  );
  const width = LOGICAL_WIDTH * scale;
  const height = LOGICAL_HEIGHT * scale;
  return {
    scale,
    width,
    height,
    left: Math.floor((containerWidth - width) / 2),
    top: Math.floor((containerHeight - height) / 2),
  };
}

export function screenToLogical(
  clientX: number,
  clientY: number,
  canvasRect: Pick<DOMRect, 'left' | 'top' | 'width' | 'height'>,
): { x: number; y: number } {
  return {
    x: Math.max(
      0,
      Math.min(
        LOGICAL_WIDTH - 1,
        ((clientX - canvasRect.left) * LOGICAL_WIDTH) / canvasRect.width,
      ),
    ),
    y: Math.max(
      0,
      Math.min(
        LOGICAL_HEIGHT - 1,
        ((clientY - canvasRect.top) * LOGICAL_HEIGHT) / canvasRect.height,
      ),
    ),
  };
}
