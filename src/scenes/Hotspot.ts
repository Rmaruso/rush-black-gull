import type { Point } from '../navigation/Walkbox';

export interface Hotspot {
  id: string;
  nameKey: string;
  lookKey: string;
  polygon: Point[];
}
