import { Locale } from '@/types/index';
import { NextResponse } from 'next/server'

export async function getUsers(search: string, lang: Locale['lang']) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user?${search}`, {
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

export async function getUser(id: string, lang: Locale['lang']) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/${id}`, {
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