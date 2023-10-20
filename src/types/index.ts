
export interface Locale {
    lang: 'ar' | 'en' | 'ru';
    isRTL: boolean;
    dir: 'ltr' | 'rtl';
    label: string;
    otherLang: 'ar' | 'en' | 'ru';
}



export type toastMessage = {
    content: string;
    type: string;
    title?: string;
    showToast: boolean;
}

export type localeType = Locale | string | string[];