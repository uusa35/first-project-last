"use client";
import * as React from "react";
import SearchIcon from "@/appIcons/search.svg";
import { map } from "lodash";
import Link from "next/link";
import { Locale } from "@/types/index";
import { Category } from "@/types/queries";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  trans: { [key: string]: string };
  lang: Locale["lang"];
  searchParams: { [key: string]: string } | string;
  categories: any;
};

export function CustomSearch({ trans, lang, searchParams, categories }: Props) {
  const router = useRouter();
  const path = usePathname();
  const HandleSearch = (val: string | null) => {
    if (val === null) {
      router.push(
        `/${lang}/user?membership=${
          (searchParams as { [key: string]: string }).membership
        }`
      );
    } else {
      router.push(
        `/${lang}/user?membership=${
          (searchParams as { [key: string]: string }).membership
        }&categories[0]=${val}`
      );
    }
  };
  return (
    <div>
      {/* filters */}
      <div className="flex items-center justify-between gap-x-3">
        {/* search categories */}
        <div className="flex gap-x-3 py-5 overflow-auto scrollbar-hide w-2/4">
          <div
            // href={`/${lang}/user?membership=${
            //   (searchParams as { [key: string]: string }).membership
            // }`}
            onClick={() => HandleSearch(null)}
            className={`border rounded-full px-3 py-2 whitespace-nowrap ${
              !path?.includes("categories")
                ? "text-white  bg-expo-dark "
                : "text-expo-dark"
            }`}
          >
            {trans.all_participants}
          </div>
          {categories?.data?.map((c: Category, i: number) => (
            <div
              key={c.id}
              //   href={`/${lang}/user?membership=${
              //     (searchParams as { [key: string]: string }).membership
              //   }&categories=${[9, 2]}`}
              onClick={() => HandleSearch(c.id)}
              className={`border rounded-full px-3 py-2 whitespace-nowrap ${
                path?.includes("categories")
                  ? "text-white  bg-expo-dark "
                  : "text-expo-dark"
              }`}
            >
              {c.name}
            </div>
          ))}
        </div>
        {/* search input */}
        <div className="flex justify-end gap-x-1 w-1/4">
          <input type="search" className="h-fit" placeholder="search" />
          <SearchIcon className="w-10 h-10" />
        </div>
      </div>
    </div>
  );
}
