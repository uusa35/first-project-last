import { Locale } from '@/types/index';
import { NextResponse } from 'next/server'

export async function login(email: string,password:string, lang: Locale['lang']) {
        const query = `?email=${email}&password=${password}`;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}login${query}`, {
        cache: "no-store",
        method: "POST",
        headers: {
            'Accept-Language': lang,
        }
    });
    if (!res.ok) {
        
        throw new Error("Failed to fetch data");
    }
    // console.log(res)
    return res.json()
}

export async function getUser(id: string, lang: Locale['lang']) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/${id}`, {
        cache: "no-store",
        method: "POST",
        headers: {
            'Accept-Language': lang,
        }
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json()
}