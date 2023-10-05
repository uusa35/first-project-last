
export interface Locale {
    lang: 'ar' | 'en';
    isRTL: boolean;
    dir: 'ltr' | 'rtl';
    label: string;
    otherLang: 'ar' | 'en';
}

export type Setting = {
    id: number;
    name: string;
    description: string;
    aboutus: string;
    services: string;
    address: string;
    country: string;
    [key: string]: any;
}

export type toastMessage = {
    content: string;
    type: string;
    title?: string;
    showToast: boolean;
}

export type localeType = Locale | string | string[];