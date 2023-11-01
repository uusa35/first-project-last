import { kebabCase } from '@/src/constants'
import { Locale } from '@/src/types'
import { Membership, Role } from '@/src/types/queries'

export const appLinks = {
    home: (lang: Locale['lang']) =>
        `/${lang}`,
    about: (lang: Locale['lang']) =>
        `/${lang}/about`,
    terms: (lang: Locale['lang']) =>
        `/${lang}/terms`,
    categoryIndex: (lang: Locale['lang']) =>
        `/${lang}/category`,
    cartIndex: (lang: Locale['lang'], id: number) =>
        `/${lang}/cart/${id}`,
    membershipIndex: (lang: Locale['lang'], sort: Membership['sort']) =>
        `/${lang}/membership/${sort}`,
    membershipShow: (lang: Locale['lang'], id: number, slug: string) =>
        `/${lang}/membership/show/${id}?slug=${slug}`,
    userIndex: (lang: Locale['lang'], search?: string) =>
        `/${lang}/user?${search ?? ''}`,
    userShow: (lang: Locale['lang'], id: string, slug?: string) =>
        `/${lang}/user/${id}?slug=${kebabCase(slug) ?? ``}`,
    postIndex: (lang: Locale['lang'], search?: string) =>
        `/${lang}/post?${search ?? ''}`,
    postShow: (lang: Locale['lang'], id: string, slug?: string) => `/${lang}/post/${id}?slug=${kebabCase(slug) ?? ``}`,
    login: (lang: Locale['lang']) =>
        `/${lang}/login`,
    register: (lang: Locale['lang'], role: Role['name']) =>
        `/${lang}/register/${role}`,
    account: (lang: Locale['lang'], role: Role['name'], id: string, active_tab?: string) =>
        `/${lang}/account/${role}/${id}?active_tab=${active_tab ?? 1}`,
    forgetPassword: (lang: Locale['lang']) =>
        `/${lang}/forgot/password`,

}