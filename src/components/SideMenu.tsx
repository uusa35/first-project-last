"use client";
import { Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { appLinks, imageUrl, logoBlured } from "../constants";
import type { Locale } from "@/i18n.config";
import LocaleSwitcher from "./LocaleSwitcher";
import { getDictionary } from "@/lib/dictionary";
import Logo from "@/appImages/logo.png";
import Image from "next/image";
import { slide as MainMenu } from "react-burger-menu";
import { useSelectedLayoutSegments, useParams } from "next/navigation";
import { first } from "lodash";
import { MainContext } from "./MainContentLayout";
import Link from "next/link";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function SideMenu() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const {
    home: { main },
    translation,
    about: { aboutus },
    nationalevent,
  }: any = useContext(MainContext);
  const { lang } = useParams();
  const segments = useSelectedLayoutSegments();

  const navigation = [
    { name: main, href: appLinks.home(lang), icon: HomeIcon },
    {
      name: aboutus,
      href: appLinks.about(lang),
      icon: HomeIcon,
    },
    {
      name: nationalevent,
      href: appLinks.nationaleventIndex(lang),
      icon: HomeIcon,
    },
  ];

  return (
    <div
      className={`fixed top-0 w-full md:w-1/2 lg:w-5/12 xl:w-1/3 bg-white z-50`}>
      {/* side Menu */}
      <MainMenu
        right={lang === "ar"}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        customBurgerIcon={false}
        customCrossIcon={false}>
        <div className='flex min-h-screen grow flex-col gap-y-5 overflow-y-auto px-6 bg-white'>
          <div className='flex w-full justify-between items-start my-6'>
            <Link
              href={appLinks.home(lang)}
              className='flex h-16 shrink-0 items-center '>
              <Image
                className='h-10 w-10'
                src={Logo}
                alt='ar-expo'
                fill={false}
                placeholder='blur'
                loading='lazy'
                blurDataURL={logoBlured}
              />
            </Link>
            <XMarkIcon
              className='w-5 h-5 text-gray-800 cursor-pointer'
              onClick={() => setSidebarOpen(false)}
            />
          </div>

          <nav className='flex flex-1 flex-col'>
            <ul role='list' className='flex flex-1 flex-col gap-y-7'>
              <li className='-mx-6 mt-auto'>
                <Link
                  href={appLinks.home(lang)}
                  className='flex flex-row items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-black hover:bg-expo-light'>
                  <Image
                    className='h-10 w-10 rounded-full'
                    src={Logo}
                    alt='ar-expo'
                    fill={false}
                    placeholder='blur'
                    loading='lazy'
                    blurDataURL={logoBlured}
                  />
                  <div className='flex flex-col'>
                    <span className=''>Your profile</span>
                    <span aria-hidden='true'>Tom Cook</span>
                  </div>
                </Link>
              </li>
              <li>
                <LocaleSwitcher />
              </li>
              <li>
                <ul role='list' className='-mx-2 space-y-1'>
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={classNames(
                          first(segments) === item.name
                            ? "bg-expo-dark text-white"
                            : "text-expo-light hover:text-white hover:bg-expo-dark",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        )}>
                        <item.icon
                          className={classNames(
                            first(segments) === item.name
                              ? "text-expo-dark"
                              : "group-hover:text-white",
                            "h-6 w-6 shrink-0"
                          )}
                          aria-hidden='true'
                        />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </MainMenu>

      <div className='sticky top-0 z-40 flex   items-center gap-x-6 bg-white px-4 py-4  sm:px-6'>
        <button
          type='button'
          className='-m-2.5 p-2.5 text-gray-700'
          onClick={() => setSidebarOpen(true)}>
          <span className='sr-only'>Open sidebar</span>
          <Bars3Icon className='h-6 w-6' aria-hidden='true' />
        </button>
        <div className='flex-1 text-sm font-semibold leading-6 text-gray-900'>
          Ar Expo
        </div>
        <Link href={appLinks.home(lang)}>
          <span className='sr-only'>Your profile</span>
          <Image
            className='h-8 w-8 rounded-full bg-gray-50'
            src={Logo}
            alt='expo'
            fill={false}
            placeholder='blur'
            loading='lazy'
            blurDataURL={logoBlured}
          />
        </Link>
      </div>
    </div>
  );
}
