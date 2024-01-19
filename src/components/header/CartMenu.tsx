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

import { useRouter } from "next/navigation";
import { setLocale } from "@/redux/slices/localeSlice";
import {
  toggleLoginModal,
  toggleRegisterModal,
  toggleCartMenu,
  toggleVerficationModal,
} from "@/src/redux/slices/settingSlice";
import { changeOrderType } from "@/src/redux/slices/productSlice";
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
import ProductCart from "../cart/ProductCart";
import PaymentSummary from "../PaymentSummary";
import CheckoutBtn from "../CheckoutBtn";
import { useTranslation } from "react-i18next";

export default function () {
  const { t } = useTranslation("trans");
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
    { name: t("landing"), href: appLinks.landing(lang) },
    {
      name: t("home"),
      href: appLinks.home(lang, country_code),
    },
    {
      name: t("offers"),
      href: appLinks.offers(lang, country_code, ""),
    },
    // { name: t('terms'), href: appLinks.terms(lang) },
    { name: t("aboutus"), href: appLinks.aboutus(lang) },
    { name: t("contactus"), href: appLinks.contactus(lang) },
    { name: t("joinus"), href: appLinks.joinus(lang) },
    { name: t("faqs"), href: appLinks.faqs(lang) },
  ];

  return (
    // showCartMenu
    <Transition.Root show={false} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-50'
        onClose={() => dispatch(toggleCartMenu(false))}>
        <div className='fixed inset-0' />
        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 ltr:right-0 rtl:left-0 flex max-w-full ltr:pl-10 rtl:pr-10'>
              <Transition.Child
                as={Fragment}
                enter='transition-opacity ease-linear duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='transition-opacity ease-linear duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'>
                <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                  <div className='flex h-full flex-col bg-white py-6 shadow-xl relative'>
                    <div className='overflow-y-scroll scrollbar-hide'>
                      <div className='px-4 sm:px-6'>
                        <div className='flex items-start justify-between'>
                          <div className='ml-3 flex h-7 items-center'>
                            <button
                              type='button'
                              className='relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                              onClick={() => dispatch(toggleCartMenu(false))}>
                              <span className='absolute -inset-2.5' />
                              <span className='sr-only'>Close panel</span>
                              <XMarkIcon
                                className='h-6 w-6'
                                aria-hidden='true'
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className='relative mt-6 flex-1 px-4 sm:px-6'>
                        {/* vendor info */}
                        <div>
                          <p>Your cart from</p>
                          {/* should go to vendor details */}
                          <Link href={"/"}>McDonald's</Link>

                          <div className='flex justify-between items-center border-b'>
                            <p>1 item</p>
                            <p>Subtotal : 8.00 KD</p>
                          </div>
                        </div>
                        {/*products */}
                        <div className='border-b'>
                          <ProductCart />
                        </div>

                        {/* payment summary */}
                        <div>
                          <PaymentSummary />
                          <div className='h-52 w-full'></div>
                        </div>
                      </div>
                    </div>

                    <div className='absolute bottom-0 right-0 left-0'>
                      <CheckoutBtn />
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
