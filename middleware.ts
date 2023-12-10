import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { i18n } from '@/i18n.config'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { getCountry } from '@/utils/country'
import { cookies } from 'next/headers'
import { Country } from '@/types/queries'

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  if (languages.length === 1 && languages[0] === '*') {
    languages = ['ar']
  }
  const locale = matchLocale(languages, locales, i18n.defaultLocale)
  return locale
}

export default async function middleware(request: NextRequest, response: NextResponse) {
  const pathName = request.nextUrl.pathname;
  const currentRequestedLocale = pathName.split('/')[1];
  const country: string | undefined = pathName.split('/')[2] ?? undefined;
  const serverCountry: { data: Country } | undefined = country !== undefined ? await getCountry(country) : undefined;
  const pathnameIsMissingLocale = i18n.locales.every(
    locale => !pathName.startsWith(`/${locale}/`) && pathName !== `/${locale}`
  )
  const token = request.cookies.get('token');
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathName.startsWith('/') ? '' : '/'}${pathName}`,
        request.url
      ))
  } else {
    if (token &&
      (request.nextUrl.pathname.includes('login') ||
        request.nextUrl.pathname.includes('register'))
    ) {
      return NextResponse.redirect(new URL(`/${currentRequestedLocale}`, request.url))
    }
    if (!request.nextUrl.pathname.includes('terms')
      && !request.nextUrl.pathname.includes('faqs')
      && !request.nextUrl.pathname.includes('about')
      && !request.nextUrl.pathname.includes('contactus')
    ) {
      // if country exists or serverCountry exists but where must be servercountry equal to country go to the URL 
      if ((country !== undefined || serverCountry !== undefined) && serverCountry?.data?.country_code?.toLowerCase() !== country.toLowerCase()) {
        // go to landing page
        return NextResponse.redirect(new URL(`/${currentRequestedLocale}`, request.url))
      }
    }
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
