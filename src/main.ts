import './style.css';
import { Game } from './engine/Game';
import { I18n } from './localization/I18n';
import { loadScene } from './scenes/SceneLoader';
import { SceneEditor } from './editor/SceneEditor';

const app = document.querySelector<HTMLElement>('#app');
if (!app) throw new Error('Application root is missing.');

app.innerHTML = `
  <section class="game-shell">
    <div class="viewport" data-testid="viewport"></div>
    <nav class="verbs" data-i18n-aria="ui.actions">
      <button type="button" data-verb="walk" data-i18n="verb.walk" aria-pressed="true"></button>
      <button type="button" data-verb="look" data-i18n="verb.look" aria-pressed="false"></button>
    </nav>
    <p class="message" role="status" data-testid="message"></p>
  </section>
`;

try {
  const [scene, i18n] = await Promise.all([
    loadScene('/game-data/scenes/workshop.json'),
    I18n.load('/game-data/localization/en-IE.json'),
  ]);
  if (new URLSearchParams(window.location.search).has('editor')) {
    new SceneEditor(app, scene, i18n);
    document.documentElement.dataset.sceneLoaded = scene.id;
  } else {
    app.querySelectorAll<HTMLElement>('[data-i18n]').forEach((element) => {
      element.textContent = i18n.t(element.dataset.i18n!);
    });
    app.querySelectorAll<HTMLElement>('[data-i18n-aria]').forEach((element) => {
      element.setAttribute('aria-label', i18n.t(element.dataset.i18nAria!));
    });
    const game = new Game(
      app.querySelector('[data-testid="viewport"]')!,
      app.querySelector('.verbs')!,
      scene,
      i18n,
    );
    game.events.on('message', (message) => {
      app.querySelector<HTMLElement>('[data-testid="message"]')!.textContent =
        message;
    });
    document.documentElement.dataset.sceneLoaded = scene.id;
    game.start();
  }
} catch (error) {
  const message =
    error instanceof Error ? error.message : 'The game could not start.';
  const status = app.querySelector<HTMLElement>('[data-testid="message"]');
  if (status) status.textContent = message;
  else app.textContent = message;
}
