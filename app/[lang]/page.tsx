import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { MainContextLayout } from "@/components/MainContentLayout";
import { getSlides } from "@/utils/slide";
import { getCategories } from "@/utils/category";
import { getSetting } from "@/utils/setting";
import { CheckIcon } from "@heroicons/react/20/solid";
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
import { Spinner } from "@material-tailwind/react";
import { Suspense } from "react";

const tiers = [
  {
    name: "Freelancer",
    id: "tier-freelancer",
    href: "#",
    priceMonthly: "$24",
    description: "The essentials to provide your best work for clients.",
    features: [
      "5 products",
      "Up to 1,000 subscribers",
      "Basic analytics",
      "48-hour support response time",
    ],
    mostPopular: false,
  },
  {
    name: "Startup",
    id: "tier-startup",
    href: "#",
    priceMonthly: "$32",
    description: "A plan that scales with your rapidly growing business.",
    features: [
      "25 products",
      "Up to 10,000 subscribers",
      "Advanced analytics",
      "24-hour support response time",
      "Marketing automations",
    ],
    mostPopular: true,
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "#",
    priceMonthly: "$48",
    description: "Dedicated support and infrastructure for your company.",
    features: [
      "Unlimited products",
      "Unlimited subscribers",
      "Advanced analytics",
      "1-hour, dedicated support response time",
      "Marketing automations",
    ],
    mostPopular: false,
  },
];

const people = [
  {
    name: "Lindsay Walton",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Lindsay Walton",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Lindsay Walton",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Lindsay Walton",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Lindsay Walton",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

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
      trans={trans}
      lang={lang}
      searchParams={``}
      setting={setting}>
      {/* slider */}
      {/* <MainSlider slides={slides} lang={lang} /> */}
      {/* search */}
      <div className='bg-white py-12 sm:py-12'>
        <div className='mx-auto max-w-7xl'>
          <div className='relative isolate overflow-hidden  px-6 py-14 sm:rounded-3xl sm:px-24 xl:py-32'>
            <h2 className='mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-black sm:text-4xl'>
              {trans.search}
            </h2>

            <form className='mx-auto mt-10 flex max-w-2xl gap-x-4'>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <input
                id='email-address'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 h-14 text-black bg-gray-100 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6'
                placeholder='Enter your email'
              />
              <button
                type='submit'
                className='flex-none rounded-md bg-green-900 text-white px-3.5 py-2.5 text-sm font-semibold  shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'>
                Search Now
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* categories */}
      <div className='bg-white py-12 sm:py-12 capitalize'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:max-w-none'>
            <h2 className='text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl capitalize'>
              {trans.categories}
            </h2>
            <p className='mt-6 text-lg text-center break-words leading-8 text-gray-600'>
              {
                trans.through_this_section_find_out_all_companies_related_to_your_interested_field
              }
            </p>
          </div>

          <ul
            role='list'
            className='mx-auto mt-10 grid  grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-5'>
            {categories.data.map((c: Category, i: number) => (
              <CategoryCard element={c} key={c.name} lang={lang} />
            ))}
          </ul>

          <div className='pt-12 pb-2 w-full text-center text-expo-dark'>
            <Link href={`${lang}/user?membership=subscription`}>
              {trans.navigate_to_more}
            </Link>
          </div>
        </div>
      </div>

      {/* subscriptions */}
      <div className='relative bg-expo-green capitalize'>
        <div className='relative h-80 overflow-hidden bg-expo-green md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2'>
          <Image
            className='h-full w-full object-cover'
            src='https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&blend=6366F1&sat=-100&blend-mode=multiply'
            alt=''
            width={300}
            height={300}
          />
          <svg
            viewBox='0 0 926 676'
            aria-hidden='true'
            className='absolute -bottom-24 left-24 w-[57.875rem] transform-gpu blur-[118px]'>
            <path
              fill='url(#60c3c621-93e0-4a09-a0e6-4c228a0116d8)'
              fillOpacity='.4'
              d='m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z'
            />
            <defs>
              <linearGradient
                id='60c3c621-93e0-4a09-a0e6-4c228a0116d8'
                x1='926.392'
                x2='-109.635'
                y1='.176'
                y2='321.024'
                gradientUnits='userSpaceOnUse'>
                <stop stopColor='#776FFF' />
                <stop offset={1} stopColor='#FF4694' />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className='relative mx-auto max-w-7xl py-24 sm:py-32 lg:px-8 lg:py-40'>
          <div className='pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32'>
            <h2 className=' font-semibold leading-8 text-lg text-black'>
              {trans.joinus}
            </h2>
            <p className='mt-2 text-3xl font-bold leading-8 tracking-tight text-black line-clamp-2 sm:text-4xl'>
              {trans.joinus_and_get_many_features}
            </p>
            <p className='mt-6 text-base leading-8 line-clamp-2 text-gray-800'>
              {trans.get_to_know_all_kind_of_subscriptions_and_sponsorships}
            </p>
            <div className='mt-8'>
              <Link
                href={`/${lang}/register/company`}
                className='inline-flex  btn-color-default break-words text-sm  '>
                {trans.register_as_subscription}
              </Link>
            </div>
            <div className='flex flex-row gap-4 mt-2'>
              <Link
                className='inline-flex  btn-color-default  bg-transparent text-expo-dark border border-expo-dark hover:bg-expo-dark hover:text-white text-sm  '
                href={`/${lang}/register/company`}>
                {trans.register_as_sponsorship}
              </Link>
              <Link
                className='inline-flex  btn-color-default  bg-transparent text-expo-dark border border-expo-dark hover:bg-expo-dark hover:text-white text-sm  '
                href={`/${lang}/register/visitor`}>
                {trans.register_as_visitor}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/*  figures  */}
      <div className='bg-white py-12 sm:py-12 capitalize'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:max-w-none'>
            <dl className='mt-16 grid grid-cols-2 p-2 md:p-8 bg-expo-green  overflow-hidden rounded-2xl text-center lg:grid-cols-4'>
              <div className='col-span-1 flex flex-1 flex-row  justify-evenly items-center h-40 px-4 md:px-8 border-gray-400 ltr:border-r rtl:border-l '>
                <PersonOutlineOutlined className='material-icon-lg border-blue-800 text-expo-dark ' />
                <div className='flex flex-col  p-2  border-gray-400 '>
                  <dt className='text-sm font-semibold break-all  leading-6 text-gray-600'>
                    {trans.subscribers}
                  </dt>
                  <dd className='order-first text-3xl font-semibold tracking-tight text-gray-900'>
                    {100}
                  </dd>
                </div>
              </div>

              <div className='col-span-1 flex flex-1 flex-row  justify-evenly items-center h-40 border-gray-400 border-hidden lg:border-solid md:ltr:border-r md:rtl:border-l'>
                <PersonOutlineOutlined className='material-icon-lg border-blue-800 text-expo-dark ' />
                <div className='flex flex-col  p-2 pe-8  border-gray-400 '>
                  <dt className='text-sm font-semibold break-all  leading-6 text-gray-600'>
                    {trans.subscribers}
                  </dt>
                  <dd className='order-first text-3xl font-semibold tracking-tight text-gray-900'>
                    {100}
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* newsletter */}
      <div className='bg-white py-12 sm:py-12 capitalize'>
        <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
          <div className='relative isolate overflow-hidden bg-green-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32'>
            <h2 className='mx-auto max-w-3xl line-clamp-2 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl pb-4'>
              {trans.register_to_receive_latest_expo_news}
            </h2>
            <p className='mx-auto mt-2 max-w-xl  line-clamp-2 text-center text-lg leading-8 text-gray-300'>
              {
                trans.through_this_section_u_can_follow_up_all_news_related_to_this_expo_and_even_more
              }
            </p>
            <form className='mx-auto mt-10 flex max-w-md gap-x-4'>
              <label htmlFor='email-address' className='sr-only'>
                {trans.enter_ur_email}
              </label>
              <input
                id='email-address'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6'
                placeholder={trans.enter_ur_email}
              />
              <button
                type='submit'
                className='flex-none rounded-md bg-expo-light px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'>
                {trans.notify_me}
              </button>
            </form>
            <svg
              viewBox='0 0 1024 1024'
              className='absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2'
              aria-hidden='true'>
              <circle
                cx={512}
                cy={512}
                r={512}
                fill='url(#759c1415-0410-454c-8f7c-9a820de03641)'
                fillOpacity='0.7'
              />
              <defs>
                <radialGradient
                  id='759c1415-0410-454c-8f7c-9a820de03641'
                  cx={0}
                  cy={0}
                  r={1}
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='translate(512 512) rotate(90) scale(512)'>
                  <stop stopColor='#7775D6' />
                  <stop offset={1} stopColor='#E935C1' stopOpacity={0} />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* posts */}
      <div className='bg-white py-14 capitalize'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              {trans.latest_news}
            </h2>
            <p className='mt-2 text-lg break-all leading-8 text-gray-600'>
              {trans.through_this_section_get_latest_news_related}
            </p>
          </div>

          <div className='mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
            {posts.data.map((p: Post, i: number) => (
              <PostCard element={p} lang={lang} key={p.name} />
            ))}
          </div>
        </div>
      </div>
      {/* subscription prices */}
      <div className='bg-expo-green py-12 sm:py-12 capitalize'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-4xl text-center'>
            <h2 className='text-base font-semibold leading-8 text-green-600'>
              Pricing
            </h2>
            <p className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
              {trans.subscriptions}
            </p>
          </div>
          <p className='mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600'>
            Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et
            quasi iusto modi velit ut non voluptas in. Explicabo id ut laborum.
          </p>
          <div className='isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
            {tiers.map((tier, tierIdx) => (
              <div
                key={tier.id}
                className={classNames(
                  tier.mostPopular ? "lg:z-10 lg:rounded-b-none" : "lg:mt-8",
                  tierIdx === 0 ? "lg:rounded-r-none" : "",
                  tierIdx === tiers.length - 1 ? "lg:rounded-l-none" : "",
                  "flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10"
                )}>
                <div>
                  <div className='flex items-center justify-between gap-x-4'>
                    <h3
                      id={tier.id}
                      className={classNames(
                        tier.mostPopular ? "text-green-600" : "text-gray-900",
                        "text-lg font-semibold leading-8"
                      )}>
                      {tier.name}
                    </h3>
                    {tier.mostPopular ? (
                      <p className='rounded-full bg-green-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-green-600'>
                        Most popular
                      </p>
                    ) : null}
                  </div>
                  <p className='mt-4 text-sm leading-6 text-gray-600'>
                    {tier.description}
                  </p>
                  <p className='mt-6 flex items-baseline gap-x-1'>
                    <span className='text-4xl font-bold tracking-tight text-gray-900'>
                      {tier.priceMonthly}
                    </span>
                    <span className='text-sm font-semibold leading-6 text-gray-600'>
                      /month
                    </span>
                  </p>
                  <ul
                    role='list'
                    className='mt-8 space-y-3 text-sm leading-6 text-gray-600'>
                    {tier.features.map((feature) => (
                      <li key={feature} className='flex gap-x-3'>
                        <CheckIcon
                          className='h-6 w-5 flex-none text-green-600'
                          aria-hidden='true'
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={tier.href}
                  aria-describedby={tier.id}
                  className={classNames(
                    tier.mostPopular
                      ? "bg-green-600 text-white shadow-sm hover:bg-green-500"
                      : "text-green-600 ring-1 ring-inset ring-green-200 hover:ring-green-300",
                    "mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  )}>
                  Buy plan
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* sponsors logos */}

      {sponsors.data && (
        <div className='bg-white py-12 sm:py-12 capitalize'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <h2 className='text-center text-lg font-semibold leading-8 text-gray-900'>
              {trans.sponsors}
            </h2>
            <div className='mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5'>
              {sponsors.data.map((s: User, i: string) => (
                <Link key={s.id} href={`/user/${s.id}?slug=${s.name}`}>
                  <Image
                    key={i}
                    className='col-span-2 max-h-[100px] w-full object-contain lg:col-span-1'
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
      <div className='bg-expo-green py-12 sm:py-12 capitalize'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-4xl text-center'>
            <h2 className='text-base font-semibold leading-8 text-green-600'>
              {trans.sponsors}
            </h2>
            <p className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
              {trans.sponsorships}
            </p>
          </div>
          <p className='mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600'>
            Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et
            quasi iusto modi velit ut non voluptas in. Explicabo id ut laborum.
          </p>

          <div className='isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
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
      <div className='py-12 sm:py-10 capitalize'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto  lg:mx-0'>
            <h2 className='text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              {trans.gallery}
            </h2>
            <p className='mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600'>
              We’re a dynamic group of individuals who are passionate about what
              we do and dedicated to delivering the best results for our
              clients.
            </p>
          </div>

          <ul
            role='list'
            className='mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4'>
            {images.data.map((img: any, i: number) => (
              <li key={i}>
                <Image
                  className='aspect-[3/2] w-full rounded-2xl object-cover'
                  src={img.image}
                  alt={setting.name}
                  width={200}
                  height={200}
                />
                {img.name && (
                  <>
                    <h3 className='mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900'>
                      {img.name}
                    </h3>
                    <p className='text-base leading-8 text-gray-600'>
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
