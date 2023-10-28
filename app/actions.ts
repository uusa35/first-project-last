'use server'
import { cookies } from 'next/headers'

export async function setLocaleCookie(value: string) {
    cookies().set({
        name: 'NEXT_LOCALE',
        value,
        secure: process.env.NODE_ENV !== 'production',
    });
}