export interface Point {
  x: number;
  y: number;
}

export function pointInPolygon(point: Point, polygon: Point[]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const a = polygon[i];
    const b = polygon[j];
    const crosses =
      a.y > point.y !== b.y > point.y &&
      point.x < ((b.x - a.x) * (point.y - a.y)) / (b.y - a.y) + a.x;
    if (crosses) inside = !inside;
  }
  return inside;
}

function nearestOnSegment(point: Point, a: Point, b: Point): Point {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const lengthSquared = dx * dx + dy * dy;
  const t =
    lengthSquared === 0
      ? 0
      : Math.max(
          0,
          Math.min(
            1,
            ((point.x - a.x) * dx + (point.y - a.y) * dy) / lengthSquared,
          ),
        );
  return { x: a.x + t * dx, y: a.y + t * dy };
}

export function nearestPointInPolygon(point: Point, polygon: Point[]): Point {
  if (pointInPolygon(point, polygon)) return point;
  let nearest = polygon[0];
  let shortest = Number.POSITIVE_INFINITY;
  polygon.forEach((start, index) => {
    const candidate = nearestOnSegment(
      point,
      start,
      polygon[(index + 1) % polygon.length],
    );
    const distance =
      (candidate.x - point.x) ** 2 + (candidate.y - point.y) ** 2;
    if (distance < shortest) {
      shortest = distance;
      nearest = candidate;
    }
  });
  return nearest;
}
