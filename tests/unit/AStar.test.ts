import { describe, expect, it } from 'vitest';
import { findRegionPath } from '../../src/navigation/AStar';

describe('region A*', () => {
  it('finds the deterministic shortest connected route', () => {
    const regions = [
      { id: 'a', neighbours: ['b', 'c'], centre: { x: 0, y: 0 } },
      { id: 'b', neighbours: ['a', 'd'], centre: { x: 1, y: 0 } },
      { id: 'c', neighbours: ['a', 'd'], centre: { x: 0, y: 3 } },
      { id: 'd', neighbours: [], centre: { x: 2, y: 0 } },
    ];
    expect(findRegionPath(regions, 'a', 'd')).toEqual(['a', 'b', 'd']);
  });
});
