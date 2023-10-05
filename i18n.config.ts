export const i18n = {
  defaultLocale: 'ar',
  locales: ['en', 'ar', 'ru']
} as const

export type Locale = (typeof i18n)['locales'][number]