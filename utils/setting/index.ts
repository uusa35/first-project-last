import { Locale } from '@/types/index';
import { NextResponse } from 'next/server'

export async function getSetting(lang: Locale['lang']) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}setting`, {
        cache: "no-store",
        headers: {
            'Accept-Language': lang
        }
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json()
}

export async function getLightSetting(lang: Locale['lang']) {
    // const { searchParams } = new URL(request.url)
    // const id = searchParams.get('id')
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}setting/1`, {
        // cache: "no-store",
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