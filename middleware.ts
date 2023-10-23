import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { i18n } from '@/i18n.config'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  const locale = matchLocale(languages, locales, i18n.defaultLocale)
  return locale
}

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    locale => !pathName.startsWith(`/${locale}/`) && pathName !== `/${locale}`
  )


  // `x-forwarded-host` and `host` headers do not match`origin` header from a forwarded Server Action
  const url = request.nextUrl.clone();
  const isProduction = process.env.NODE_ENV === 'production' // redirect only in production
  if (url.pathname.includes('order') && !isProduction) {
    request.headers.append('x-forwarded-host', 'stspayone.com');
    const requestedHost = request.headers.get('x-forwarded-host');
    // https://srstaging.stspayone.com
    if (requestedHost && requestedHost.match(/stspayone.com/)) {
      const host = `dev.ar-expo.ru`; // set your main domain
      const requestedPort = request.headers.get('x-forwarded-port');
      const requestedProto = request.headers.get('x-forwarded-proto');
      url.host = host;
      url.protocol = requestedProto || url.protocol;
      url.port = requestedPort || url.port;
      const finalPath = `https://${host}${request.nextUrl.pathname}`;
      console.log('=====the url host=====', url.host);
      console.log('=====the url hostname=====', url.hostname);
      console.log('=====the url origin=====', url.hostname);
      console.log('====final Path=====', `${finalPath}`)
      return NextResponse.rewrite(new URL(`${pathName}`, finalPath));
    } else {

    }
  } else {
    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
      const locale = getLocale(request)
      return NextResponse.redirect(
        new URL(
          `/${locale}${pathName.startsWith('/') ? '' : '/'}${pathName}`,
          request.url
        )
      )
    }
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
