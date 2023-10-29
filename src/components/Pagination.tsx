"use client";
import { has, isEmpty, isNull, map } from "lodash";
import Link from "next/link";
import { MainContext } from "@/layouts/MainContentLayout";
import { useContext } from "react";

type Props = {
  links: any;
};

export default function ({ links }: Props): React.ReactNode {
  const { previous, next }: any = useContext(MainContext);
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
          {links &&
            map(links, (link: any, i) =>
              has(link, "url") && isNull(link.url) ? (
                <div
                  key={i}
                  className='flex  justify-center items-center mr-1 mb-1 text-sm leading-4 text-gray-400 border rounded w-24 text-center hover:bg-gray-200'>
                  {link.label.includes("Previous")
                    ? previous
                    : link.label.includes("Next")
                    ? next
                    : link.label}
                </div>
              ) : (
                <Link
                  scroll={false}
                  key={i}
                  className={getClassName(link.active)}
                  href={link.url}>
                  {link.label.includes("Previous")
                    ? previous
                    : link.label.includes("Next")
                    ? next
                    : link.label}
                </Link>
              )
            )}
        </div>
      </div>
    )
  );
}
