import { z } from 'zod';

const localizationSchema = z.object({
  locale: z.string(),
  messages: z.record(z.string(), z.string()),
});

export class I18n {
  private constructor(private readonly messages: Record<string, string>) {}

  static from(input: unknown): I18n {
    return new I18n(localizationSchema.parse(input).messages);
  }

  static async load(url: string): Promise<I18n> {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Could not load localisation (${response.status}).`);
    return I18n.from(await response.json());
  }

  t(key: string): string {
    return this.messages[key] ?? `[${key}]`;
  }
}
