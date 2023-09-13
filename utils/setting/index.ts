import { NextResponse } from 'next/server'

export async function getSetting() {
    // const { searchParams } = new URL(request.url)
    // const id = searchParams.get('id')
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}setting`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json()
}