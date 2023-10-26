import { MainContextLayout } from "@/layouts/MainContentLayout";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { getUser } from "@/utils/user";
import { getSetting } from "@/utils/setting";
import { getMembership } from "@/utils/membership";
import { Auth, Country, Membership, Setting, User } from "@/types/queries";
import { getCountries } from "@/utils/country";
import CartContent from "@/components/cart/CartContent";
import { notFound } from "next/navigation";

type Props = {
  params: { lang: Locale["lang"]; id: string };
  searchParams: { [key: string]: string };
};
export default async function ({ params: { lang, id }, searchParams }: Props) {
  const [{ trans }, membership, country, dollarCountry, setting, user]: [
    { trans: any },
    Membership,
    Country,
    Country,
    Setting,
    Auth
  ] = await Promise.all([
    getDictionary(lang),
    getMembership(id, lang),
    getCountries(`lang=${lang}&limit=1`, lang),
    getCountries(`lang=en&limit=1`, lang),
    getSetting(lang),
    getUser("3", lang),
  ]);

  if (!membership || !country || !dollarCountry) notFound();

  return (
    <MainContextLayout
      trans={trans}
      lang={lang}
      searchParams={``}
      setting={setting}>
      <CartContent
        membership={membership}
        country={country[0]}
        user={user}
        dollarCountry={dollarCountry[0]}
      />
    </MainContextLayout>
  );
}
