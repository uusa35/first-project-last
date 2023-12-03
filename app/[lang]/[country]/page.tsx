import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { MainContextLayout } from "@/layouts/MainContentLayout";
import { cookies } from "next/headers";

type Props = {
  params: { lang: Locale["lang"]; country: string };
};

export default async function Home({ params: { lang } }: Props) {
  const cookieStore = cookies();
  const token: any = cookieStore.get("token");
  const [{ trans }]: [{ trans: any }] = await Promise.all([
    getDictionary(lang),
  ]);

  return (
    <MainContextLayout trans={trans} lang={lang}>
      <h1>HomePage Page</h1>
    </MainContextLayout>
  );
}
