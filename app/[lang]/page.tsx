import { Locale, countriesList } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { MainContextLayout } from "@/layouts/MainContentLayout";
import { getCountries } from "@/utils/country";
import { cookies } from "next/headers";
import { AppQueryResult, Country } from "@/types/queries";
import { getCountryCookie, getCountryNameCookie } from "@/mainApp/actions";
import LandingPageContent from "@/src/components/home/landing/LandingPageContent";

type Props = {
  params: { lang: Locale["lang"] };
};

export default async function ({ params: { lang } }: Props) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const country  = await getCountryNameCookie();
  const [{ trans }, countries]: [{ trans: any }, AppQueryResult<Country[]>] =
    await Promise.all([getDictionary(lang), getCountries()]);

  console.log("country=====> from cookie", country);
  return (
    <MainContextLayout trans={trans} lang={lang} country={country}>
      <LandingPageContent countries={countries.data} />
    </MainContextLayout>
  );
}
