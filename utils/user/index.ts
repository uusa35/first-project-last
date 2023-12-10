
import { Locale } from '@/types/index';
import { notFound } from 'next/navigation';
import { mainHeaders } from '@/utils/helpers';
import { getToken } from '@/app/actions';
import { getMainHeaders } from '@/app/actions';

export async function getVendors(search: string,) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}vendors?${search}`, {
        cache: "no-store",
        headers: await getMainHeaders()
    });
    if (!res.ok) throw process.env.NODE_ENV === 'production' ? notFound() : new Error('getusers error');
    // if (!res.ok) throw notFound();
    return res.json()
}

export async function getVendor(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}vendor/${id}`, {
        cache: "no-store",
        headers: await getMainHeaders()
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
