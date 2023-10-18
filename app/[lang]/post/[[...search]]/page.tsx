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
import PostCard from "@/components/post/PostCard";

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
    <MainContextLayout
      trans={trans}
      lang={lang}
      searchParams={``}
      setting={setting}>
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
          {posts.data.map((p: Post, i: number) => (
            <PostCard element={p} lang={lang} />
          ))}
        </div>
        {posts.data.length > 0 && <Pagination links={posts.meta.links} />}
      </div>
    </MainContextLayout>
  );
}
