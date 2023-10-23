import { Locale } from '@/types/index';
import { NextResponse } from 'next/server'

export async function getMemberships(search: string, lang: Locale['lang']) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}membership?${search}`, {
        // next: { revalidate: 3600 },
        cache: "no-store",
        headers: {
            'Accept-Language': lang
        }
    });
    if (!res.ok) return undefined
    return res.json()
}

export async function getMembership(id: string, lang: Locale['lang']) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}membership/${id}`, {
        // next: { revalidate: 3600 },
        cache: "no-store",
        headers: {
            'Accept-Language': lang
        }
    });
    if (!res.ok) return undefined
    return res.json()
}