import { describe, expect, it } from 'vitest';
import { I18n } from '../../src/localization/I18n';

describe('localisation', () => {
  it('looks up text and identifies a missing key', () => {
    const i18n = I18n.from({
      locale: 'en-IE',
      messages: { greeting: 'Howya.' },
    });
    expect(i18n.t('greeting')).toBe('Howya.');
    expect(i18n.t('missing')).toBe('[missing]');
  });
});
