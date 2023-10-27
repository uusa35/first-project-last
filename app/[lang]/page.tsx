import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { MainContextLayout } from "@/layouts/MainContentLayout";
import { getSlides } from "@/utils/slide";
import { getCategories } from "@/utils/category";
import { getSetting } from "@/utils/setting";
import { getMemberships } from "@/utils/membership";
import { getPosts } from "@/utils/post";
import Link from "next/link";
import MainSlider from "@/components/MainSlider";
import Image from "next/image";
import { getImages } from "@/utils/image";
import { getUsers } from "@/utils/user";
import { Category, Membership, Post, User } from "@/types/queries";
import Loading from "./loading";
import { PersonOutlineOutlined } from "@/src/constants";
import { getCountries } from "@/utils/country";
import DOMPurify from "isomorphic-dompurify";
import PostCard from "@/components/post/PostCard";
import CategoryCard from "@/components/category/CategoryCard";
import MembershipCard from "@/components/membership/MembershipCard";

import DotPattern from "@/appImages/home/dot_pattern.png";

import { Subscriptions } from "@/components/Home/Subscriptions";
import { RegisterToJoin } from "@/components/Home/RegisterToJoin";
import { LatestNews } from "@/components/Home/LatestNews";
import { SubscriptionsPrices } from "@/components/Home/SubscriptionsPrices";
import { SearchBar } from "@/components/Home/SearchBar";
import { Categories } from "@/components/Home/Categories";
import { RegisterAs } from "@/components/Home/RegisterAs";
// import Background from "@/appIcons/bg.svg";

type Props = {
  params: { lang: Locale["lang"] };
};

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
      <Subscriptions trans={trans as { [key: string]: string }} />

      {/* newsletter */}
      <RegisterToJoin trans={trans as { [key: string]: string }} />

      {/* posts */}
      <LatestNews
        trans={trans as { [key: string]: string }}
        lang={lang}
        posts={posts}
      />

      {/* subscription prices */}
      <SubscriptionsPrices trans={trans as { [key: string]: string }} />

      {/* sponsors logos */}
      {sponsors.data && (
        <div className="bg-white py-12 sm:py-12 capitalize">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
              {trans.sponsors}
            </h2>
            <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
              {sponsors.data.map((s: User, i: string) => (
                <Link key={s.id} href={`/user/${s.id}?slug=${s.name}`}>
                  <Image
                    key={i}
                    className="col-span-2 max-h-[100px] w-full object-contain lg:col-span-1"
                    src={s.image}
                    alt={s.name}
                    width={200}
                    height={200}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* sponsorship prices */}
      <div className="bg-expo-green py-12 sm:py-12 capitalize">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-8 text-green-600">
              {trans.sponsors}
            </h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {trans.sponsorships}
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
            Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et
            quasi iusto modi velit ut non voluptas in. Explicabo id ut laborum.
          </p>

          <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {sponsorships.map((s: Membership, i: number) => (
              <MembershipCard
                element={s}
                key={i}
                lang={lang}
                country={country[0]}
              />
            ))}
          </div>
        </div>
      </div>

      {/* OnHome Images with Url if exist (this will be a slider) */}
      <div className="py-12 sm:py-10 capitalize">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto  lg:mx-0">
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {trans.gallery}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
              We’re a dynamic group of individuals who are passionate about what
              we do and dedicated to delivering the best results for our
              clients.
            </p>
          </div>

          <ul
            role="list"
            className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4"
          >
            {images.data.map((img: any, i: number) => (
              <li key={i}>
                <Image
                  className="aspect-[3/2] w-full rounded-2xl object-cover"
                  src={img.image}
                  alt={setting.name}
                  width={200}
                  height={200}
                />
                {img.name && (
                  <>
                    <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                      {img.name}
                    </h3>
                    <p className="text-base leading-8 text-gray-600">
                      {img.caption}
                    </p>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MainContextLayout>
  );
}
