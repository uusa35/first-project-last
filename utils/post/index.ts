import { Locale } from '@/types/index';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server'
import { mainHeaders } from '@/utils/helpers';
import { getLang } from '@/app/actions';

export async function getPosts(search: string) {
    const lang = await getLang();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}post?${search}`, {
        next: { revalidate: 10 },
        // cache: "no-store",
        headers: {
            'Accept-Language': lang,
            ...mainHeaders
        }
    });
    if (!res.ok) throw process.env.NODE_ENV === 'production' ? notFound() : new Error('get posts error');
    // if (!res.ok) throw notFound();
    return res.json()
}

export async function getPost(id: string) {
    const lang = await getLang();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}post/${id}`, {
        next: { revalidate: 10 },
        // cache: "no-store",
        headers: {
            'Accept-Language': lang,
            ...mainHeaders
        }
    });
    if (!res.ok) throw process.env.NODE_ENV === 'production' ? notFound() : new Error('get post error');
    // if (!res.ok) throw notFound();
    return res.json()
}