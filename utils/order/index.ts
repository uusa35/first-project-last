import { Locale } from '@/types/index';
import { NextResponse } from 'next/server'

export async function getOrders(search: string, lang: Locale['lang']) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}order?${search}`, {
        // next: { revalidate: 3600 },
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

export async function getOrderByReferenceId(reference_id: string, lang: Locale['lang']) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}order/reference?reference_id=${reference_id}`, {
        cache: "no-store",
        method: 'POST',
        headers: {
            'Accept-Language': lang,
            'Authorization': `Bearer 7118259ee8e3bc2dbdc0aec954cd6adbd703bc4ff5e8c07f014f8561ce3fa56f`,
            
        }
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json()
}