import { describe, expect, it } from 'vitest';
import {
  calculateLayout,
  screenToLogical,
} from '../../src/rendering/PixelScaler';

describe('pixel scaling', () => {
  it('uses the largest fitting integer scale and centres the canvas', () => {
    expect(calculateLayout(1000, 700)).toEqual({
      scale: 3,
      width: 960,
      height: 600,
      left: 20,
      top: 50,
    });
  });

  it('converts letterboxed screen coordinates to logical coordinates', () => {
    expect(
      screenToLogical(500, 350, { left: 20, top: 50, width: 960, height: 600 }),
    ).toEqual({
      x: 160,
      y: 100,
    });
  });
});
