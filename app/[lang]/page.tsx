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
import JoinusBg from "@/appImages/home/joinus.jpg";
import ShowMore from "@/appIcons/green_left_arrow.svg";
import { Subscriptions } from "@/components/Home/Subscriptions";
import { RegisterToJoin } from "@/components/Home/RegisterToJoin";
import { LatestNews } from "@/components/Home/LatestNews";
import { SubscriptionsPrices } from "@/components/Home/SubscriptionsPrices";
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
      <div className="bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="relative isolate overflow-hidden  px-6 sm:rounded-3xl sm:px-14 py-12 xl:py-14">
            <h2 className="text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl capitalize">
              {trans.search}
            </h2>
            <form className="mx-auto mt-10 flex max-w-2xl gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                {trans.email}
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 h-14 text-black bg-gray-100 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                placeholder={trans.enter_ur_email}
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-green-900 text-white px-3.5 py-2.5 text-sm font-semibold  shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {trans.search}
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* categories */}
      <div className="bg-white py-12 sm:py-12 capitalize">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h2 className="text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl capitalize">
              {trans.categories}
            </h2>
            <p className="mt-6 text-lg text-center break-words leading-8 text-gray-600">
              {
                trans.through_this_section_find_out_all_companies_related_to_your_interested_field
              }
            </p>
          </div>

          <ul
            role="list"
            className="mx-auto mt-10 grid  grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-5"
          >
            {categories.data.map((c: Category, i: number) => (
              <CategoryCard element={c} key={c.name} lang={lang} />
            ))}
          </ul>

          <div className="pt-12 pb-2 w-full text-center text-expo-dark">
            <Link
              className="flex gap-x-2 items-center justify-center"
              href={`${lang}/user?membership=subscription`}
            >
              {trans.navigate_to_more}
              <ShowMore />
            </Link>
          </div>
        </div>
      </div>

      {/* subscriptions */}
      <div className="relative bg-expo-green capitalize">
        <div className="relative h-80 overflow-hidden bg-expo-green md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2">
          <Image
            className="h-full w-full object-cover brightness-50  saturate-150 "
            src={JoinusBg}
            alt=""
            width={300}
            height={300}
          />
          <svg
            viewBox="0 0 926 676"
            aria-hidden="true"
            className="absolute -bottom-24 left-24 w-[57.875rem] transform-gpu blur-[118px]"
          >
            <path
              fill="url(#60c3c621-93e0-4a09-a0e6-4c228a0116d8)"
              fillOpacity=".4"
              d="m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z"
            />
            <defs>
              <linearGradient
                id="60c3c621-93e0-4a09-a0e6-4c228a0116d8"
                x1="926.392"
                x2="-109.635"
                y1=".176"
                y2="321.024"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#776FFF" />
                <stop offset={1} stopColor="#FF4694" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="relative mx-auto max-w-7xl py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32">
            <h2 className=" font-semibold leading-8 text-lg text-black">
              {trans.joinus}
            </h2>
            <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-black line-clamp-2 sm:text-4xl">
              {trans.joinus_and_get_many_features}
            </p>
            <p className="mt-6 text-base leading-8 line-clamp-2 text-gray-800">
              {trans.get_to_know_all_kind_of_subscriptions_and_sponsorships}
            </p>
            <div className="mt-8">
              <Link
                href={`/${lang}/register/company`}
                className="inline-flex  btn-color-default break-words text-sm  "
              >
                {trans.register_as_subscription}
              </Link>
            </div>
            <div className="flex flex-row gap-4 mt-2">
              <Link
                className="inline-flex  btn-color-default  bg-transparent text-expo-dark border border-expo-dark hover:bg-expo-dark hover:text-white text-sm  "
                href={`/${lang}/register/company`}
              >
                {trans.register_as_sponsorship}
              </Link>
              <Link
                className="inline-flex  btn-color-default  bg-transparent text-expo-dark border border-expo-dark hover:bg-expo-dark hover:text-white text-sm  "
                href={`/${lang}/register/visitor`}
              >
                {trans.register_as_visitor}
              </Link>
            </div>
          </div>
        </div>
      </div>

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

      {/* <HomeContent
        lang={lang}
        categories={categories}
        slides={slides}
        setting={setting}
        memberships={memberships}
        posts={posts}
      /> */}
    </MainContextLayout>
  );
}
