export class Clock {
  private previous = 0;
  private frame = 0;

  constructor(private readonly update: (seconds: number) => void) {}

  start(): void {
    this.previous = performance.now();
    const tick = (now: number): void => {
      const elapsed = Math.min((now - this.previous) / 1000, 0.1);
      this.previous = now;
      this.update(elapsed);
      this.frame = requestAnimationFrame(tick);
    };
    this.frame = requestAnimationFrame(tick);
  }

  stop(): void {
    cancelAnimationFrame(this.frame);
  }
}
