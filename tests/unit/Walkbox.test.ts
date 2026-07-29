import { describe, expect, it } from 'vitest';
import {
  nearestPointInPolygon,
  pointInPolygon,
} from '../../src/navigation/Walkbox';

const square = [
  { x: 0, y: 0 },
  { x: 10, y: 0 },
  { x: 10, y: 10 },
  { x: 0, y: 10 },
];

describe('walkbox geometry', () => {
  it('detects points inside and outside a polygon', () => {
    expect(pointInPolygon({ x: 5, y: 5 }, square)).toBe(true);
    expect(pointInPolygon({ x: 12, y: 5 }, square)).toBe(false);
  });

  it('projects an invalid point to the nearest polygon edge', () => {
    expect(nearestPointInPolygon({ x: 15, y: 6 }, square)).toEqual({
      x: 10,
      y: 6,
    });
  });
});
