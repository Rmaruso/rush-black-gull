import type { Point } from '../navigation/Walkbox';

export type EditablePolygonKind = 'walkbox' | 'hotspot' | 'scale_zone';

export interface EditablePolygon {
  id: string;
  kind: EditablePolygonKind;
  points: Point[];
}

export interface EditorExport {
  schemaVersion: 1;
  sceneId: string;
  walkboxes: Array<{ id: string; polygon: Point[]; neighbours: string[] }>;
  hotspots: Array<{
    id: string;
    nameKey: string;
    lookKey: string;
    polygon: Point[];
  }>;
  scaleZones: Array<{
    id: string;
    polygon: Point[];
    yNear: number;
    yFar: number;
    scaleNear: number;
    scaleFar: number;
  }>;
}

export function finishPolygon(
  polygons: EditablePolygon[],
  kind: EditablePolygonKind,
  points: Point[],
): EditablePolygon[] {
  if (points.length < 3)
    throw new Error('A polygon needs at least three points.');
  const sequence =
    polygons.filter((polygon) => polygon.kind === kind).length + 1;
  return [
    ...polygons,
    {
      id: `${kind}_${String(sequence).padStart(2, '0')}`,
      kind,
      points: points.map((point) => ({
        x: Math.round(point.x),
        y: Math.round(point.y),
      })),
    },
  ];
}

export function exportEditorJson(
  sceneId: string,
  polygons: EditablePolygon[],
): string {
  const data: EditorExport = {
    schemaVersion: 1,
    sceneId,
    walkboxes: polygons
      .filter((polygon) => polygon.kind === 'walkbox')
      .map(({ id, points }) => ({ id, polygon: points, neighbours: [] })),
    hotspots: polygons
      .filter((polygon) => polygon.kind === 'hotspot')
      .map(({ id, points }) => ({
        id,
        nameKey: `hotspot.${id}.name`,
        lookKey: `hotspot.${id}.look`,
        polygon: points,
      })),
    scaleZones: polygons
      .filter((polygon) => polygon.kind === 'scale_zone')
      .map(({ id, points }) => {
        const ys = points.map((point) => point.y);
        return {
          id,
          polygon: points,
          yNear: Math.min(...ys),
          yFar: Math.max(...ys),
          scaleNear: 0.75,
          scaleFar: 1.1,
        };
      }),
  };
  return `${JSON.stringify(data, null, 2)}\n`;
}
