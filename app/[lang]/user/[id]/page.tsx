import { MainContextLayout } from "@/components/MainContentLayout";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";
import NavHeader from "@/components/NavHeader";
import { getUser } from "@/utils/user";

type Props = {
  params: { lang: Locale["lang"]; id: string };
  searchParams: { [key: string]: string };
};
export default async function UserShow({
  params: { lang, id },
  searchParams,
}: Props) {
  const [{ trans }, user] = await Promise.all([
    getDictionary(lang),
    getUser(id, lang),
  ]);

  return (
    <MainContextLayout trans={trans} lang={lang}>
      <NavHeader lang={lang} />
      <div>Post Name : {user.name}</div>
    </MainContextLayout>
  );
}
