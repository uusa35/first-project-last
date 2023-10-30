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
import { Figures } from "@/components/Home/Figures";
import { NewsLetters } from "@/components/Home/NewsLetters";
import { LatestNews } from "@/components/Home/LatestNews";
import { SubscriptionsPrices } from "@/components/Home/SubscriptionsPrices";
import { SearchBar } from "@/components/Home/SearchBar";
import { Categories } from "@/components/Home/Categories";
import { RegisterAs } from "@/components/Home/RegisterAs";
import { Sponsors } from "@/components/Home/Sponsors";
import { SponsorsPrices } from "@/components/Home/SponsorsPrices";
import { MainGallery } from "@/components/Home/MainGallery";
// import Background from "@/appIcons/bg.svg";
// function classNames(...classes: any) {
//   return classes.filter(Boolean).join(" ");
// }

type Props = {
  params: { lang: Locale["lang"] };
};

// or Dynamic metadata
export async function generateMetadata({ params }: Props) {
  const setting = await getSetting(params.lang);
  return {
    title: setting.name,
    description: setting.description,
    lang: params.lang,
    openGraph: {
      title: setting.name,
      description: setting.description,
      url: setting.instagram,
      siteName: setting.name,
      images: [
        {
          url: setting.image,
          width: 800,
          height: 600,
        },
        {
          url: setting.image,
          width: 1800,
          height: 1600,
          alt: "My custom alt",
        },
      ],
      locale: params.lang,
      type: "website",
    },
    generator: setting.name,
    applicationName: setting.name,
    referrer: "origin-when-cross-origin",
    keywords: setting.keywords,
    authors: [
      { name: setting.name },
      { name: setting.name, url: setting.facebook },
    ],
    colorScheme: "light",
    creator: setting.name,
    publisher: setting.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

export default async function Home({ params: { lang } }: Props) {
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
    getSetting(lang),
    getMemberships(`sort=subscription&on_home=1&limit=3`, lang),
    getMemberships(`sort=sponsorship&limit=3`, lang),
    getPosts(`on_home=1`, lang),
    getUsers(`membership=sponsorship`, lang),
    getImages(`on_home=1`, lang),
    getCountries(`lang=${lang}&limit=1`, lang),
  ]);

  return (
    <MainContextLayout
      trans={trans as { [key: string]: string }}
      lang={lang}
      searchParams={``}
      setting={setting}
    >
      {/* slider */}
      <MainSlider slides={slides} lang={lang} />
      {/* search */}
      <SearchBar lang={lang} trans={trans as { [key: string]: string }} />

      {/* categories */}
      <Categories
        lang={lang}
        categories={categories}
        trans={trans as { [key: string]: string }}
      />

      {/* register as */}
      <RegisterAs lang={lang} trans={trans as { [key: string]: string }} />

      {/*  figures  */}
      <Figures trans={trans as { [key: string]: string }} />

      {/* newsletter */}
      <NewsLetters trans={trans as { [key: string]: string }} />

      {/* posts */}
      <LatestNews
        trans={trans as { [key: string]: string }}
        lang={lang}
        posts={posts}
      />

      {/* subscription prices */}
      <SubscriptionsPrices
        country={country}
        subscriptions={subscriptions}
        trans={trans as { [key: string]: string }}
        lang={lang}
      />

      {/* sponsors logos */}
      <Sponsors
        sponsors={sponsors}
        trans={trans as { [key: string]: string }}
      />

      {/* sponsorship prices */}
      <SponsorsPrices
        country={country}
        trans={trans as { [key: string]: string }}
        lang={lang}
        sponsorships={sponsorships}
      />

      {/* OnHome Images with Url if exist (this will be a slider) */}
      {images && images.data.length > 0 && (
        <MainGallery
          trans={trans as { [key: string]: string }}
          images={images.data}
          setting={setting}
        />
      )}
    </MainContextLayout>
  );
}
