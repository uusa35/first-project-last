import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { MainContextLayout } from "@/layouts/MainContentLayout";
import { cookies } from "next/headers";
import { getCountryNameCookie } from "@/app/actions";
import Image from "next/image";
import PageHeader from "@/src/components/PageHeader";

type Props = {
  params: { lang: Locale["lang"] };
};

export default async function ({ params: { lang } }: Props) {
  const country: any = await getCountryNameCookie();
  const [{ trans }]: [{ trans: any }] = await Promise.all([
    getDictionary(lang),
  ]);

  return (
    <MainContextLayout trans={trans} lang={lang} country={country ?? "kw"}>
      <PageHeader img={``} title={"about us"} />
    </MainContextLayout>
  );
}
