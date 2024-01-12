"use client";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useAppSelector } from "@/src/redux/hooks";
import { useContext } from "react";
import { MainContext } from "@/components/layouts/MainContentLayout";

const pages = [
  { name: "Projects", href: "#", current: false },
  { name: "Project Nero", href: "#", current: true },
];

export default function ({ title }: { title?: string }) {
  const trans: { [key: string]: string } = useContext(MainContext);
  const {
    locale: { lang },
    country: { name },
  } = useAppSelector((state) => state);
  return (
    <nav className='flex m-4 pt-6' aria-label='Breadcrumb'>
      <ol role='list' className='flex items-center gap-x-4'>
        <li>
          <Link
            href={`/${lang}`}
            className='flex flex-row items-center gap-x-4 text-gray-400 hover:text-gray-500'>
            <HomeIcon className='h-5 w-5 flex-shrink-0' aria-hidden='true' />
            <span className='text-gray-500 capitalize'>{trans.home}</span>
          </Link>
        </li>
        <li>
          <div className='flex flex-row items-center'>
            <ChevronRightIcon
              className='h-5 w-5 rtl:rotate-180 flex-shrink-0 text-gray-400'
              aria-hidden='true'
            />
            <Link
              href={`/${lang}`}
              className='ml-4 text-sm font-medium text-gray-500 hover:text-gray-700'>
              {name}
            </Link>
          </div>
        </li>
        {title && (
          <li>
            <div className='flex items-center'>
              <ChevronRightIcon
                className='h-5 w-5 rtl:rotate-180 flex-shrink-0 text-gray-400'
                aria-hidden='true'
              />
              <div className='ml-4 text-sm font-medium text-gray-500 hover:text-gray-700'>
                {title}
              </div>
            </div>
          </li>
        )}
      </ol>
    </nav>
  );
}
