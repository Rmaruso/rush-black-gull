import type { ActorMovement } from '../navigation/ActorMovement';
import type { Scene } from '../scenes/SceneLoader';
import {
  actorScaleAt,
  drawProceduralBackground,
  drawSpriteFrame,
} from '../art/ProceduralArt';
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
    drawProceduralBackground(ctx, scene.background);
    const sheet = scene.spriteSheets.find(
      (candidate) => candidate.id === scene.actor.spriteSheetId,
    );
    if (!sheet)
      throw new Error(
        `Sprite sheet "${scene.actor.spriteSheetId}" is unavailable.`,
      );
    const animation = sheet.animations.find(
      (candidate) => candidate.id === scene.actor.animationId,
    );
    if (!animation)
      throw new Error(`Animation "${scene.actor.animationId}" is unavailable.`);
    drawSpriteFrame(
      ctx,
      sheet,
      animation.frameIds[0],
      actor.position.x,
      actor.position.y,
      actorScaleAt(scene, actor.position.x, actor.position.y),
    );
  }
}
