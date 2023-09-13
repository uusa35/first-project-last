import { NextResponse, } from 'next/server'

export async function getNationalEvents(search: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}search/nationalevent?${search ?? ``}`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json()
}

export async function getNationalEvent(id: number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}nationalevent/${id}`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json()
}