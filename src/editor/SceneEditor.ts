import { drawProceduralBackground } from '../art/ProceduralArt';
import type { I18n } from '../localization/I18n';
import type { Point } from '../navigation/Walkbox';
import { screenToLogical } from '../rendering/PixelScaler';
import type { Scene } from '../scenes/SceneLoader';
import {
  exportEditorJson,
  finishPolygon,
  type EditablePolygon,
  type EditablePolygonKind,
} from './EditorModel';

const COLOURS: Record<EditablePolygonKind, string> = {
  walkbox: '#52d273',
  hotspot: '#ffd166',
  scale_zone: '#65b5ff',
};

export class SceneEditor {
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  private readonly output: HTMLTextAreaElement;
  private polygons: EditablePolygon[] = [];
  private points: Point[] = [];
  private kind: EditablePolygonKind = 'walkbox';

  constructor(
    root: HTMLElement,
    private readonly scene: Scene,
    private readonly i18n: I18n,
  ) {
    root.innerHTML = this.markup();
    this.canvas = root.querySelector('canvas')!;
    this.canvas.width = 320;
    this.canvas.height = 200;
    const context = this.canvas.getContext('2d');
    if (!context) throw new Error('Canvas 2D is unavailable.');
    this.context = context;
    this.output = root.querySelector('textarea')!;
    this.bind(root);
    this.draw();
  }

  private markup(): string {
    return `
      <main class="editor-shell">
        <header>
          <div>
            <p class="eyebrow">${this.i18n.t('editor.eyebrow')}</p>
            <h1>${this.i18n.t('editor.title')}</h1>
          </div>
          <a href="./">${this.i18n.t('editor.back')}</a>
        </header>
        <section class="editor-workspace">
          <div class="editor-stage">
            <canvas role="img" aria-label="${this.i18n.t('editor.canvas_label')}"></canvas>
          </div>
          <aside class="editor-panel">
            <label>${this.i18n.t('editor.polygon_type')}
              <select data-action="kind">
                <option value="walkbox">${this.i18n.t('editor.walkbox')}</option>
                <option value="hotspot">${this.i18n.t('editor.hotspot')}</option>
                <option value="scale_zone">${this.i18n.t('editor.scale_zone')}</option>
              </select>
            </label>
            <p data-testid="editor-status">${this.i18n.t('editor.help')}</p>
            <div class="editor-actions">
              <button type="button" data-action="finish">${this.i18n.t('editor.finish')}</button>
              <button type="button" data-action="undo">${this.i18n.t('editor.undo')}</button>
              <button type="button" data-action="clear">${this.i18n.t('editor.clear')}</button>
              <button type="button" data-action="export">${this.i18n.t('editor.export')}</button>
            </div>
            <label>${this.i18n.t('editor.output')}
              <textarea readonly spellcheck="false" data-testid="editor-output"></textarea>
            </label>
          </aside>
        </section>
      </main>
    `;
  }

  private bind(root: HTMLElement): void {
    this.canvas.addEventListener('click', (event) => {
      this.points.push(
        screenToLogical(
          event.clientX,
          event.clientY,
          this.canvas.getBoundingClientRect(),
        ),
      );
      this.draw();
    });
    root
      .querySelector<HTMLSelectElement>('[data-action="kind"]')!
      .addEventListener('change', (event) => {
        this.kind = (event.currentTarget as HTMLSelectElement)
          .value as EditablePolygonKind;
        this.points = [];
        this.draw();
      });
    root
      .querySelector('[data-action="finish"]')!
      .addEventListener('click', () => this.finish());
    root
      .querySelector('[data-action="undo"]')!
      .addEventListener('click', () => {
        if (this.points.length > 0) this.points.pop();
        else this.polygons.pop();
        this.draw();
      });
    root
      .querySelector('[data-action="clear"]')!
      .addEventListener('click', () => {
        this.points = [];
        this.polygons = [];
        this.output.value = '';
        this.draw();
      });
    root
      .querySelector('[data-action="export"]')!
      .addEventListener('click', () => this.export());
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') this.finish();
      if (event.key === 'Escape') {
        this.points = [];
        this.draw();
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'z') {
        event.preventDefault();
        if (this.points.length > 0) this.points.pop();
        else this.polygons.pop();
        this.draw();
      }
    });
  }

  private finish(): void {
    if (this.points.length < 3) return;
    this.polygons = finishPolygon(this.polygons, this.kind, this.points);
    this.points = [];
    this.draw();
  }

  private export(): void {
    this.output.value = exportEditorJson(this.scene.id, this.polygons);
    const blob = new Blob([this.output.value], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${this.scene.id}-polygons.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  private drawPolygon(points: Point[], colour: string, close: boolean): void {
    if (points.length === 0) return;
    this.context.strokeStyle = colour;
    this.context.fillStyle = `${colour}33`;
    this.context.lineWidth = 1;
    this.context.beginPath();
    points.forEach((point, index) => {
      if (index === 0) this.context.moveTo(point.x, point.y);
      else this.context.lineTo(point.x, point.y);
    });
    if (close) {
      this.context.closePath();
      this.context.fill();
    }
    this.context.stroke();
    points.forEach((point) =>
      this.context.fillRect(point.x - 1, point.y - 1, 3, 3),
    );
  }

  private draw(): void {
    drawProceduralBackground(this.context, this.scene.background);
    this.polygons.forEach((polygon) =>
      this.drawPolygon(polygon.points, COLOURS[polygon.kind], true),
    );
    this.drawPolygon(this.points, COLOURS[this.kind], false);
  }
}
