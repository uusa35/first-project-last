"use client";
import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { changePathName, globalMaxWidth } from "@/utils/helpers";
import { Locale, countriesList } from "@/types/index";
import { appLinks } from "@/src/links";
import { MainContext } from "@/layouts/MainContentLayout";
import { useRouter } from "next/navigation";
import { setLocale } from "@/redux/slices/localeSlice";
import {
  changeOrderType,
  toggleLoginModal,
  toggleRegisterModal,
  toggleCartMenu,
  toggleVerficationModal,
} from "@/src/redux/slices/settingSlice";
import { getAuth, getCountryNameCookie, setOrderType } from "@/app/actions";
import LogoDark from "@/appImages/logo_dark.svg";
import LogoLight from "@/appImages/logo_light.svg";
import LogoOnly from "@/appImages/logo_only.svg";
import ArFlag from "@/appIcons/ar.svg";
import MarkerImg from "@/appIcons/marker.svg";
import AreaDropDown from "@/components/home/AreaDropDown";
import GooglePlay from "@/appIcons/landing/download_google_play.svg";
import AppleStore from "@/appIcons/landing/download_apple_store.svg";
import AppGallery from "@/appIcons/landing/download_app_gallery.svg";
import { ShoppingBag } from "@mui/icons-material";
import { ShoppingBagIcon } from "@heroicons/react/20/solid";

export default function () {
  const trans: { [key: string]: string } = useContext(MainContext);
  const locales: Locale["lang"][] = ["ar", "en"];
  const {
    locale,
    area,
    country: { country_code },
    appSetting: { orderType, showCartMenu },
    auth: { token },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params: { lang: Locale["lang"]; country?: countriesList } | any =
    useParams!();
  const { lang } = params;
  const pathName = usePathname()!;
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const navigation: { name: string; href: string }[] = [
    { name: trans.landing, href: appLinks.landing(lang) },
    {
      name: trans.home,
      href: appLinks.home(lang, country_code),
    },
    {
      name: trans.offers,
      href: appLinks.offers(lang, country_code, ""),
    },
    // { name: trans.terms, href: appLinks.terms(lang) },
    { name: trans.aboutus, href: appLinks.aboutus(lang) },
    { name: trans.contactus, href: appLinks.contactus(lang) },
    { name: trans.joinus, href: appLinks.joinus(lang) },
    { name: trans.faqs, href: appLinks.faqs(lang) },
  ];

  return (
    <Transition.Root show={showCartMenu} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-50'
        onClose={() => dispatch(toggleCartMenu(false))}>
        <div className='fixed inset-0' />

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'>
                <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                  <div className='flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl'>
                    <div className='px-4 sm:px-6'>
                      <div className='flex items-start justify-between'>
                        <Dialog.Title className='text-base font-semibold leading-6 text-gray-900'>
                          Panel title
                        </Dialog.Title>
                        <div className='ml-3 flex h-7 items-center'>
                          <button
                            type='button'
                            className='relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                            onClick={() => dispatch(toggleCartMenu(false))}>
                            <span className='absolute -inset-2.5' />
                            <span className='sr-only'>Close panel</span>
                            <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className='relative mt-6 flex-1 px-4 sm:px-6'>
                      {/* Your content */}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
