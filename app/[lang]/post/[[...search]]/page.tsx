import { MainContextLayout } from "@/components/MainContentLayout";
import TextTrans from "@/components/TextTrans";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { map } from "lodash";
import Link from "next/link";
import { getPosts } from "@/utils/post";

type Props = {
  params: { lang: Locale["lang"] };
  searchParams: { [key: string]: string };
};
export default async function PostIndex({
  params: { lang },
  searchParams,
}: Props) {
  const [{ trans }, users] = await Promise.all([
    getDictionary(lang),
    getPosts(``, lang),
  ]);

  return (
    <MainContextLayout trans={trans}>
      <div className='container py-24'>
        <h1 className='text-3xl font-bold'>
          {trans.translation} : {trans.posts}
        </h1>
        <div className='w-full p-8  bg-orange-500 rounded-md'>
          <h1>From SSR : posts</h1>
          {users &&
            map(users.data, (p, i) => (
              <Link key={i} href={`/${lang}/post/${p.id}`}>
                <span>{p.id} - </span>
                <TextTrans ar={p.name} en={p.name} />
              </Link>
            ))}
        </div>
      </div>
    </MainContextLayout>
  );
}
