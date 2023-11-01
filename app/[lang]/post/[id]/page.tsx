import { MainContextLayout } from "@/layouts/MainContentLayout";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { getSetting } from "@/utils/setting";
import { getPost } from "@/utils/post";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { notFound } from "next/navigation";
import { Post, Setting } from "@/types/queries";
import { removeTags } from "@/utils/helpers";

type Props = {
  params: { lang: Locale["lang"]; id: string };
  searchParams: { [key: string]: string };
};

export async function generateMetadata({ params }: Props) {
  const [post, setting]: [Post, Setting] = await Promise.all([
    getPost(params.id, params.lang),
    getSetting(params.lang),
  ]);
  return {
    title: post.name,
    description: removeTags(
      post.description ?? setting.caption ?? setting.description
    ),
    openGraph: {
      title: post.name,
      description: removeTags(
        post.caption ?? setting.caption ?? setting.description
      ),
      url: setting.website,
      siteName: setting.name,
      images: [
        {
          url: post.image ?? setting.image,
          width: 800,
          height: 600,
        },
        {
          url: post.image ?? setting.image,
          width: 1800,
          height: 1600,
          alt: post.name,
        },
      ],
      locale: params.lang,
      type: "website",
    },
    twitter: {
      card: post.name,
      title: post.name,
      description: removeTags(
        post.caption ?? setting.caption ?? setting.description
      ),
      // siteId: "1467726470533754880",
      creator: setting.name,
      // creatorId: "1467726470533754880",
      images: [post.image ?? setting.image],
    },
  };
}

export default async function ({ params: { lang, id }, searchParams }: Props) {
  const [{ trans }, setting, post]: [{ trans: any }, Setting, Post] =
    await Promise.all([
      getDictionary(lang),
      getSetting(lang),
      getPost(id, lang),
    ]);

  if ("status" in post && (post.status === 404 || post.status === 500))
    notFound();

  return (
    <MainContextLayout
      trans={trans}
      lang={lang}
      searchParams={``}
      setting={setting}>
      <main className='relative isolate mx-auto max-w-7xl min-h-screen'>
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
            className='aspect-[9/4] w-full object-cover xl:rounded-xl'
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
                className='max-w-xs sm:max-w-xl md:max-w-full whitespace-pre-line text-ellipsis overflow-hidden'
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
