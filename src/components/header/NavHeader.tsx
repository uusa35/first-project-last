"use client";
import Link from "next/link";
import type { Locale } from "@/i18n.config";
import { useContext, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { MainContext } from "@/layouts/MainContentLayout";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import {
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";
import { changePathName, convertSearchParamsToString } from "@/utils/helpers";
import AppLogo from "@/components/header/AppLogo";
import { isNull, last, split, toString } from "lodash";
import { setCurrentPath } from "@/redux/slices/settingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Setting } from "@/types/queries";
import LanguagesList from "@/components/header/LanguagesList";
import { isAuthenticated, resetAuth } from "@/redux/slices/authSlice";
import { appLinks } from "@/src/links";
import MyProfileList from "./MyProfileList";
import { deleteToken } from "@/app/actions";

type Props = {
  lang: Locale;
  // searchParams: { [key: string]: string } | string;
  mainPages: { href: string; name: string; label: string }[];
  setting: Setting;
};

export default function ({
  lang,
  // searchParams = ``,
  mainPages,
  setting,
}: Props) {
  const trans: { [key: string]: string } = useContext(MainContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    appSetting: { currentPath },
    auth,
  } = useAppSelector((state) => state);
  const isAuth = useAppSelector(isAuthenticated);
  const dispatch = useAppDispatch();
  const params = useParams();
  const pathName = usePathname()!;
  const router = useRouter();
  const segment = useSelectedLayoutSegment();
  const segments = useSelectedLayoutSegments();
  const [stickyClass, setStickyClass] = useState("relative");
  const searchParams = useSearchParams();

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);

  const handleLogout = () => {
    dispatch(resetAuth());
    deleteToken();
    router.replace(`/${lang}`);
  };

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight >= 250
        ? setStickyClass(
            "sticky top-0 bg-white lg:bg-white/80 w-full border-b border-gray-400 max-w-full"
          )
        : setStickyClass("relative");
    }
  };

  // console.log("pathname", pathName);
  // console.log("router", router);
  // console.log("segment", segment);
  // console.log("segments", segments);
  // console.log("params", params);
  // console.log("searchParams", searchParams);
  // console.log("searchParams ----->", convertSearchParamsToString(searchParams));
  // console.log("url", changePathName(lang, "ar", pathName));
  useEffect(() => {
    if (!isNull(searchParams) && searchParams.has("membership")) {
      const membership: string =
        searchParams.get("membership")?.toString() ?? ``;
      dispatch(setCurrentPath(membership));
    } else {
      const url: string = toString(last(split(pathName, "/")));
      if (url === "en" || url === "ar") {
        dispatch(setCurrentPath("home"));
      } else {
        dispatch(setCurrentPath(url));
      }
    }
  }, [pathName, isAuth]);

  return (
    <header
      className={` top-0 z-50 mx-auto max-w-7xl lg:py-4 px-2  ${stickyClass}`}>
      <nav className={`flex items-center justify-between`} aria-label='Global'>
        <div className=' lg:hidden xl:flex-1'>
          <AppLogo lang={lang} logo={setting.image} name={setting.name} />
        </div>
        {/* top bar */}
        <div className='hidden lg:flex lg:flex-1  gap-x-4 capitalize'>
          <LanguagesList lang={lang} />
        </div>
        <div className='flex lg:hidden capitalize'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
            onClick={() => setMobileMenuOpen(true)}>
            <span className='sr-only'>Open main menu</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
        {/* menu */}
        <div className='hidden lg:flex lg:gap-x-8'>
          <AppLogo lang={lang} logo={setting.image} name={setting.name} />
        </div>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end items-center capitalize'>
          {isAuth ? (
            <MyProfileList lang={lang} />
          ) : (
            <div className='flex flex-row  gap-x-4'>
              <Link
                href={appLinks.register(lang, "company")}
                className='text-sm font-semibold leading-6 w-28 text-center text-white p-2  btn-default '>
                {trans.subscriptions}
              </Link>
              <Link
                href={appLinks.register(lang, "visitor")}
                className='text-sm font-semibold leading-6 w-28 text-center text-white p-2  btn-default '>
                {trans.visitors}
              </Link>
            </div>
          )}
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
              onClick={() => dispatch(setCurrentPath(item.label))}
              key={item.label}
              href={item.href}
              className={`${
                currentPath === item.label
                  ? `text-expo-dark text-underline`
                  : `text-gray-900`
              }
              text-sm font-semibold leading-6  hover:text-expo-dark`}>
              {item.name}
            </Link>
          ))}
        </div>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end gap-x-4'>
          {!isAuth && (
            <Link
              replace
              href={`/${lang}/login`}
              className='text-sm font-semibold text-expo-dark flex flex-row w-30 justify-center items-center '>
              <UserIcon className='w-8 me-2' />
              <span className='flex w-full pt-1'>{trans.login}</span>
            </Link>
          )}
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
              <span className='sr-only'>{setting.name}</span>
              <AppLogo lang={lang} logo={setting.image} name={setting.name} />
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
              <div className='space-y-2 py-6 capitalize'>
                {mainPages.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'>
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className='py-6 capitalize flex flex-1 flex-col'>
                {isAuth ? (
                  <div className='p-3 ring ring-gray-50'>
                    <div className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 '>
                      {trans.welcome}, {auth.username}
                    </div>
                    <Link
                      className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                      href={appLinks.account(lang, auth.role.name, auth.id)}>
                      {trans.control_account_information}
                    </Link>
                    <Link
                      className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                      href={appLinks.home(lang)}>
                      {trans.back_to_home}
                    </Link>
                    <button
                      className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                      onClick={() => handleLogout()}>
                      {trans.logout}
                    </button>
                  </div>
                ) : (
                  <div className='flex flex-col'>
                    <Link
                      href={`/${lang}/login`}
                      className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'>
                      {trans.login}
                    </Link>
                    <Link
                      href={appLinks.register(lang, "company")}
                      className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'>
                      {trans.register_as_subscription}
                    </Link>
                    <Link
                      href={appLinks.register(lang, "visitor")}
                      className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'>
                      {trans.register_as_visitor}
                    </Link>
                  </div>
                )}
                <div className='flex flex-row justify-between items-center py-4 lg:py-0 px-8 ps-12'>
                  <Link
                    href={`${changePathName(lang, "ar", pathName)}?${
                      searchParams && searchParams.toString()
                    }`}
                    className={`${
                      lang === "ar" && `bg-gray-200 rounded-md`
                    } -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50`}>
                    {trans.ar}
                  </Link>

                  <Link
                    href={`${changePathName(lang, "en", pathName)}?${
                      searchParams && searchParams.toString()
                    }`}
                    className={`${
                      lang === "en" && `bg-gray-200 rounded-md`
                    } -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50`}>
                    {trans.en}
                  </Link>
                  <Link
                    href={`${changePathName(lang, "ru", pathName)}?${
                      searchParams && searchParams.toString()
                    }`}
                    className={`${
                      lang === "ru" && `bg-gray-200 rounded-md`
                    } -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50`}>
                    {trans.ru}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
