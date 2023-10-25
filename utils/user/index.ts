
import { Locale } from '@/types/index';
import { NextResponse, NextRequest } from 'next/server'

export async function getUsers(search: string, lang: Locale['lang']) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user?${search}`, {
        cache: "no-store",
        // next: { revalidate: 3600 },
        headers: {
            'Accept-Language': lang
        }
    });
    return res.json()
}

export async function getUser(id: string, lang: Locale['lang']) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/${id}`, {
        cache: "no-store",
        headers: {
            'Accept-Language': lang
        }
    });
    return res.json()
}

export async function getAuth(token: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}authenticate`, {
        cache: "no-store",
        method: 'post',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!res.ok) new Error('error');
    return res.json();

}

