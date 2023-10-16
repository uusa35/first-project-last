import { MainContextLayout } from "@/components/MainContentLayout";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";
import { getPost } from "@/utils/post";
import NavHeader from "@/components/NavHeader";

type Props = {
  params: { lang: Locale["lang"]; id: string };
  searchParams: { [key: string]: string };
};
export default async function PostShow({
  params: { lang, id },
  searchParams,
}: Props) {
  const [{ trans }, post] = await Promise.all([
    getDictionary(lang),
    getPost(id, lang),
  ]);

  return (
    <MainContextLayout trans={trans} lang={lang} searchParams={``}>
      <div>Post Name : {post.name}</div>
    </MainContextLayout>
  );
}
