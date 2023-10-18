import { MainContextLayout } from "@/components/MainContentLayout";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";
import NavHeader from "@/components/header/NavHeader";
import { getUser } from "@/utils/user";
import { getSetting } from "@/utils/setting";

type Props = {
  params: { lang: Locale["lang"]; id: string };
  searchParams: { [key: string]: string };
};
export default async function UserShow({
  params: { lang, id },
  searchParams,
}: Props) {
  const [{ trans }, setting, user] = await Promise.all([
    getDictionary(lang),
    getSetting(lang),
    getUser(id, lang),
  ]);

  return (
    <MainContextLayout
      trans={trans}
      lang={lang}
      searchParams={``}
      setting={setting}>
      <div>Post Name : {user.name}</div>
    </MainContextLayout>
  );
}
