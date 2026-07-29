import { describe, expect, it } from 'vitest';
import { sceneSchema } from '../../src/scenes/SceneLoader';

function validScene(): Record<string, unknown> {
  const point = { x: 1, y: 1 };
  const polygon = [point, { x: 2, y: 1 }, { x: 1, y: 2 }];
  const hotspot = {
    id: 'one',
    nameKey: 'one.name',
    lookKey: 'one.look',
    polygon,
  };
  return {
    schemaVersion: 1,
    id: 'workshop',
    background: {
      kind: 'procedural',
      clearColor: '#000000',
      commands: [
        { type: 'rect', x: 0, y: 0, width: 10, height: 10, color: '#111111' },
      ],
    },
    actorStart: point,
    actor: { spriteSheetId: 'ronan', animationId: 'idle' },
    spriteSheets: [
      {
        id: 'ronan',
        frameWidth: 8,
        frameHeight: 8,
        palette: ['#ffffff'],
        frames: [
          {
            id: 'idle_0',
            parts: [{ x: 0, y: 0, width: 1, height: 1, paletteIndex: 0 }],
          },
        ],
        animations: [
          {
            id: 'idle',
            frameIds: ['idle_0'],
            frameDurationMs: 100,
            loop: true,
          },
        ],
      },
    ],
    walkboxes: [{ id: 'floor', polygon, neighbours: [] }],
    hotspots: [hotspot, { ...hotspot, id: 'two' }],
    scaleZones: [],
  };
}

describe('scene validation', () => {
  it('accepts procedural art, sprite and navigation data', () => {
    expect(sceneSchema.parse(validScene()).id).toBe('workshop');
  });

  it('rejects executable-looking or malformed scene data', () => {
    expect(() =>
      sceneSchema.parse({ ...validScene(), script: 'alert(1)' }),
    ).toThrow(/Unrecognized key/);
  });

  it('rejects actor references to missing animations', () => {
    const invalid = validScene();
    invalid.actor = { spriteSheetId: 'ronan', animationId: 'missing' };
    expect(() => sceneSchema.parse(invalid)).toThrow(/Unknown animation/);
  });

  it('rejects invalid scale depth ranges', () => {
    const invalid = validScene();
    invalid.scaleZones = [
      {
        id: 'depth',
        polygon: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 1, y: 2 },
        ],
        yNear: 10,
        yFar: 10,
        scaleNear: 0.75,
        scaleFar: 1,
      },
    ];
    expect(() => sceneSchema.parse(invalid)).toThrow(/yFar must be greater/);
  });
});
