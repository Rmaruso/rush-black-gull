import { describe, expect, it } from 'vitest';
import { exportEditorJson, finishPolygon } from '../../src/editor/EditorModel';

describe('scene editor model', () => {
  it('finishes rounded, stable polygon records', () => {
    expect(
      finishPolygon([], 'walkbox', [
        { x: 1.2, y: 2.8 },
        { x: 10, y: 3 },
        { x: 4, y: 12 },
      ]),
    ).toEqual([
      {
        id: 'walkbox_01',
        kind: 'walkbox',
        points: [
          { x: 1, y: 3 },
          { x: 10, y: 3 },
          { x: 4, y: 12 },
        ],
      },
    ]);
  });

  it('requires three points and exports deterministic JSON', () => {
    expect(() =>
      finishPolygon([], 'hotspot', [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
      ]),
    ).toThrow(/three points/);
    expect(exportEditorJson('workshop', [])).toContain('"sceneId": "workshop"');
  });
});
