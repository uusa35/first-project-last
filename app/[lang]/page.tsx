import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { MainContextLayout } from "@/layouts/MainContentLayout";
import { getCountries } from "@/utils/country";
import { cookies } from "next/headers";
import { AppQueryResult, Country } from "@/types/queries";
import { getCountryCookie } from "@/mainApp/actions";
import LandingPageContent from "@/src/components/home/landing/LandingPageContent";

type Props = {
  params: { lang: Locale["lang"] };
};

export default async function ({ params: { lang } }: Props) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const country: Country = await getCountryCookie();
  const [{ trans }, countries]: [{ trans: any }, AppQueryResult<Country[]>] =
    await Promise.all([getDictionary(lang), getCountries()]);
  return (
    <MainContextLayout trans={trans} lang={lang} country={country.country_code}>
      <LandingPageContent countries={countries.data} />
    </MainContextLayout>
  );
}
