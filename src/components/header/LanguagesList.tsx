"use client";
import { Fragment, useContext } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Locale } from "@/types/index";
import { changePathName, convertSearchParamsToString } from "@/utils/helpers";
import { usePathname, useSearchParams } from "next/navigation";
import { MainContext } from "@/layouts/MainContentLayout";
import Link from "next/link";

type Props = {
  lang: Locale["lang"];
  // searchParams: { [key: string]: string } | string;
};
export default function ({ lang }: Props) {
  const pathName = usePathname()!;
  const { ar, arabic, en, english, ru, russian, choose_language }: any =
    useContext(MainContext);
  const locales = ["ar", "en", "ru"];
  const searchParams = useSearchParams();
  return (
    <Popover className='relative '>
      <Popover.Button className='inline-flex btn-default items-center gap-x-1 text-sm font-semibold leading-2 capitalize'>
        <span>{lang === ar ? arabic : lang === en ? english : russian}</span>
        <ChevronDownIcon className='h-5 w-5' aria-hidden='true' />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-1'>
        <Popover.Panel className='absolute rtl:left-1/2 ltr:right-1/2 z-10 mt-2 flex w-screen max-w-min rtl:-translate-x-3/4 ltr:translate-x-3/4 px-4'>
          <div className='w-52 shrink rounded-xl divide-y divide-gray-100 bg-white  text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5'>
            {locales.map((item, i: number) => (
              <Link
                replace
                className='block w-full py-2 px-4  first:rounded-t-xl last:rounded-b-xl ltr:text-left rtl:text-right hover:bg-gray-200 capitalize'
                key={i}
                href={`${changePathName(lang, item, pathName)}?${
                  searchParams && searchParams.toString()
                }`}>
                {item === "ar" ? arabic : item === "en" ? english : russian}
              </Link>
            ))}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
