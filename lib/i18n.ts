export const LOCALES = ["fr", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "fr";

export const hasLocale = (value: string): value is Locale => (LOCALES as readonly string[]).includes(value);
