import { Locale } from '@/types/index';
import { NextResponse } from 'next/server'

export async function getSlides(search: string, lang: Locale['lang']) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}slide?${search}`, {
        next: { revalidate: 180 },
        // cache: "no-store",
        headers: {
            'Accept-Language': lang
        }
    });
    if (!res.ok) return undefined
    return res.json()
}