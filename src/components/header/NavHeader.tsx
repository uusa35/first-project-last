"use client";
import Link from "next/link";
import type { Locale } from "@/i18n.config";
import { useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { MainContext } from "../MainContentLayout";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import {
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";
import { changePathName, convertSearchParamsToString } from "@/utils/helpers";
import { useGetSettingQuery } from "@/redux/api";
import AppLogo from "./AppLogo";
type Props = {
  lang: Locale;
  searchParams: { [key: string]: string } | string;
  mainPages: { href: string; name: string }[];
};

export default function NavHeader({
  lang,
  searchParams = ``,
  mainPages,
}: Props) {
  const trans: any = useContext(MainContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const params = useParams();
  const pathName = usePathname()!;
  const router = useRouter();
  const segment = useSelectedLayoutSegment();
  const segments = useSelectedLayoutSegments();

  // console.log("pathname", pathName);
  // console.log("router", router?.query);
  // console.log("segment", segment);
  // console.log("segments", segments);
  // console.log("params", params);
  // console.log("searchParams", searchParams);
  // console.log("searchParams ----->", convertSearchParamsToString(searchParams));
  // console.log("url", changePathName(lang, "ar", pathName));
  return (
    <header className='top-0 z-50 mx-auto max-w-7xl py-4 px-2'>
      <nav
        className='flex items-center justify-between  capitalize'
        aria-label='Global'>
        <div className=' lg:hidden xl:flex-1'>
          <AppLogo />
        </div>
        <div className='hidden lg:flex lg:flex-1  gap-x-4'>
          <Link
            href={`${changePathName(
              lang,
              "ar",
              pathName
            )}?${convertSearchParamsToString(searchParams)}`}
            className='text-sm font-semibold leading-6 text-gray-900'>
            ar
          </Link>
          <Link
            href={`${changePathName(
              lang,
              "ru",
              pathName
            )}?${convertSearchParamsToString(searchParams)}`}
            className='text-sm font-semibold leading-6 text-gray-900'>
            ru
          </Link>
          <Link
            href={`${changePathName(
              lang,
              "en",
              pathName
            )}?${convertSearchParamsToString(searchParams)}`}
            className='text-sm font-semibold leading-6 text-gray-900'>
            en
          </Link>
        </div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
            onClick={() => setMobileMenuOpen(true)}>
            <span className='sr-only'>Open main menu</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
        <div className='hidden lg:flex lg:gap-x-8'>
          <AppLogo />
        </div>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end items-center gap-x-4'>
          <Link
            href={`/${lang}/register/visitor`}
            className='text-sm font-semibold leading-6 text-white p-2 px-4 btn-color-default text-center rounded-lg w-28'>
            {trans.visitors}
          </Link>
          <Link
            href={`/${lang}/register/company`}
            className='text-sm font-semibold leading-6 text-white p-2 px-4 btn-color-default text-center rounded-lg w-28'>
            {trans.subscriptions}
          </Link>
        </div>
      </nav>
      <nav
        className='hidden lg:flex items-center justify-between  capitalize my-8'
        aria-label='Global'>
        <div className='flex lg:flex-1'></div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
            onClick={() => setMobileMenuOpen(true)}>
            <span className='sr-only'>Open main menu</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
        <div className='hidden lg:flex lg:gap-x-8 '>
          {mainPages.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className='text-sm font-semibold leading-6 text-gray-900'>
              {item.name}
            </Link>
          ))}
        </div>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end gap-x-4'>
          <Link
            href={`/${lang}/login`}
            className='text-sm font-semibold text-gray-900 flex flex-row w-30 justify-center items-center '>
            <UserIcon className='w-8 me-2' />
            <span className='flex w-full pt-1'>{trans.login}</span>
          </Link>
        </div>
      </nav>
      <Dialog
        as='div'
        className='lg:hidden'
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}>
        <div className='fixed inset-0 z-50' />
        <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center justify-between'>
            <Link href='/' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Your Company</span>
              <img
                className='h-8 w-auto'
                src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                alt=''
              />
            </Link>
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(false)}>
              <span className='sr-only'>Close menu</span>
              <XMarkIcon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/10'>
              <div className='space-y-2 py-6'>
                {mainPages.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'>
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className='py-6 bg-blue-800'>
                <Link
                  href={`/${lang}/login`}
                  className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'>
                  {trans.login}
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}