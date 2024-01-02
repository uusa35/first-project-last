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

export default function () {
  const trans: { [key: string]: string } = useContext(MainContext);
  const {
    locale: { lang },
  } = useAppSelector((state) => state);
  return (
    <nav className='flex m-4 pt-6' aria-label='Breadcrumb'>
      <ol role='list' className='flex items-center gap-x-4'>
        <li>
          <div>
            <Link
              href={`/${lang}`}
              className='text-gray-400 hover:text-gray-500'>
              <HomeIcon className='h-5 w-5 flex-shrink-0' aria-hidden='true' />
              <span className='sr-only'>{trans.home}</span>
            </Link>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className='flex items-center'>
              <ChevronRightIcon
                className='h-5 w-5 rtl:rotate-180 flex-shrink-0 text-gray-400'
                aria-hidden='true'
              />
              <a
                href={page.href}
                className='ml-4 text-sm font-medium text-gray-500 hover:text-gray-700'
                aria-current={page.current ? "page" : undefined}>
                {page.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
