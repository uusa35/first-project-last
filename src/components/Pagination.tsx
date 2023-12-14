"use client";
import { has, isEmpty, isNull, map } from "lodash";
import Link from "next/link";
import { MainContext } from "@/layouts/MainContentLayout";
import { useContext } from "react";
import { convertSearchParamsToString } from "@/utils/helpers";
import { useSearchParams } from "next/navigation";

type Props = {
  links: any;
};

export default function ({ links }: Props): React.ReactNode {
  const trans: { [key: string]: string } = useContext(MainContext);
  const searchParams: any = useSearchParams();
  function getClassName(active: boolean) {
    if (active) {
      return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-gray-200 focus:border-primary focus:text-primary bg-gray-600 text-white hover:text-gray-900 ";
    } else {
      return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white hover:text-gray-900 focus:border-primary focus:text-primary";
    }
  }

  return (
    !isEmpty(links) && (
      <div className='bg-white my-6 rounded-md flex justify-center items-center capitalize'>
        <div className='flex flex-wrap  px-2 py-4 '>
          {links && (
            <>
              <Link
                scroll={false}
                href={`${convertSearchParamsToString(searchParams)}`}>
                next
              </Link>
              <Link
                scroll={false}
                href={`${convertSearchParamsToString(searchParams)}`}>
                previous
              </Link>
            </>
          )}
        </div>
      </div>
    )
  );
}
