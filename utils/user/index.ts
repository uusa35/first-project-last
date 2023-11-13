
import { Locale } from '@/types/index';
import { notFound } from 'next/navigation';
import { mainHeaders } from '@/utils/helpers';
import { getToken } from '@/app/actions';

export async function getUsers(search: string, lang: Locale['lang']) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user?${search}`, {
        cache: "no-store",
        headers: {
            'Accept-Language': lang,
            ...mainHeaders
        }
    });
    if (!res.ok) throw process.env.NODE_ENV === 'production' ? notFound() : new Error('getusers error');
    // if (!res.ok) throw notFound();
    return res.json()
}

export async function getUser(id: string, lang: Locale['lang']) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/${id}`, {
        cache: "no-store",
        headers: {
            'Accept-Language': lang,
            ...mainHeaders
        }
    });
    const text = await res.text();
    try {
        const json = JSON.parse(text)
        return json;
    } catch (err) {
        throw process.env.NODE_ENV === 'production' ? notFound() : new Error('get user error');
        // throw notFound();
    }
}

export async function getAuth() {
    const token: string | null = await getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}authenticate`, {
        cache: "no-store",
        method: 'post',
        headers: {
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...mainHeaders
        }
    });
    if (!res.ok) throw process.env.NODE_ENV === 'production' ? notFound() : new Error('auth error');
    // if (!res.ok) throw notFound();
    return res.json();

}

export async function updateUser(id: string, lang: Locale['lang']) {
    const token: string | null = await getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/${id}`, {
        cache: "no-store",
        method: 'put',
        headers: {
            'Accept-Language': lang,
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...mainHeaders
        }
    });
    if (!res.ok) throw notFound();
    return res.json();
}
