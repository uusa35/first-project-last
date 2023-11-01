import { Locale } from "@/types/index";
import { Category, User } from "@/types/queries";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

type Props = {
  element: User;
  lang: Locale["lang"];
  trans: any;
};
export default async function ({ element, lang, trans }: Props) {
  return (
    <li className='col-span-1 flex flex-col  rounded-lg bg-white text-center shadow transform transition duration-500 hover:scale-110'>
      <Link
        prefetch
        href={`/${lang}/user/${element.id}?slug=${element.name}`}
        className='flex flex-1 flex-col p-4'>
        <Image
          className='mx-auto h-32 w-32 flex-shrink-0 rounded-full'
          src={element.image}
          alt={element.name}
          width={100}
          height={100}
        />
        <h3 className='mt-6 text-sm font-medium text-gray-900'>
          {element.name}
        </h3>
        <dl className='mt-4 flex flex-grow flex-col justify-between gap-y-4'>
          <dt className='sr-only'>{element.name}</dt>
          <dd className='text-sm text-gray-500'>{element.caption}</dd>
          <dt className='sr-only'>{element.caption}</dt>
          <dd className='mt-3 text-center grid grid-cols-3 justify-center items-center gap-1'>
            {element.categories.slice(0, 2).map((u: Category, i: number) => (
              <span
                key={i}
                className='truncate col-span-1 text-xs text-center rounded-full bg-expo-light hover:bg-expo-dark hover:text-white px-2 py-1 font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>
                {u.name}
              </span>
            ))}
          </dd>
        </dl>
      </Link>
      <div className=' px-3'>
        <div className='-mt-px flex border-t-[1.5px] border-[#1118277D] border-dashed'>
          <div className='flex w-0 flex-1'>
            <Link
              href={`/${lang}/user/${element.id}?slug=${element.name}`}
              className='relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 capitalize'>
              {trans.view_company_details}
              {lang !== "ar" ? (
                <ArrowRightIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              ) : (
                <ArrowLeftIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              )}
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}
