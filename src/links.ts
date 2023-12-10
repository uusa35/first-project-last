import { Locale, countriesList } from '@/src/types'

export const appLinks = {
    landing: (lang: Locale['lang']) =>
        `/${lang}`,
    home: (lang: Locale['lang'], country: countriesList) =>
        `/${lang}/${country}`,
    aboutus: (lang: Locale['lang']) =>
        `/${lang}/aboutus`,
    contactus: (lang: Locale['lang']) =>
        `/${lang}/contactus`,
    terms: (lang: Locale['lang']) =>
        `/${lang}/terms`,
    offers: (lang: Locale['lang'], country: countriesList) =>
        `/${lang}/${country}/offers`,
    vendors: (lang: Locale['lang'], country: countriesList, search?: string) =>
        `/${lang}/${country}/vendors?${search}`,
    vendor: (lang: Locale['lang'], country: countriesList, id: string, slug?: string) =>
        `/${lang}/${country}/vendor/${id}?${slug ?? ``}`,

}