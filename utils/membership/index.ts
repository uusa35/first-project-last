import { Locale } from '@/types/index';
import { NextResponse } from 'next/server'

export async function getMemberships(search: string, lang: Locale['lang']) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}membership?${search}`, {
        next: { revalidate: 3600 },
        headers: {
            'Accept-Language': lang
        }
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json()
}