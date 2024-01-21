import { Locale, countriesList } from '@/src/types'
import { addDashs } from '@/utils/helpers'

export const appLinks = {
    landing: (lang: Locale['lang']) =>
        `/${lang}`,
    home: (lang: Locale['lang'], country: countriesList) =>
        `/${lang}/${country}`,
    aboutus: (lang: Locale['lang']) =>
        `/${lang}/aboutus`,
    contactus: (lang: Locale['lang']) =>
        `/${lang}/contactus`,
    joinus: (lang: Locale['lang']) =>
        `/${lang}/joinus`,
    faqs: (lang: Locale['lang']) =>
        `/${lang}/faqs`,
    terms: (lang: Locale['lang']) =>
        `/${lang}/terms`,
    offers: (lang: Locale['lang'], country: countriesList, search?: string) =>
        `/${lang}/${country}/offers?${search}`,
    offer: (lang: Locale['lang'], country: countriesList, id: string, slug?: string) =>
        `/${lang}/${country}/offer/${id}?slug=${slug ? addDashs(slug) : ``}`,
    vendors: (lang: Locale['lang'], country: countriesList, search?: string) =>
        `/${lang}/${country}/vendors?${search}`,
    vendor: (lang: Locale['lang'], country: countriesList, id: string, slug?: string, branch_id?: string) =>
        `/${lang}/${country}/vendor/${id}?${slug ? `slug=${addDashs(slug)}` : ``}${branch_id ? `&branch_id=${branch_id}` : ``}`,

}