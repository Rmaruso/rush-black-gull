import { describe, expect, it } from 'vitest';
import { sceneSchema } from '../../src/scenes/SceneLoader';

describe('scene validation', () => {
  it('accepts a minimal valid workshop scene', () => {
    const point = { x: 1, y: 1 };
    const polygon = [point, { x: 2, y: 1 }, { x: 1, y: 2 }];
    const hotspot = {
      id: 'one',
      nameKey: 'one.name',
      lookKey: 'one.look',
      polygon,
    };
    expect(
      sceneSchema.parse({
        schemaVersion: 1,
        id: 'workshop',
        background: { wall: '#000', floor: '#111' },
        actorStart: point,
        walkboxes: [{ id: 'floor', polygon, neighbours: [] }],
        hotspots: [hotspot, { ...hotspot, id: 'two' }],
      }).id,
    ).toBe('workshop');
  });

  it('rejects executable-looking or malformed scene data', () => {
    expect(() =>
      sceneSchema.parse({ id: 'workshop', script: 'alert(1)' }),
    ).toThrow();
  });
});
