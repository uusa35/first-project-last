import { MainContextLayout } from "@/layouts/MainContentLayout";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { getAuth } from "@/utils/user";
import { getSetting } from "@/utils/setting";
import { getMembership } from "@/utils/membership";
import { Auth, Country, Membership, Setting } from "@/types/queries";
import { getCountries } from "@/utils/country";
import CartContent from "@/components/cart/CartContent";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import NoResults from "@/components/NoResults";

type Props = {
  params: { lang: Locale["lang"]; id: string };
  searchParams: { [key: string]: string };
};
export default async function ({ params: { lang, id }, searchParams }: Props) {
  const cookieStore = cookies();
  const token: any = cookieStore.get("token");
  if (!token || !token.value) return notFound();
  const [{ trans }, membership, country, dollarCountry, setting, auth]: [
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
    getAuth(token.value),
  ]);

  if (!membership || !country || !dollarCountry) return notFound();
  if (!auth || auth.role.name !== "company")
    return (
      <NoResults
        setting={setting}
        lang={lang}
        trans={trans}
        showSearchBar={false}
        message={
          trans.u_must_be_registered_as_company_register_now_or_update_ur_account
        }
      />
    );

  return (
    <MainContextLayout trans={trans} lang={lang} setting={setting}>
      <CartContent
        membership={membership}
        country={country[0]}
        user={auth}
        dollarCountry={dollarCountry[0]}
      />
    </MainContextLayout>
  );
}
