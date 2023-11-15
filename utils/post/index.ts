import { Locale } from '@/types/index';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server'
import { mainHeaders } from '@/utils/helpers';

export async function getPosts(search: string, lang: Locale['lang']) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}post?${search}`, {
        // next: { revalidate: 3600 },
        cache: "no-store",
        headers: {
            'Accept-Language': lang,
            ...mainHeaders
        }
    });
    if (!res.ok) throw process.env.NODE_ENV === 'production' ? notFound() : new Error('get posts error');
    // if (!res.ok) throw notFound();
    return res.json()
}

export async function getPost(id: string, lang: Locale['lang']) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}post/${id}`, {
        cache: "no-store",
        headers: {
            'Accept-Language': lang,
            ...mainHeaders
        }
    });
    if (!res.ok) throw process.env.NODE_ENV === 'production' ? notFound() : new Error('get post error');
    // if (!res.ok) throw notFound();
    return res.json()
}