import type { Point } from './Walkbox';

export class ActorMovement {
  readonly position: Point;
  private target: Point | null = null;

  constructor(
    initial: Point,
    private readonly speed = 48,
  ) {
    this.position = { ...initial };
  }

  moveTo(target: Point): void {
    this.target = { ...target };
  }

  update(seconds: number): void {
    if (!this.target) return;
    const dx = this.target.x - this.position.x;
    const dy = this.target.y - this.position.y;
    const remaining = Math.hypot(dx, dy);
    const travel = this.speed * seconds;
    if (remaining <= travel) {
      Object.assign(this.position, this.target);
      this.target = null;
      return;
    }
    this.position.x += (dx / remaining) * travel;
    this.position.y += (dy / remaining) * travel;
  }
}
