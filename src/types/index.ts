
export interface Locale {
    lang: 'ar' | 'en';
    isRTL: boolean;
    dir: 'ltr' | 'rtl';
    label: string;
    otherLang: 'ar' | 'en';
}

export type appSetting = {
    method: `dining` | `delivery` | `pickup`;
    title: string;
    openSideMenu: boolean;
}

export type toastMessage = {
    content: string;
    type: string;
    title?: string;
    showToast: boolean;
}

export type localeType = Locale | string | string[];