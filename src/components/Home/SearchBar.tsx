"use client";
import { MainContext } from "@/layouts/MainContentLayout";
import { Locale } from "@/types/index";
import Link from "next/link";
import { useState, useContext } from "react";

type Props = {
  lang: Locale["lang"];
};

export function SearchBar({ lang }: Props) {
  const [searchKey, setSearchKey] = useState<string>("");
  const trans: { [key: string]: string } = useContext(MainContext);

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-7xl'>
        <div className='relative isolate overflow-hidden  px-6 sm:rounded-3xl sm:px-14 py-12 xl:py-14'>
          <h2 className='text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl capitalize'>
            {trans.search}
          </h2>
          <div className='mx-auto mt-10 flex max-w-2xl gap-x-4'>
            <input
              required
              minLength={3}
              className='min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 h-14 text-black bg-gray-100 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 capitalize'
              placeholder={trans.search}
              onChange={(e) => setSearchKey(e.target.value)}
              value={searchKey}
            />
            <Link
              className='btn-default flex items-center capitalize'
              href={`/${lang}/user?search=${searchKey}`}>
              {trans.search}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
