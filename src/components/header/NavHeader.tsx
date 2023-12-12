"use client";
import { useContext, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { changePathName } from "@/utils/helpers";
import { Locale } from "@/types/index";
import { appLinks } from "@/src/links";
import { MainContext } from "@/layouts/MainContentLayout";
import { useRouter } from "next/navigation";
import { setLocale } from "@/redux/slices/localeSlice";

type Props = {
  lang: Locale["lang"];
  showBg: boolean;
};
export default function ({ lang, showBg }: Props) {
  const trans: { [key: string]: string } = useContext(MainContext);
  const locales: Locale["lang"][] = ["ar", "en"];
  const { locale, country } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname()!;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigation = [
    { name: trans.landing, href: appLinks.landing(lang) },
    {
      name: trans.home,
      href: appLinks.home(lang, country.country_code?.toLowerCase()),
    },
    {
      name: trans.offers,
      href: appLinks.offers(lang, country.country_code?.toLowerCase(), ""),
    },
    { name: trans.terms, href: appLinks.terms(lang) },
    { name: trans.aboutus, href: appLinks.aboutus(lang) },
    { name: trans.contactus, href: appLinks.contactus(lang) },
  ];
  const handleClick = (item: Locale["lang"]) => {
    dispatch(setLocale(item));
    return router.push(
      `${changePathName(locale.lang, item, pathName)}?${
        searchParams && searchParams.toString()
      }`
    );
  };
  return (
    <div>
      <header
        className={`absolute inset-x-0 top-0 z-50 ${
          !showBg ? `text-black` : `text-white`
        }`}>
        <nav
          className='flex items-center justify-between p-6 lg:px-8'
          aria-label='Global'>
          <div className='flex lg:flex-1 gap-x-8'>
            <div className='flex '>
              <button
                type='button'
                className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400'
                onClick={() => setMobileMenuOpen(true)}>
                <span className='sr-only'>Open main menu</span>
                <Bars3Icon className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>
            <a href='#' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Your Company</span>
              <img
                className='h-8 w-auto'
                src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
                alt=''
              />
            </a>
          </div>
          <div className='hidden lg:flex lg:gap-x-12'>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className='text-sm font-semibold leading-6 '>
                {item.name}
              </Link>
            ))}
          </div>
          <div className='flex lg:flex-1 lg:justify-end gap-x-4 '>
            {locales.map((item, i: number) => (
              <button
                // href={`${changePathName(lang, item, pathName)}?${
                //   searchParams && searchParams.toString()
                // }`}
                onClick={() => handleClick(item)}
                className='text-sm font-semibold leading-6 '>
                {item}
              </button>
            ))}
            <Link href='#'>Login</Link>
            <Link href='#'>Sign up</Link>
          </div>
        </nav>
        {/* mobile nav */}
        <Dialog
          as='div'
          className=''
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}>
          <div className='fixed inset-0 z-50' />
          <Dialog.Panel className='fixed inset-y-0 ltr:right-0 ltr:left-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10'>
            <div className='flex items-center justify-between'>
              <a href='#' className='-m-1.5 p-1.5'>
                <span className='sr-only'>Your Company</span>
                <img
                  className='h-8 w-auto'
                  src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
                  alt=''
                />
              </a>
              <button
                type='button'
                className='-m-2.5 rounded-md p-2.5 text-gray-400'
                onClick={() => setMobileMenuOpen(false)}>
                <span className='sr-only'>Close menu</span>
                <XMarkIcon className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>
            <div className='mt-6 flow-root'>
              <div className='-my-6 divide-y divide-gray-500/25'>
                <div className='space-y-2 py-6'>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-gray-800'>
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className='py-6'>
                  <a
                    href='#'
                    className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-black hover:bg-gray-800'>
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
}
