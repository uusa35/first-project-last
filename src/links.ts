import { Locale } from '@/src/types'

export const appLinks = {
    home: (lang: Locale['lang']) =>
        `/${lang}`,
    about: (lang: Locale['lang']) =>
        `/${lang}/about`,
    terms: (lang: Locale['lang']) =>
        `/${lang}/terms`,
}