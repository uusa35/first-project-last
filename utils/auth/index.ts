'use server';
import { Locale } from '@/types/index';
import { notFound } from 'next/navigation';
import { mainHeaders } from '@/utils/helpers';
import { getToken } from '@/app/actions';

export async function login(email: string, password: string, lang: Locale['lang']) {
    const query = `?email=${email}&password=${password}`;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}login${query}`, {
        cache: "no-store",
        method: "POST",
        headers: {
            'Accept-Language': lang,
            ...mainHeaders
        }
    });
    if (!res.ok) throw notFound();
    return res.json()
}

export async function logout() {
    const token = await getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}logout`, {
        cache: "no-store",
        method: "POST",
        headers: {
            ...(token && token && { 'Authorization': `Bearer ${token}` }),
            ...mainHeaders
        }
    });
    if (!res.ok) throw notFound();
    return res.json()
}

export async function getAuth(id: string, lang: Locale['lang']) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/${id}`, {
        cache: "no-store",
        method: "POST",
        headers: {
            'Accept-Language': lang,
            ...mainHeaders
        }
    });
    if (!res.ok) throw notFound();
    return res.json()
}