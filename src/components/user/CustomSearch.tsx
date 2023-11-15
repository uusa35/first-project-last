"use client";
import { InputHTMLAttributes, useRef, useState } from "react";
import SearchIcon from "@/appIcons/search.svg";
import { Locale } from "@/types/index";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import BackspaceOutlined from "@mui/icons-material/BackspaceOutlined";

type Props = {
  trans: { [key: string]: string };
  lang: Locale["lang"];
};

export function CustomSearch({ trans, lang }: Props) {
  const [searchKey, setSearchKey] = useState<string>("");
  const searchRef = useRef<any>();
  const path = usePathname();
  const searchParams = useSearchParams();
  const handleReset = () => searchRef.current.reset();
  return (
    <div className='flex justify-end items-center gap-x-1 w-full md:w-1/4'>
      <input
        ref={searchRef}
        type='search'
        className='h-10 w-full border-none !outline-none focus:shadow-none focus:ring-0 bg-[#D9D9D938] capitalize rounded-md'
        placeholder={trans.search}
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <Link
        className='w-14 h-10 bg-gray-100 rounded-md p-1.5 flex justify-center items-center hover:bg-gray-200'
        href={`/${lang}/user?membership=${searchParams?.get(
          "membership"
        )}&search=${searchKey}`}>
        <MagnifyingGlassIcon className='w-6 h-6 text-expo-dark' />
      </Link>
      <Link
        onClick={() => handleReset()}
        className='w-14 h-10 bg-gray-100 rounded-md p-1.5 flex justify-center items-center hover:bg-gray-200'
        href={`/${lang}/user?membership=${searchParams?.get("membership")}`}>
        <BackspaceOutlined className='w-6 h-6 text-expo-dark' />
      </Link>
    </div>
  );
}
