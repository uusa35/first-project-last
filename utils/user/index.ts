import { NextResponse } from 'next/server'

export async function getUsers() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}search/user`, {
        next: {
            revalidate: 10
        }
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json()
}