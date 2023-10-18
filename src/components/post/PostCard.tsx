import { Locale } from "@/types/index";
import { Category, Post } from "@/types/queries";
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
      className='flex flex-col items-start justify-between'>
      <div className='relative w-full'>
        <Image
          width={400}
          height={400}
          src={element.image}
          alt={element.name}
          className='aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]'
        />
        <div className='absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10' />
      </div>

      <div className='group relative my-2 mt-3'>
        <h3 className=' text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600'>
          <span className='absolute inset-0' />
          {element.name}
        </h3>
        <p className='mt-2 line-clamp-3 text-sm leading-6 text-gray-600'>
          {element.caption}
        </p>
      </div>
      {/* post categories */}
      <div className='flex flex-1 flex-col items-center justify-between text-xs'>
        <dl className='flex flex-grow flex-col justify-between'>
          <dd className='text-center grid grid-cols-3 justify-center items-center gap-1'>
            {element.categories.map((u: Category, i: number) => (
              <span
                key={element.id}
                className='truncate col-span-1 text-[8px] xl:text-[12px] inline-flex items-center rounded-full bg-expo-light hover:bg-expo-dark hover:text-white px-2 py-1 font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>
                {element.name.slice(0, 12)}..
              </span>
            ))}
          </dd>
        </dl>
      </div>
    </Link>
  );
}
