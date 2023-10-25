import { getToken } from '@/src/constants';
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
    // const token = request.cookies.get('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/${id}`, {
        cache: "no-store",
        headers: {
            'Accept-Language': lang
        }
    });
    return res.json()
}

export async function getAuth() {
    // const token = request.cookies.get('token');
    const token: any = getToken();
    console.log('======the token======', token);
    if (token && token.is_auth && token.token) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}reauthenticate`, {
            cache: "no-store",
            headers: {
                'Authentication': `Bearer ${token.token}`
            }
        });
        return res.json()
    }
    return { status: 500 }

}

