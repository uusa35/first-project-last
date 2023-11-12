import { Locale } from '@/types/index';
import { notFound } from 'next/navigation';
import { mainHeaders } from '@/utils/helpers';

export async function getCategories(search: string, lang: Locale['lang']) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}category?${search}`, {
        next: { revalidate: 60 },
        headers: {
            'Accept-Language': lang,
            ...mainHeaders

        }
    });
    if (!res.ok) throw process.env.NODE_ENV === 'production' ? notFound() : Error('get categories error');
    // if (!res.ok) throw notFound();
    return res.json();
}