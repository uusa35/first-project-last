import { Locale } from '@/types/index';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server'
import { mainHeaders } from '@/utils/helpers';

export async function getImages(search: string, lang: Locale['lang']) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}image?${search}`, {
        // cache: "no-store",
        next: { revalidate: 180 },
        headers: {
            'Accept-Language': lang,
            ...mainHeaders
        }
    });
    if (!res.ok) throw notFound();
    return res.json()
}
