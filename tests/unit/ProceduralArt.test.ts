import { describe, expect, it } from 'vitest';
import { actorScaleAt } from '../../src/art/ProceduralArt';
import type { Scene } from '../../src/scenes/SceneLoader';

describe('procedural art scale zones', () => {
  it('interpolates actor scale by logical baseline', () => {
    const scene = {
      scaleZones: [
        {
          id: 'depth',
          polygon: [
            { x: 0, y: 100 },
            { x: 100, y: 100 },
            { x: 100, y: 200 },
            { x: 0, y: 200 },
          ],
          yNear: 100,
          yFar: 200,
          scaleNear: 0.5,
          scaleFar: 1,
        },
      ],
    } as Scene;
    expect(actorScaleAt(scene, 50, 150)).toBe(0.75);
    expect(actorScaleAt(scene, 150, 150)).toBe(1);
  });
});
