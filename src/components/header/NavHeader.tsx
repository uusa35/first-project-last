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
  toggleCartMenu,
  toggleLoginModal,
  toggleRegisterModal,
  toggleSideMenu,
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
import CartMenu from "./CartMenu";

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

  const handleRegisterClick = () => {
    dispatch(toggleRegisterModal());
    // if (!token) {
    //   dispatch(toggleVerficationModal());
    // } else {
    //   dispatch(toggleRegisterModal());
    // }
  };

  return (
    <div>
      <header className={`${stickyClass}  top-0 z-50 ${globalMaxWidth} w-full`}>
        <nav
          className=' flex items-center justify-between p-6 lg:px-8 '
          aria-label='Global'>
          <div className='flex'>
            <div className='hidden sm:flex'>
              <button
                type='button'
                className='-m-2.5 hidden sm:inline-flex items-center justify-center rounded-md p-2.5 text-gray-400'
                onClick={() => dispatch(toggleSideMenu())}>
                <span className='sr-only'>Open main menu</span>
                <svg
                  className='h-6 w-6'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M23.0008 4H1V7H23.0008V4ZM23.0008 11.0008H1V14.0008H23.0008V11.0008ZM1 18.0004H23.0008V21.0004H1V18.0004Z'
                    fill='#0E1114'
                  />
                </svg>
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
          </div>
          <div className='flex sm:flex-1 sm:justify-end gap-x-4 '>
            {params?.country ? (
              <div className='flex flex-row w-full justify-end items-center'>
                <div className='relative rounded-md shadow-sm me-4 lg:w-3/5 xl:w-[350px]'>
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
                    className='input-default ltr:pl-10 rtl:pr-10 '
                    placeholder={trans.search}
                  />
                </div>
                <div className='flex flex-row gap-x-4'>
                  <svg
                    className='w-5 h-5'
                    onClick={() => dispatch(toggleCartMenu())}
                    width='24'
                    height='19'
                    viewBox='0 0 24 19'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M22.713 4.077C22.4317 3.73944 22.0796 3.46795 21.6815 3.28182C21.2835 3.09568 20.8494 2.99946 20.41 3H4.242L4.2 2.649C4.11405 1.91942 3.76338 1.24673 3.21449 0.758478C2.6656 0.270223 1.95663 0.000341793 1.222 0L1 0C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1C0 1.26522 0.105357 1.51957 0.292893 1.70711C0.48043 1.89464 0.734784 2 1 2H1.222C1.46693 2.00003 1.70334 2.08996 1.88637 2.25272C2.06941 2.41547 2.18634 2.63975 2.215 2.883L3.591 14.583C3.73385 15.7998 4.31848 16.9218 5.23391 17.736C6.14934 18.5502 7.33185 19 8.557 19H19C19.2652 19 19.5196 18.8946 19.7071 18.7071C19.8946 18.5196 20 18.2652 20 18C20 17.7348 19.8946 17.4804 19.7071 17.2929C19.5196 17.1054 19.2652 17 19 17H8.557C7.93806 16.9983 7.3348 16.8051 6.82994 16.4471C6.32507 16.089 5.94331 15.5835 5.737 15H17.657C18.8293 15.0001 19.9643 14.5882 20.8638 13.8364C21.7633 13.0846 22.37 12.0407 22.578 10.887L23.363 6.533C23.4414 6.10101 23.4237 5.65707 23.3114 5.23264C23.1991 4.80821 22.9948 4.41368 22.713 4.077ZM21.4 6.178L20.614 10.532C20.4891 11.225 20.1245 11.852 19.5839 12.3032C19.0433 12.7544 18.3612 13.0011 17.657 13H5.419L4.478 5H20.41C20.5569 4.99912 20.7022 5.03062 20.8355 5.09226C20.9689 5.15389 21.087 5.24415 21.1815 5.35661C21.276 5.46907 21.3446 5.60097 21.3824 5.74294C21.4201 5.8849 21.4262 6.03344 21.4 6.178Z'
                      fill='#0E1114'
                    />
                  </svg>
                  <svg
                    className='w-5 h-5'
                    width='19'
                    height='21'
                    viewBox='0 0 19 21'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M6.01612 17H2.29083C1.55203 17 0.953125 16.4011 0.953125 15.6623V14.7893C0.953125 14.2839 1.1539 13.7992 1.51127 13.4419C2.43448 12.5187 2.95312 11.2665 2.95312 9.9609V7C2.95312 3.13401 6.08714 0 9.95312 0C13.8191 0 16.9531 3.13401 16.9531 7V9.9609C16.9531 11.2665 17.4718 12.5187 18.395 13.4419C18.7523 13.7992 18.9531 14.2839 18.9531 14.7893V15.6623C18.9531 16.4011 18.3542 17 17.6154 17H13.8901C13.8901 17.3646 13.8826 18.1575 13.4579 18.9285C12.7801 20.159 11.4662 21 9.95312 21C8.44002 21 7.12609 20.159 6.44827 18.9285C6.02358 18.1575 6.01612 17.3646 6.01612 17ZM14.9531 9.9609C14.9531 11.7839 15.6721 13.5327 16.9531 14.8283V15H2.95312V14.8283C4.23412 13.5327 4.95312 11.7839 4.95312 9.9609V7C4.95312 4.23858 7.1917 2 9.95312 2C12.7145 2 14.9531 4.23858 14.9531 7V9.9609ZM11.8901 17H8.01612C8.01612 17.332 8.03992 17.6728 8.20012 17.9636C8.53942 18.5796 9.19403 18.9975 9.94643 19H9.95312H9.95973C10.7122 18.9975 11.3668 18.5796 11.7061 17.9636C11.8663 17.6728 11.8901 17.332 11.8901 17Z'
                      fill='#0E1114'
                    />
                  </svg>
                  <div className='flex sm:hidden'>
                    <button
                      type='button'
                      className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400'
                      onClick={() => dispatch(toggleSideMenu())}>
                      <span className='sr-only'>Open main menu</span>
                      <svg
                        className='h-6 w-6'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M23.0008 4H1V7H23.0008V4ZM23.0008 11.0008H1V14.0008H23.0008V11.0008ZM1 18.0004H23.0008V21.0004H1V18.0004Z'
                          fill='#0E1114'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <button
                  className={`p-3 w-32 bg-white/80 rounded-lg capitalize text-lg text-black`}
                  onClick={handleRegisterClick}>
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
              className='hidden sm:flex text-sm font-semibold pt-2'>
              <div className='flex flex-row justify-center items-center gap-x-3'>
                <ArFlag className='w-8 h-8 ' />
                <div>{lang === "ar" ? trans.english : trans.arabic}</div>
              </div>
            </button>
          </div>
        </nav>
        {/* mobile nav */}
        <Transition.Root show={sideMenuOpen} as={Fragment}>
          <Dialog
            as='div'
            className='relative z-50'
            onClose={() => dispatch(toggleSideMenu(false))}>
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
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
            </Transition.Child>
          </Dialog>
        </Transition.Root>
        <CartMenu />
      </header>
    </div>
  );
}
