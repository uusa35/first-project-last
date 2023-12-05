import { Locale, countriesList } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { MainContextLayout } from "@/layouts/MainContentLayout";
import { cookies } from "next/headers";

type Props = {
  params: { lang: Locale["lang"]; country: countriesList };
};

export default async function ({ params: { lang, country } }: Props) {
  const cookieStore = cookies();
  const token: any = cookieStore.get("token");
  const [{ trans }]: [{ trans: any }] = await Promise.all([
    getDictionary(lang),
  ]);

  return (
    <MainContextLayout trans={trans} lang={lang} country={country}>
      <h1 className='text-7xl'>Offers {country}</h1>
    </MainContextLayout>
  );
}
