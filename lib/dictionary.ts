import 'server-only'
import { Locale, i18n } from '@/i18n.config'

const dictionaries = {
    en: () => import('@/dictionaries/en.json').then(module => module.default),
    ar: () => import('@/dictionaries/ar.json').then(module => module.default),
    ru: () => import('@/dictionaries/ru.json').then(module => module.default)
}

// export const getDictionary = async (locale: Locale) => {
//     return locale == 'ar' ? dictionaries.ar() : dictionaries.en();
// };

export const getDictionary = async (locale: Locale) => dictionaries[i18n.locales.includes(locale) ? locale : i18n.defaultLocale]();

