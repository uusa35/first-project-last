import { notFound } from 'next/navigation';
import { getMainHeaders } from '@/app/actions';
import { revalidate } from '@/utils/helpers';

export async function getSlides(search: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}slider?${search}`, {
        next: { revalidate: revalidate.mid },
        headers: await getMainHeaders()
    });
    if (!res.ok) throw notFound();
    return res.json()
}