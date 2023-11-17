import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { MainContextLayout } from "@/layouts/MainContentLayout";
import { getSlides } from "@/utils/slide";
import { getCategories } from "@/utils/category";
import { getSetting } from "@/utils/setting";
import { getMemberships } from "@/utils/membership";
import { getPosts } from "@/utils/post";
import MainSlider from "@/components/MainSlider";
import { getImages } from "@/utils/image";
import { getUsers } from "@/utils/user";
import {
  AppQueryResult,
  Category,
  Country,
  ImageType,
  Membership,
  Post,
  Setting,
  Slide,
  User,
} from "@/types/queries";
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
  const [
    { trans },
    slides,
    categories,
    setting,
    subscriptions,
    sponsorships,
    posts,
    sponsors,
    images,
    country,
  ]: [
    { trans: any },
    Slide[],
    AppQueryResult<Category[]>,
    Setting,
    Membership[],
    Membership[],
    AppQueryResult<Post[]>,
    AppQueryResult<User[]>,
    AppQueryResult<ImageType[]>,
    Country
  ] = await Promise.all([
    getDictionary(lang),
    getSlides(`on_home=1`, lang),
    getCategories(`on_home=1`, lang),
    getSetting(),
    getMemberships(`sort=subscription&on_home=1&limit=3`, lang),
    getMemberships(`sort=sponsorship&limit=3`, lang),
    getPosts(`on_home=1`),
    getUsers(`membership=sponsorship`, lang),
    getImages(`on_home=1`, lang),
    getCountries(`lang=${lang}&limit=1`, lang),
  ]);

  return (
    <MainContextLayout trans={trans} lang={lang} setting={setting}>
      {/* slider */}
      <MainSlider slides={slides} lang={lang} />
      {/* search */}
      <SearchBar lang={lang} />
      {/* categories */}
      <CategoriesList
        lang={lang}
        categories={categories}
        trans={trans as { [key: string]: string }}
      />
      {/* register as */}
      {!token ||
        (!token.value && (
          <RegisterAs lang={lang} trans={trans} isAuth={token && token.value} />
        ))}
      {/*  figures  */}
      <Figures trans={trans} />
      {/* newsletter */}
      <NewsLetters />
      {/* posts */}
      <LatestNews trans={trans} lang={lang} posts={posts} />
      {/* subscription prices */}
      <SubscriptionsPrices
        country={country}
        subscriptions={subscriptions}
        trans={trans}
        lang={lang}
        isAuth={token && token.value}
      />
      {/* sponsors logos */}
      <SponsorsList
        sponsors={sponsors}
        trans={trans as { [key: string]: string }}
      />
      {/* sponsorship prices */}
      <SponsorsPrices
        country={country}
        trans={trans}
        lang={lang}
        sponsorships={sponsorships}
        isAuth={token && token.value}
      />
      {/* OnHome Images with Url if exist (this will be a slider) */}
      {images && images.data.length > 0 && (
        <MainGallery images={images.data} setting={setting} show_download_btn />
      )}
    </MainContextLayout>
  );
}
