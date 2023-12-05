import { Locale } from '@/types/index';
import { notFound } from 'next/navigation';
import { mainHeaders } from '@/utils/helpers';

export async function getCountries(lang: Locale['lang']) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}country`, {
        // cache: "no-store",
        next: { revalidate: 180 },
        headers: {
            'Accept-Language': lang,
            ...mainHeaders
        }
    });
    if (!res.ok) new Error(res.statusText);
    return res.json();
}

export async function getCountry(name: string, lang?: Locale['lang'], id?: number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}country/${name.toLowerCase() ?? id}`, {
        // cache: "no-store",
        next: { revalidate: 180 },
        headers: {
            'Accept-Language': lang ?? 'en',
            ...mainHeaders
        }
    });
    if (!res.ok) new Error(res.statusText);
    return res.json();
}