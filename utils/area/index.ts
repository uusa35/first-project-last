import { Locale } from '@/types/index';
import { notFound } from 'next/navigation';
import { mainHeaders } from '@/utils/helpers';

export async function getAreas(lang: Locale['lang'], country_id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}area`, {
        // cache: "no-store",
        next: { revalidate: 180 },
        headers: {
            'Accept-Language': lang,
            'X-Country': country_id,
            ...mainHeaders
        }
    });
    if (!res.ok) new Error(res.statusText);
    return res.json();
}
