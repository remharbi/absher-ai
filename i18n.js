export const locales = ["ar", "en"];
export const defaultLocale = "ar";

export function resolveLocale(locale) {
  return locales.includes(locale) ? locale : defaultLocale;
}
