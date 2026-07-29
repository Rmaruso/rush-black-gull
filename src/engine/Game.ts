import { ActorMovement } from '../navigation/ActorMovement';
import {
  nearestPointInPolygon,
  pointInPolygon,
  type Point,
} from '../navigation/Walkbox';
import { Renderer } from '../rendering/Renderer';
import type { Scene } from '../scenes/SceneLoader';
import type { I18n } from '../localization/I18n';
import { PointerInput } from '../input/PointerInput';
import { VerbPanel } from '../ui/VerbPanel';
import { Clock } from './Clock';
import { EventBus } from './EventBus';

export class Game {
  private readonly renderer: Renderer;
  private readonly actor: ActorMovement;
  private readonly verbs: VerbPanel;
  private readonly clock: Clock;
  readonly events = new EventBus();

  constructor(
    container: HTMLElement,
    verbElement: HTMLElement,
    private readonly scene: Scene,
    private readonly i18n: I18n,
  ) {
    this.renderer = new Renderer(container);
    this.actor = new ActorMovement(scene.actorStart);
    this.verbs = new VerbPanel(verbElement);
    new PointerInput(this.renderer.canvas, (point) =>
      this.handlePointer(point),
    );
    this.clock = new Clock((seconds) => {
      this.actor.update(seconds);
      this.renderer.draw(this.scene, this.actor);
    });
  }

  start(): void {
    this.clock.start();
  }

  private handlePointer(point: Point): void {
    if (this.verbs.selected === 'look') {
      const hotspot = this.scene.hotspots.find((candidate) =>
        pointInPolygon(point, candidate.polygon),
      );
      this.events.emit(
        'message',
        hotspot ? this.i18n.t(hotspot.lookKey) : this.i18n.t('look.nothing'),
      );
      return;
    }
    this.actor.moveTo(
      nearestPointInPolygon(point, this.scene.walkboxes[0].polygon),
    );
  }
}
