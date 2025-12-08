import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'ar',
  // optional:
  // localePrefix: 'as-needed'
});
