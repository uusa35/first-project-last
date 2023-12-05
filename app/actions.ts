'use server'
import { countriesList } from '@/types/index';
import { cookies } from 'next/headers'

export async function setLocaleCookie(value: string) {
    cookies().set({
        name: 'NEXT_LOCALE',
        value,
        secure: process.env.NODE_ENV === 'production',
    });
}

export async function setCountryCookie(value: string) {
    cookies().set({
        name: 'NEXT_COUNTRY',
        value,
        secure: process.env.NODE_ENV === 'production',
    });
}

export async function getCountryCookie() {
    const countryCookie = cookies().get('NEXT_COUNTRY');
    return countryCookie?.value ?? 'kuwait';
}

export async function setAreaCookie(value: string) {
    cookies().set({
        name: 'NEXT_AREA',
        value: value.toLowerCase(),
        secure: process.env.NODE_ENV === 'production',
    });
}

export async function getAreaCookie() {
    return cookies().get('NEXT_AREA')?.value ?? undefined;
}

export async function removeCountryCookie() {
    cookies().delete('NEXT_COUNTRY');
}

export async function removeAreaCookie() {
    cookies().delete('NEXT_AREA');
}


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

export async function getLang() {
    return cookies().get('NEXT_LOCALE')?.value ?? 'en';
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


