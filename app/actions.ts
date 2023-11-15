'use server'
import { cookies } from 'next/headers'

export async function setLocaleCookie(value: string) {
    cookies().set({
        name: 'NEXT_LOCALE',
        value,
        secure: process.env.NODE_ENV === 'production',
    });
}``

export async function setToken(value: string) {
    cookies().set({
        name: 'token',
        value,
        secure: process.env.NODE_ENV === 'production',
    });
}

export async function getToken() {
    return cookies().get('token')?.value ?? null;
}

export async function setRole(value: string) {
    cookies().set({
        name: 'role',
        value,
        secure: process.env.NODE_ENV === 'production',
    });
}

export async function setLang(value: string) {
    cookies().set({
        name: 'NEXT_LOCALE',
        value,
        secure: process.env.NODE_ENV === 'production',
    });
}

export async function deleteToken() {
    cookies().delete('token');
    cookies().delete('role');
}

