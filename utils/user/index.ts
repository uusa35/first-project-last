
import { Locale } from '@/types/index';
import { notFound } from 'next/navigation';
import { NextResponse, NextRequest } from 'next/server'

export async function getUsers(search: string, lang: Locale['lang']) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user?${search}`, {
        cache: "no-store",
        // next: { revalidate: 3600 },
        headers: {
            'Accept-Language': lang
        }
    });
    if (!res.ok) return notFound();
    return res.json()
}

export async function getUser(id: string, lang: Locale['lang']) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/${id}`, {
        cache: "no-store",
        headers: {
            'Accept-Language': lang
        }
    });

    if (JSON.stringify(res.json()).length < 10) {
        throw notFound();
    } else {
        return res.json()

    }
}

export async function getAuth(token: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}authenticate`, {
        cache: "no-store",
        method: 'post',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!res.ok) return notFound();
    return res.json();

}

export async function updateUser(id: string, lang: Locale['lang'], token: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/${id}`, {
        cache: "no-store",
        method: 'put',
        headers: {
            'Accept-Language': lang,
            'Authorization': `Bearer ${token}`
        }
    });
    if (!res.ok) return notFound();
    return res.json();
}

