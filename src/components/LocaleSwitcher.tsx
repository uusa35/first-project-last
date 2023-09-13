"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { i18n } from "@/i18n.config";
import { useAppDispatch } from "../redux/hooks";
import { setLocale } from "../redux/slices/localeSlice";

export default function LocaleSwitcher() {
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const { lang } = useParams();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const handleClick = (locale: string) => dispatch(setLocale(locale));

  return (
    <ul className='flex w-full justify-between items-center gap-x-3'>
      {i18n.locales.map((locale) => {
        return (
          <li key={locale}>
            <Link
              onClick={() => handleClick(locale)}
              href={redirectedPathName(locale)}
              className={`${
                lang == locale ? `bg-gray-800` : `bg-gray-400`
              } rounded-md border  px-3 py-2 text-white  hover:opacity-60`}>
              {locale}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
