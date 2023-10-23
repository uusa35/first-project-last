import { Locale } from '@/types/index';
import { NextResponse } from 'next/server'

export async function getCategories(search: string, lang: Locale['lang']) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}category?${search}`, {
        // cache: "no-store",
        next: { revalidate: 60 },
        headers: {
            'Accept-Language': lang
        }
    });
    if (!res.ok) return undefined
    return res.json()
}