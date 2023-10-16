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
import { Category, Post, User } from "@/types/queries";
import Loading from "./loading";
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

const stats = [
  { id: 1, name: "Creators on the platform", value: "8,000+" },
  { id: 2, name: "Flat platform fee", value: "3%" },
  { id: 3, name: "Uptime guarantee", value: "99.9%" },
  { id: 4, name: "Paid out to creators", value: "$70M" },
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
  ] = await Promise.all([
    getDictionary(lang),
    getSlides(`on_home=1`, lang),
    getCategories(`on_home=1`, lang),
    getSetting(lang),
    getMemberships(`sort=subscription&on_home=1`, lang),
    getMemberships(`sort=sponsorship&on_home=1`, lang),
    getPosts(`on_home=1`, lang),
    getUsers(`membership=sponsorship`, lang),
    getImages(`on_home=1`, lang),
  ]);

  return (
    <MainContextLayout trans={trans} lang={lang} searchParams={``}>
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
      <div className='bg-white py-12 sm:py-12'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:max-w-none'>
            <h2 className='text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl capitalize'>
              {trans.categories}
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              We’re a dynamic group of individuals who are passionate about what
              we do and dedicated to delivering the best results for our
              clients.
            </p>
          </div>
          <ul
            role='list'
            className='mx-auto mt-10 grid  grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-5'>
            {categories.data.map((c: Category) => (
              <li key={c.id}>
                <Link href={`/${lang}/user?category_id=${c.id}`}>
                  <Image
                    className='aspect-[3/2] w-full rounded-2xl object-cover hover:scale-105 duration-200 shadow-lg'
                    src={c.imageLarge}
                    width={100}
                    height={100}
                    alt=''
                  />
                  <h3 className='mt-6 text-lg text-center font-semibold leading-8 tracking-tight text-gray-900'>
                    {c.name}
                  </h3>
                  <p className='text-base leading-7 text-gray-600 hidden'>
                    {c.caption}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* subscriptions */}
      <div className='relative bg-expo-green'>
        <div className='relative h-80 overflow-hidden bg-expo-green md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2'>
          <img
            className='h-full w-full object-cover'
            src='https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&blend=6366F1&sat=-100&blend-mode=multiply'
            alt=''
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
            <h2 className='text-base font-semibold leading-7 text-green-400'>
              {trans.subscriptions}
            </h2>
            <p className='mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl'>
              We’re here to help
            </p>
            <p className='mt-6 text-base leading-7 text-gray-800'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et,
              egestas tempus tellus etiam sed. Quam a scelerisque amet
              ullamcorper eu enim et fermentum, augue. Aliquet amet volutpat
              quisque ut interdum tincidunt duis.
            </p>
            <div className='mt-8'>
              <Link
                href='#'
                className='inline-flex rounded-md bg-green-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'>
                Visit the help center
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/*  figures  */}
      <div className='bg-white py-12 sm:py-12'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:max-w-none'>
            <dl className='mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4'>
              {stats.map((stat) => (
                <div key={stat.id} className='flex flex-col bg-expo-green p-8'>
                  <dt className='text-sm font-semibold leading-6 text-gray-600'>
                    {stat.name}
                  </dt>
                  <dd className='order-first text-3xl font-semibold tracking-tight text-gray-900'>
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* newsletter */}
      <div className='bg-white py-12 sm:py-12'>
        <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
          <div className='relative isolate overflow-hidden bg-green-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32'>
            <h2 className='mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl'>
              Get notified when we’re launching.
            </h2>
            <p className='mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300'>
              Reprehenderit ad esse et non officia in nulla. Id proident tempor
              incididunt nostrud nulla et culpa.
            </p>
            <form className='mx-auto mt-10 flex max-w-md gap-x-4'>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <input
                id='email-address'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6'
                placeholder='Enter your email'
              />
              <button
                type='submit'
                className='flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'>
                Notify me
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
      <div className='bg-white py-14'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              {trans.news}
            </h2>
            <p className='mt-2 text-lg leading-8 text-gray-600'>
              Learn how to grow your business with our expert advice.
            </p>
          </div>
          <div className='mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
            {posts.data.map((post: Post, i: number) => (
              <Link
                href={`/${lang}/post/${post.id}`}
                key={i}
                className='flex flex-col items-start justify-between'>
                <div className='relative w-full'>
                  <Image
                    width={100}
                    height={100}
                    src={post.image}
                    alt={post.name}
                    className='aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]'
                  />
                  <div className='absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10' />
                </div>
                <div className='mt-8 flex items-center justify-between text-xs'>
                  <time dateTime={post.datetime} className='text-gray-500'>
                    {post.date}
                  </time>
                  <h4 className='hidden relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100'>
                    {post.name}
                  </h4>
                </div>

                <div className='group relative'>
                  <h3 className=' text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600'>
                    <span className='absolute inset-0' />
                    {post.name}
                  </h3>

                  <p className='mt-2 line-clamp-3 text-sm leading-6 text-gray-600'>
                    {post.caption}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* subscription prices */}
      <div className='expo-green py-12 sm:py-12'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-4xl text-center'>
            <h2 className='text-base font-semibold leading-7 text-green-600'>
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
      <div className='bg-white py-12 sm:py-12'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <h2 className='text-center text-lg font-semibold leading-8 text-gray-900'>
            {trans.sponsors}
          </h2>
          <div className='mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5'>
            {sponsors.data.map((s: User, i: string) => (
              <Link key={s.id} href={`/user/${s.id}?slug=${s.name}`}>
                <img
                  key={i}
                  className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
                  src={s.image}
                  alt='Transistor'
                  width={100}
                  height={100}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* sponsorship prices */}
      <div className='expo-green py-12 sm:py-12'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-4xl text-center'>
            <h2 className='text-base font-semibold leading-7 text-green-600'>
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
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={classNames(
                  tier.featured ? "bg-gray-900 ring-gray-900" : "ring-gray-200",
                  "rounded-3xl p-8 ring-1 xl:p-10"
                )}>
                <h3
                  id={tier.id}
                  className={classNames(
                    tier.featured ? "text-white" : "text-gray-900",
                    "text-lg font-semibold leading-8"
                  )}>
                  {tier.name}
                </h3>
                <p
                  className={classNames(
                    tier.featured ? "text-gray-300" : "text-gray-600",
                    "mt-4 text-sm leading-6"
                  )}>
                  {tier.description}
                </p>
                <p className='mt-6 flex items-baseline gap-x-1'>
                  <span
                    className={classNames(
                      tier.featured ? "text-white" : "text-gray-900",
                      "text-4xl font-bold tracking-tight"
                    )}>
                    {tier.price}
                  </span>
                  {typeof tier.price !== "string" ? (
                    <span
                      className={classNames(
                        tier.featured ? "text-gray-300" : "text-gray-600",
                        "text-sm font-semibold leading-6"
                      )}>
                      87878
                    </span>
                  ) : null}
                </p>
                <Link
                  href={tier.href}
                  aria-describedby={tier.id}
                  className={classNames(
                    tier.featured
                      ? "bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white"
                      : "bg-green-600 text-white shadow-sm hover:bg-green-500 focus-visible:outline-green-600",
                    "mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  )}>
                  {tier.cta}
                </Link>
                <ul
                  role='list'
                  className={classNames(
                    tier.featured ? "text-gray-300" : "text-gray-600",
                    "mt-8 space-y-3 text-sm leading-6 xl:mt-10"
                  )}>
                  {tier.features.map((feature) => (
                    <li key={feature} className='flex gap-x-3'>
                      <CheckIcon
                        className={classNames(
                          tier.featured ? "text-white" : "text-green-600",
                          "h-6 w-5 flex-none"
                        )}
                        aria-hidden='true'
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OnHome Images with Url if exist (this will be a slider) */}
      <div className='py-12 sm:py-10'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto  lg:mx-0'>
            <h2 className='text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              {trans.gallery}
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              We’re a dynamic group of individuals who are passionate about what
              we do and dedicated to delivering the best results for our
              clients.
            </p>
          </div>
          <ul
            role='list'
            className='mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
            {people.slice(0, 3).map((person) => (
              <li key={person.name}>
                <img
                  className='aspect-[3/2] w-full rounded-2xl object-cover'
                  src={person.imageUrl}
                  alt=''
                />
                <h3 className='mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900'>
                  {person.name}
                </h3>
                <p className='text-base leading-7 text-gray-600'>
                  {person.role}
                </p>
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
