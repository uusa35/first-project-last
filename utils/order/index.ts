import { Locale } from '@/types/index';
import { sha256 } from "js-sha256";
import { notFound } from 'next/navigation';

const token = process.env.NODE_ENV === "production" ? '01989686817' : '7118259ee8e3bc2dbdc0aec954cd6adbd703bc4ff5e8c07f014f8561ce3fa56f';

export async function getOrders(search: string, lang: Locale['lang']) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}order?${search}`, {
        cache: "no-store",
        headers: {
            'Accept-Language': lang
        }
    });
    if (!res.ok) throw notFound();
    return res.json()
}

export async function getOrderByReferenceId(reference_id: string, lang: Locale['lang']) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}order/reference?reference_id=${reference_id}`, {
        cache: "no-store",
        method: 'POST',
        headers: {
            'Accept-Language': lang,
            'Authorization': `Bearer ${token}`,
        }
    });
    if (!res.ok) throw notFound();
    return res.json()
}

export async function getOrder(id: string, lang: Locale['lang']) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}order/${id}`, {
        cache: "no-store",
        headers: {
            'Accept-Language': lang,
            'Authorization': `Bearer ${token}`,
        }
    });
    if (!res.ok) throw notFound();
    return res.json()
}

export async function checkOrderPayment(reference_id: string, lang: Locale['lang']) {
    const toBeHashed = `${process.env.PAYMENT_TOKEN}${process.env.MERCHANT_ID}2${reference_id}`;
    const hashed = sha256(toBeHashed);
    const query = `?MerchantID=${process.env.MERCHANT_ID}&MessageID=2&OriginalTransactionID=${reference_id}&SecureHash=${hashed}`;
    const res = await fetch(`${process.env.CHECK_PAYMENT_URL}${query}`, {
        cache: "no-store",
        method: "POST",
        headers: {
            'Accept-Language': lang,
            'Authorization': `Bearer ${token}`,
        }
    });
    if (!res.ok) throw notFound();
    return res.text();
}

export async function updateOrder(id: string, reference_id: string, status: 'pending' | 'paid' | 'failed', lang: Locale['lang']) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}order/${id}?reference_id=${reference_id}&status=${status}`, {
        cache: "no-store",
        method: 'PUT',
        headers: {
            'Accept-Language': lang,
            'Authorization': `Bearer ${token}`,
        }
    });

    if (!res.ok) throw notFound();
    return res.json()
}