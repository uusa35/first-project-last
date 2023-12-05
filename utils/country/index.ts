import { getMainHeaders } from '@/app/actions';
import { revalidate } from '@/src/constants';

export async function getCountries() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}country`, {
        // cache: "no-store",
        next: { revalidate: revalidate.max },
        headers: await getMainHeaders()
    });
    if (!res.ok) new Error(res.statusText);
    return res.json();
}

export async function getCountry(name: string, id?: number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}country/${name.toLowerCase() ?? id}`, {
        next: { revalidate: revalidate.max },
        headers: await getMainHeaders()
    });
    if (!res.ok) new Error(res.statusText);
    return res.json();
}