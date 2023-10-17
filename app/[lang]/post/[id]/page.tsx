import { MainContextLayout } from "@/components/MainContentLayout";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { getSetting } from "@/utils/setting";
import { getPost } from "@/utils/post";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";

type Props = {
  params: { lang: Locale["lang"]; id: string };
  searchParams: { [key: string]: string };
};

export default async function ({ params: { lang, id }, searchParams }: Props) {
  const [{ trans }, setting, post] = await Promise.all([
    getDictionary(lang),
    getSetting(lang),
    getPost(id, lang),
  ]);

  return (
    <MainContextLayout trans={trans} lang={lang} searchParams={``}>
      <main className='relative isolate mx-auto max-w-7xl'>
        {/* Image section */}
        <div className='mt-8 sm:mt-8 xl:mx-auto xl:max-w-7xl xl:px-8'>
          <div className='absolute left-10 top-10'>
            <span className={` text-gray-800 bg-white/50 p-4 rounded-md`}>
              {post.created_at}
            </span>
          </div>
          <Image
            width={1000}
            height={500}
            src={post.image}
            alt={post.name}
            className='aspect-[9/4] w-full object-cover xl:rounded-3xl'
          />
        </div>
        {/* Header section */}
        <div className='px-6 pt-12 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center '>
            <h2 className='text-4xl font-bold tracking-tight text-black sm:text-6xl'>
              {post.name}
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-800'>
              {post.caption}
            </p>
          </div>
        </div>

        {/* Content section */}
        <div className='mx-auto mt-8 max-w-7xl px-6 lg:px-8 pb-16'>
          <div className='flex flex-row mx-auto max-w-7xl lg:mx-0 lg:max-w-none'>
            <div className='grid max-w-7xl grid-cols-1 text-justified gap-8 text-base leading-8 text-gray-800'>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.description),
                }}></div>
            </div>
          </div>
        </div>
      </main>
    </MainContextLayout>
  );
}
