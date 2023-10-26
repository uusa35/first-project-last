import { Locale } from "@/types/index";
import { Category, Post } from "@/types/queries";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

type Props = {
  element: Post;
  lang: Locale["lang"];
};
export default async function ({ element, lang }: Props) {
  return (
    <Link
      href={`/${lang}/post/${element.id}?slug=${element.name}`}
      className='flex flex-col items-start justify-between transform transition duration-500 hover:scale-105'>
      <div className='relative w-full hover:opacity-80'>
        <Image
          width={400}
          height={400}
          src={element.image}
          alt={element.name}
          className='aspect-[16/9] w-full rounded-lg bg-gray-100  object-cover sm:aspect-[2/1] lg:aspect-[3/2]'
        />
        <div className='absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/10' />
      </div>

      <div className='group relative my-2 mt-3 w-full'>
        <div className={`flex flex-row flex-1 justify-between items-center`}>
          <div className={``}>
            <h3 className=' text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600'>
              <span className='absolute inset-0' />
              {element.name}
            </h3>
          </div>

          <div className='flex-none text-xs text-expo-dark'>
            {element.created_at}
          </div>
        </div>

        <p className='mt-2 line-clamp-3 text-sm leading-6 text-gray-600'>
          {element.caption}
        </p>
      </div>
      {/* post categories */}
      <div className='flex w-full flex-row items-center justify-between text-xs'>
        <dl className='flex flex-grow flex-col justify-between'>
          <dd className='text-center grid grid-cols-2 justify-center items-center gap-1 pe-6'>
            {element.categories.slice(0, 2).map((u: Category, i: number) => (
              <span
                key={i}
                className='truncate col-span-1 text-sm text-center rounded-full bg-expo-light hover:bg-expo-dark hover:text-white px-2 py-1 font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>
                {element.name}
              </span>
            ))}
          </dd>
        </dl>
        <ArrowUpRightIcon
          className={`w-6 h-6 ${lang === "ar" && "-rotate-90"} font-extrabold`}
        />
      </div>
    </Link>
  );
}