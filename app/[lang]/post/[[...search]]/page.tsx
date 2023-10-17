import { MainContextLayout } from "@/components/MainContentLayout";
import TextTrans from "@/components/TextTrans";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { map } from "lodash";
import Link from "next/link";
import { getPosts } from "@/utils/post";
import { convertSearchParamsToString } from "@/utils/helpers";
import Image from "next/image";
import { Post } from "@/types/queries";
import { getSetting } from "@/utils/setting";
import LoginImage from "@/appImages/login/section.jpg";
import Pagination from "@/components/Pagination";

type Props = {
  params: { lang: Locale["lang"] };
  searchParams: { [key: string]: string };
};
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
    <MainContextLayout trans={trans} lang={lang} searchParams={``}>
      <div className='container mx-auto max-w-7xl min-h-screen'>
        <Image
          className='h-80 w-full object-cover'
          width={600}
          height={1000}
          src={LoginImage.src}
          alt={setting.name}
        />
        {posts.data.length < 0 && (
          <div className='text-center text-2xl py-20'>
            No Result Component here
          </div>
        )}

        <div className='mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 px-3 xl:px-0 lg:max-w-none lg:grid-cols-3'>
          {posts.data.map((post: Post, i: number) => (
            <Link
              href={`/${lang}/post/${post.id}?slug=${post.name}`}
              key={i}
              className='flex flex-col items-start justify-between'>
              <div className='relative w-full'>
                <Image
                  width={400}
                  height={400}
                  src={post.image}
                  alt={post.name}
                  className='aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]'
                />
                <div className='absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10' />
              </div>
              <div className='mt-8 flex items-center justify-between text-xs'>
                <time dateTime={post.datetime} className='text-gray-500'>
                  {post.date}
                </time>
                <h4 className='hidden relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100'>
                  {post.name}
                </h4>
              </div>

              <div className='group relative'>
                <h3 className=' text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600'>
                  <span className='absolute inset-0' />
                  {post.name}
                </h3>

                <p className='mt-2 line-clamp-3 text-sm leading-6 text-gray-600'>
                  {post.caption}
                </p>
              </div>
            </Link>
          ))}
        </div>
        {posts.data.length > 0 && <Pagination links={posts.meta.links} />}
      </div>
    </MainContextLayout>
  );
}
