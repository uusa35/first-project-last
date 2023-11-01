import { Locale } from '@/types/index';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server'

export async function getSlides(search: string, lang: Locale['lang']) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}slide?${search}`, {
        next: { revalidate: 60 },
        headers: {
            'Accept-Language': lang,
        },

    });
    if (!res.ok) throw notFound();
    return res.json()
}