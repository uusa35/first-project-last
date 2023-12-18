"use client";
import { useContext, useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import {
  Bars3Icon,
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
  toggleSideMenu,
} from "@/src/redux/slices/settingSlice";
import { getCountryNameCookie, setOrderType } from "@/app/actions";
import LogoDark from "@/appImages/logo_dark.svg";
import LogoOnly from "@/appImages/logo_only.svg";
import ArFlag from "@/appIcons/ar.svg";
import MarkerImg from "@/appIcons/marker.svg";
import AreaDropDown from "@/components/home/AreaDropDown";
import GooglePlay from "@/appIcons/landing/download_google_play.svg";
import AppleStore from "@/appIcons/landing/download_apple_store.svg";
import AppGallery from "@/appIcons/landing/download_app_gallery.svg";

type Props = {
  showMiddleNav: boolean;
};
export default function ({ showMiddleNav = false }: Props) {
  const trans: { [key: string]: string } = useContext(MainContext);
  const locales: Locale["lang"][] = ["ar", "en"];
  const {
    locale,
    area,
    country: { country_code },
    appSetting: { orderType, sideMenuOpen },
    auth: { token },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params: { lang: Locale["lang"]; country?: countriesList } | any =
    useParams!();
  const { lang } = params;
  const pathName = usePathname()!;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stickyClass, setStickyClass] = useState(
    `absolute ${showMiddleNav ? "text-black" : "text-white"}`
  );
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
      if (windowHeight >= 20) {
        setStickyClass("fixed bg-white/80 text-black");
        setIsSticky(true);
      } else {
        setStickyClass(
          `absolute ${showMiddleNav ? "text-black" : "text-white"}`
        );
        setIsSticky(false);
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
                onClick={() => dispatch(toggleSideMenu())}>
                <span className='sr-only'>Open main menu</span>
                <Bars3Icon className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>
            <Link
              href={`/${lang}/${country_code ?? ``}`}
              className='-m-1.5 p-1.5'>
              <span className='sr-only'>Your Company</span>
              {country_code || isSticky ? (
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
                  className={`px-3 py-2 text-black rounded-md capitalize ${
                    orderType === "pickup" ? "bg-white" : "bg-gray-100"
                  }`}
                  onClick={() => handleOrderType("pickup")}>
                  {trans.pickup}
                </button>
                <button
                  className={`px-3 py-2 text-black rounded-md capitalize ${
                    orderType === "delivery" ? "bg-white" : "bg-gray-100"
                  }`}
                  onClick={() => handleOrderType("delivery")}>
                  {trans.delivery}
                </button>
              </div>
              {area.id !== 0 && <AreaDropDown />}
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
          <div className='hidden sm:flex sm:flex-1 sm:justify-end gap-x-4 '>
            {params?.country ? (
              <div className='relative rounded-md shadow-sm'>
                <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                  <MagnifyingGlassIcon
                    className='h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                </div>
                <input
                  type='text'
                  name='search'
                  id='search'
                  className='block w-full rounded-md border-0 py-3 ltr:pl-10 rtl:pr-10 text-gray-900 bg-gray-100 placeholder:text-gray-400 focus:ring-[0.5px] focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6'
                  placeholder='you@example.com'
                />
              </div>
            ) : (
              <>
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
              </>
            )}
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
          open={sideMenuOpen}
          // open={true}
          onClose={() => dispatch(toggleSideMenu(false))}>
          <div className='fixed inset-0 z-50' />
          <Dialog.Panel className='fixed inset-y-0 ltr:right-0 ltr:left-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10'>
            <div className='flex w-full items-end justify-end'>
              <button
                type='button'
                className='-m-2.5 rounded-md p-2.5 text-gray-400'
                onClick={() => dispatch(toggleSideMenu(false))}>
                <span className='sr-only'>Close menu</span>
                <XMarkIcon className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>
            <div className='flex items-center justify-between'>
              {token ? (
                <Link
                  href='#'
                  className='flex items-center gap-x-4  py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50 w-full'>
                  <img
                    className='h-8 w-8 rounded-full bg-gray-50'
                    src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    alt=''
                  />
                  <span className='sr-only'>Your profile</span>
                  <span aria-hidden='true'>Tom Cook</span>
                </Link>
              ) : (
                <div className='flex flex-col gap-y-4'>
                  <h2>Welcome Back,</h2>
                  <p className='text-sm text-gray-500 leading-3 mb-2'>
                    lorem ipsum dolor sit amet, consectetur adip
                  </p>
                  <button
                    className='btn-default'
                    onClick={() => dispatch(toggleLoginModal())}>
                    {trans.login}
                  </button>
                  <button
                    className='btn-transparent'
                    onClick={() => dispatch(toggleRegisterModal())}>
                    {trans.signup}
                  </button>
                </div>
              )}
            </div>
            <div className='mt-6 flow-root '>
              <div className='-my-6 '>
                <div className='py-6 '>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className='-mx-3 block border-b border-gray-200 p-3 py-4  text-base font-semibold leading-7 text-black hover:bg-gray-100 capitalize'>
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className='py-6 '>
                  <Link
                    href={appLinks.aboutus(lang)}
                    className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-black  capitalize'>
                    {trans.aboutus}
                  </Link>
                  <Link
                    href={appLinks.joinus(lang)}
                    className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-black  capitalize'>
                    {trans.add_ur_resturant}
                  </Link>
                  <ul
                    role='list'
                    className='mt-6 space-y-2 flex flex-col flex-1 justify-start items-start'>
                    <li className='text-sm flex flex-row justify-start items-center space-x-3'>
                      <Link
                        href={`${appLinks.aboutus(lang)}`}
                        className='text-gray-300 hover:text-white'>
                        <LogoOnly className='w-[4vh] h-[5vh]' />
                      </Link>
                      <p>lorem ipsum dolor sit amet, consectetur adip</p>
                    </li>
                    <li className='text-sm'>
                      <Link
                        href={`${appLinks.aboutus(lang)}`}
                        className='text-gray-300 hover:text-white'>
                        <AppGallery className='w-[14vh] h-[5vh]' />
                      </Link>
                    </li>
                    <li className='text-sm'>
                      <Link
                        href={`${appLinks.aboutus(lang)}`}
                        className='text-gray-300 hover:text-white'>
                        <GooglePlay className='w-[14vh] h-[5vh]' />
                      </Link>
                    </li>
                    <li className='text-sm'>
                      <Link
                        href={`${appLinks.aboutus(lang)}`}
                        className='text-gray-300 hover:text-white'>
                        <AppGallery className='w-[14vh] h-[5vh]' />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
}
