export type Verb = 'walk' | 'look';

export class VerbPanel {
  selected: Verb = 'walk';

  constructor(element: HTMLElement) {
    element
      .querySelectorAll<HTMLButtonElement>('button[data-verb]')
      .forEach((button) => {
        button.addEventListener('click', () => {
          this.selected = button.dataset.verb as Verb;
          element.querySelectorAll('button').forEach((item) => {
            item.setAttribute('aria-pressed', String(item === button));
          });
        });
      });
  }
}
