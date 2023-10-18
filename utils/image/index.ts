import { Locale } from '@/types/index';
import { NextResponse } from 'next/server'

export async function getImages(search: string, lang: Locale['lang']) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}image?${search}`, {
        // cache: "no-store",
        next: { revalidate: 120 },
        headers: {
            'Accept-Language': lang
        }
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json()
}
