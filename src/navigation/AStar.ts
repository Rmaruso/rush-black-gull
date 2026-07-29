export interface NavigationRegion {
  id: string;
  neighbours: string[];
  centre: { x: number; y: number };
}

const distance = (a: NavigationRegion, b: NavigationRegion): number =>
  Math.hypot(a.centre.x - b.centre.x, a.centre.y - b.centre.y);

export function findRegionPath(
  regions: NavigationRegion[],
  startId: string,
  destinationId: string,
): string[] {
  const byId = new Map(regions.map((region) => [region.id, region]));
  const destination = byId.get(destinationId);
  if (!byId.has(startId) || !destination) return [];
  const open = new Set([startId]);
  const cameFrom = new Map<string, string>();
  const costs = new Map([[startId, 0]]);

  while (open.size > 0) {
    const currentId = [...open].sort(
      (a, b) =>
        (costs.get(a) ?? Infinity) +
        distance(byId.get(a)!, destination) -
        ((costs.get(b) ?? Infinity) + distance(byId.get(b)!, destination)),
    )[0];
    if (currentId === destinationId) {
      const path = [currentId];
      while (cameFrom.has(path[0])) path.unshift(cameFrom.get(path[0])!);
      return path;
    }
    open.delete(currentId);
    const current = byId.get(currentId)!;
    current.neighbours.forEach((neighbourId) => {
      const neighbour = byId.get(neighbourId);
      if (!neighbour) return;
      const nextCost =
        (costs.get(currentId) ?? Infinity) + distance(current, neighbour);
      if (nextCost < (costs.get(neighbourId) ?? Infinity)) {
        costs.set(neighbourId, nextCost);
        cameFrom.set(neighbourId, currentId);
        open.add(neighbourId);
      }
    });
  }
  return [];
}
