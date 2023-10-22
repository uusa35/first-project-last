import { MainContextLayout } from "@/layouts/MainContentLayout";
import TextTrans from "@/components/TextTrans";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { map } from "lodash";
import Link from "next/link";
import { getPosts } from "@/utils/post";
import { convertSearchParamsToString } from "@/utils/helpers";
import Image from "next/image";
import { Category, Post } from "@/types/queries";
import { getSetting } from "@/utils/setting";
import LoginImage from "@/appImages/login/section.jpg";
import Pagination from "@/components/Pagination";
import PostCard from "@/components/post/PostCard";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

type Props = {
  params: { lang: Locale["lang"] };
  searchParams: { [key: string]: string };
};
export async function generateMetadata({ params }: Props) {
  const { trans } = await getDictionary(params.lang);
  return {
    title: trans.post_index,
  };
}

export default async function PostIndex({
  params: { lang },
  searchParams,
}: Props) {
  const [{ trans }, posts, setting] = await Promise.all([
    getDictionary(lang),
    getPosts(convertSearchParamsToString(searchParams) ?? ``, lang),
    getSetting(lang),
  ]);

  return (
    <MainContextLayout
      trans={trans}
      lang={lang}
      searchParams={``}
      setting={setting}>
      <div className='container mx-auto max-w-7xl min-h-screen px-3 xl:px-0'>
        <Link
          href={`/${lang}/post/${posts.data[0].id}?slug=${posts.data[0].name}`}
          className='flex flex-col items-start justify-between gap-y-2'>
          <div className='relative w-full hover:opacity-80'>
            <Image
              width={400}
              height={400}
              src={posts.data[0].large}
              alt={posts.data[0].name}
              className='aspect-[16/9] w-full rounded-lg bg-gray-100  object-cover sm:aspect-[2/1] lg:aspect-[4/1.5]'
            />
            <div className='absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/10' />
          </div>
          <div className='group relative my-2 mt-3 w-full'>
            <div
              className={`flex flex-row flex-1 justify-between items-center`}>
              <div className={``}>
                <h3 className=' text-lg lg:text-3xl font-semibold leading-6 text-gray-900 group-hover:text-gray-600'>
                  <span className='absolute inset-0' />
                  {posts.data[0].name}
                </h3>
              </div>

              <div className='flex-none text-xs text-expo-dark'>
                {posts.data[0].created_at}
              </div>
            </div>

            <p className='mt-2 line-clamp-3 text-sm lg:text-2xl leading-6 text-gray-600'>
              {posts.data[0].caption}
            </p>
          </div>
          {/* post categories */}
          <div className='flex w-full flex-row items-center justify-between text-xs'>
            <dl className='flex flex-grow flex-col justify-between'>
              <dd className='text-center grid grid-cols-3 lg:grid-cols-8 justify-center items-center gap-2'>
                {posts.data[0].categories.map((u: Category, i: number) => (
                  <span
                    key={i}
                    className='text-center truncate col-span-1 text-[12px] lg:text-[14px] inline-flex items-center rounded-full bg-expo-light hover:bg-expo-dark hover:text-white px-2 py-1 font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>
                    {u.name.slice(0, 12)}..
                  </span>
                ))}
              </dd>
            </dl>
            <ArrowUpRightIcon
              className={`w-6 h-6 ${
                lang === "ar" && "-rotate-90"
              } font-extrabold`}
            />
          </div>
        </Link>
        {posts.data.length < 0 && (
          <div className='text-center text-2xl py-20'>
            No Result Component here
          </div>
        )}

        <div className='mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10  lg:max-w-none lg:grid-cols-3'>
          {posts.data.slice(1, 8).map((p: Post, i: number) => (
            <PostCard element={p} lang={lang} />
          ))}
        </div>
        {posts.data.length > 0 && <Pagination links={posts.meta.links} />}
      </div>
    </MainContextLayout>
  );
}
