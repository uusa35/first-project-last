import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { MainContextLayout } from "@/layouts/MainContentLayout";

import { getCountries } from "@/utils/country";
import Figures from "@/components/home/Figures";
import NewsLetters from "@/components/home/NewsLetters";
import LatestNews from "@/components/home/LatestNews";
import SubscriptionsPrices from "@/components/home/SubscriptionsPrices";
import SearchBar from "@/components/home/SearchBar";
import CategoriesList from "@/components/home/CategoriesList";
import RegisterAs from "@/components/home/RegisterAs";
import SponsorsList from "@/components/home/SponsorsList";
import SponsorsPrices from "@/components/home/SponsorsPrices";
import { MainGallery } from "@/components/home/MainGallery";
import { cookies } from "next/headers";

type Props = {
  params: { lang: Locale["lang"] };
};

export default async function Home({ params: { lang } }: Props) {
  const cookieStore = cookies();
  const token: any = cookieStore.get("token");
  const [{ trans }]: [{ trans: any }] = await Promise.all([
    getDictionary(lang),
  ]);

  return (
    <MainContextLayout trans={trans} lang={lang} setting={setting}>
      <h1>Landing Page</h1>
    </MainContextLayout>
  );
}
