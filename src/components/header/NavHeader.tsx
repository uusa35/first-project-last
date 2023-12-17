"use client";
import { useContext, useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
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
} from "@/src/redux/slices/settingSlice";
import { setOrderType } from "@/app/actions";
import LogoDark from "@/appImages/logo_dark.svg";
import LogoLight from "@/appImages/logo_light.svg";
import ArFlag from "@/appIcons/ar.svg";
import MarkerImg from "@/appIcons/marker.svg";
import AreaDropDown from "../home/AreaDropDown";

type Props = {
  lang: Locale["lang"];
  country: countriesList;
  showMiddleNav: boolean;
};
export default function ({ lang, country, showMiddleNav = false }: Props) {
  const trans: { [key: string]: string } = useContext(MainContext);
  const locales: Locale["lang"][] = ["ar", "en"];
  const {
    locale,
    area,
    appSetting: { orderType },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const pathName = usePathname()!;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stickyClass, setStickyClass] = useState(
    `absolute ${showMiddleNav ? "text-black" : "text-white"}`
  );
  const navigation = [
    { name: trans.landing, href: appLinks.landing(lang) },
    {
      name: trans.home,
      href: appLinks.home(lang, country),
    },
    {
      name: trans.offers,
      href: appLinks.offers(lang, country, ""),
    },
    // { name: trans.terms, href: appLinks.terms(lang) },
    { name: trans.aboutus, href: appLinks.aboutus(lang) },
    { name: trans.contactus, href: appLinks.contactus(lang) },
    { name: trans.joinus, href: appLinks.joinus(lang) },
    { name: trans.faqs, href: appLinks.faqs(lang) },
  ];
  const handleClick = (item: Locale["lang"]) => {
    dispatch(setLocale(item));
    return router.push(
      `${changePathName(locale.lang, item, pathName)}?${
        searchParams && searchParams.toString()
      }`
    );
  };

  const handleOrderType = async (orderType: "pickup" | "delivery") => {
    await setOrderType(orderType).then(() =>
      dispatch(changeOrderType(orderType))
    );
  };

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);
  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      if (windowHeight >= 250) {
        setStickyClass("fixed  bg-white/80 text-black");
      } else {
        setStickyClass(
          `absolute ${showMiddleNav ? "text-black" : "text-white"}`
        );
      }
    }
  };

  return (
    <div>
      <header className={`${stickyClass}  top-0 z-50 ${globalMaxWidth} w-full`}>
        <nav
          className=' flex items-center justify-between p-6 lg:px-8 '
          aria-label='Global'>
          <div className='flex'>
            <div className='flex'>
              <button
                type='button'
                className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400'
                onClick={() => setMobileMenuOpen(true)}>
                <span className='sr-only'>Open main menu</span>
                <Bars3Icon className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>
            <Link href={`/${country}`} className='-m-1.5 p-1.5'>
              <span className='sr-only'>Your Company</span>
              {params?.country ? (
                <LogoDark className='h-8 w-36 ' />
              ) : (
                <LogoLight className='h-8 w-36 ' />
              )}
            </Link>
          </div>
          <div
            className={`hidden ${
              showMiddleNav && `lg:flex`
            } lg:gap-x-12 overflow-hidden`}>
            <div className='flex flex-row justify-evenly items-start gap-x-2'>
              <div className='flex flex-row p-1 rounded-md bg-gray-100 '>
                <button
                  className={`p-3 text-black rounded-md capitalize ${
                    orderType === "pickup" ? "bg-white" : "bg-gray-100"
                  }`}
                  onClick={() => handleOrderType("pickup")}>
                  {trans.pickup}
                </button>
                <button
                  className={`p-3 text-black rounded-md capitalize ${
                    orderType === "delivery" ? "bg-white" : "bg-gray-100"
                  }`}
                  onClick={() => handleOrderType("delivery")}>
                  {trans.delivery}
                </button>
              </div>
              <AreaDropDown />
            </div>

            {/* {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className='text-sm font-semibold leading-6 capitalize'>
                {item.name}
              </Link>
            ))} */}
          </div>
          <div className='flex lg:flex-1 lg:justify-end gap-x-4 '>
            <button
              className={`p-3 w-32 bg-white/80 rounded-lg capitalize text-lg text-black`}
              onClick={() => dispatch(toggleRegisterModal())}>
              {trans.signup}
            </button>
            <button
              className={`p-3 w-32 bg-white/30 rounded-lg capitalize text-lg`}
              onClick={() => dispatch(toggleLoginModal())}>
              {trans.login}
            </button>
            <button
              onClick={() => handleClick(lang === "ar" ? "en" : "ar")}
              className='text-sm font-semibold leading-6 '>
              <div className='flex flex-row justify-center items-center gap-x-3'>
                <ArFlag className='w-8 h-8 ' />
                <div>{lang === "ar" ? trans.english : trans.arabic}</div>
              </div>
            </button>
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
              <Link href={`/${country}`} className='-m-1.5 p-1.5'>
                <span className='sr-only'>{trans.picks}</span>
                {params?.country ? (
                  <LogoDark className='h-8 w-36 ' />
                ) : (
                  <LogoLight className='h-8 w-36 ' />
                )}
              </Link>
              <button
                type='button'
                className='-m-2.5 rounded-md p-2.5 text-gray-400'
                onClick={() => setMobileMenuOpen(false)}>
                <span className='sr-only'>Close menu</span>
                <XMarkIcon className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>
            <div className='mt-6 flow-root '>
              <div className='-my-6 divide-y divide-gray-500/25'>
                <div className='space-y-2 py-6'>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-picks-light capitalize'>
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className='py-6'>
                  <a
                    href='#'
                    className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-black hover:bg-picks-light'>
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
