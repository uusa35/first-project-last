"use client";
import * as React from "react";
import SearchIcon from "@/appIcons/search.svg";
import { Locale } from "@/types/index";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
  trans: { [key: string]: string };
  lang: Locale["lang"];
};

export function CustomSearch({ trans, lang }: Props) {
  const [searchKey, setSearchKey] = React.useState<string>("");
  const path = usePathname();
  const searchParams = useSearchParams();
  console.log(searchParams?.get("membership"));

  return (
    <div className="flex justify-end gap-x-1 w-full md:w-1/4">
      <input
        value={searchKey}
        type="search"
        className="h-fit w-full border-none !outline-none focus:shadow-none focus:ring-0 bg-[#D9D9D938]"
        placeholder="search"
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <Link
        href={`/${lang}/user?membership=${searchParams?.get(
          "membership"
        )}/search=${searchKey}`}
      >
        <SearchIcon className="w-10 h-10" />
      </Link>
    </div>
  );
}
