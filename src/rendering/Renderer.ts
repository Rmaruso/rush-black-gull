import type { ActorMovement } from '../navigation/ActorMovement';
import type { Scene } from '../scenes/SceneLoader';
import { calculateLayout, LOGICAL_HEIGHT, LOGICAL_WIDTH } from './PixelScaler';

export class Renderer {
  readonly canvas = document.createElement('canvas');
  private readonly context: CanvasRenderingContext2D;

  constructor(private readonly container: HTMLElement) {
    this.canvas.width = LOGICAL_WIDTH;
    this.canvas.height = LOGICAL_HEIGHT;
    this.canvas.setAttribute('aria-label', 'Workshop game view');
    const context = this.canvas.getContext('2d');
    if (!context) throw new Error('Canvas 2D is unavailable.');
    this.context = context;
    this.context.imageSmoothingEnabled = false;
    this.container.append(this.canvas);
    new ResizeObserver(() => this.resize()).observe(container);
    this.resize();
  }

  resize(): void {
    const layout = calculateLayout(
      this.container.clientWidth,
      this.container.clientHeight,
    );
    Object.assign(this.canvas.style, {
      width: `${layout.width}px`,
      height: `${layout.height}px`,
      left: `${layout.left}px`,
      top: `${layout.top}px`,
    });
  }

  draw(scene: Scene, actor: ActorMovement): void {
    const ctx = this.context;
    ctx.fillStyle = scene.background.wall;
    ctx.fillRect(0, 0, 320, 142);
    ctx.fillStyle = scene.background.floor;
    ctx.fillRect(0, 142, 320, 58);

    // Original geometric workshop placeholders.
    ctx.fillStyle = '#25343c';
    ctx.fillRect(22, 34, 72, 72);
    ctx.fillStyle = '#bb9a54';
    ctx.fillRect(18, 106, 102, 10);
    ctx.fillRect(28, 116, 7, 40);
    ctx.fillRect(106, 116, 7, 40);
    ctx.fillStyle = '#414d52';
    ctx.fillRect(244, 18, 54, 72);
    ctx.fillStyle = '#a7b9ba';
    ctx.fillRect(250, 24, 42, 6);

    const x = Math.round(actor.position.x);
    const y = Math.round(actor.position.y);
    ctx.fillStyle = '#17202a';
    ctx.fillRect(x - 4, y - 20, 8, 8);
    ctx.fillStyle = '#d07949';
    ctx.fillRect(x - 5, y - 12, 10, 9);
    ctx.fillStyle = '#263c53';
    ctx.fillRect(x - 5, y - 3, 4, 8);
    ctx.fillRect(x + 1, y - 3, 4, 8);
  }
}
