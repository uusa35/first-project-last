import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import {
  MainContextLayout,
  Carousel,
  Typography,
} from "@/components/MainContentLayout";
import { getUsers } from "@/utils/user";
import ComingSoon from "@/components/ComingSoon";
import { getSlides } from "@/utils/slide";
import { getCategories } from "@/utils/category";
import { getSetting } from "@/utils/setting";
import { Metadata } from "next";
import { CheckIcon } from "@heroicons/react/20/solid";
import NavHeader from "@/components/NavHeader";
import { getMemberships } from "@/utils/membership";
import { getPosts } from "@/utils/post";
import { appLinks } from "@/src/constants";
import Link from "next/link";
import MainSlider from "@/components/MainSlider";

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

const navigation = {
  main: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
    { name: "Accessibility", href: "#" },
    { name: "Partners", href: "#" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: (props) => (
        <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
          <path
            fillRule='evenodd'
            d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
            clipRule='evenodd'
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      icon: (props) => (
        <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
          <path
            fillRule='evenodd'
            d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
            clipRule='evenodd'
          />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "#",
      icon: (props) => (
        <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
          <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "#",
      icon: (props) => (
        <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
          <path
            fillRule='evenodd'
            d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
            clipRule='evenodd'
          />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "#",
      icon: (props) => (
        <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
          <path
            fillRule='evenodd'
            d='M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z'
            clipRule='evenodd'
          />
        </svg>
      ),
    },
  ],
};

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
    metadataBase: process.env.NEXT_PUBLIC_BASE_URL,
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en",
        "ar-SA": "/ar",
        "ru-RU": "/ru",
      },
    },
  };
}

export default async function Home({ params: { lang } }: Props) {
  const [{ trans }, slides, categories, setting, memberships, posts] =
    await Promise.all([
      getDictionary(lang),
      getSlides(`on_home=1`, lang),
      getCategories(`on_home=true`, lang),
      getSetting(lang),
      getMemberships(`zones[0]=A&zones[1]=B`, lang),
      getPosts(`on_home=1`, lang),
    ]);

  if (!posts) return <>Loading</>;
  return (
    <MainContextLayout trans={trans} lang={lang}>
      {/* slider */}
      <MainSlider slides={slides} />

      {/* categories */}
      <div className='py-12 sm:py-10'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:mx-0'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl capitalize'>
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
            className='mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-5'>
            {categories.data.map((c: any) => (
              <li key={c.id}>
                <Link href={`/${lang}/user?category_id=${c.id}`}>
                  <img
                    className='aspect-[3/2] w-full rounded-2xl object-cover'
                    src={c.image}
                    alt=''
                  />
                  <h3 className='mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900'>
                    {c.name}
                  </h3>
                  <p className='text-base leading-7 text-gray-600'>
                    {c.caption}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* subscriptions */}

      <div className='relative bg-gray-900'>
        <div className='relative h-80 overflow-hidden bg-indigo-600 md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2'>
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
            <h2 className='text-base font-semibold leading-7 text-indigo-400'>
              Award winning support
            </h2>
            <p className='mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl'>
              We’re here to help
            </p>
            <p className='mt-6 text-base leading-7 text-gray-300'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et,
              egestas tempus tellus etiam sed. Quam a scelerisque amet
              ullamcorper eu enim et fermentum, augue. Aliquet amet volutpat
              quisque ut interdum tincidunt duis.
            </p>
            <div className='mt-8'>
              <a
                href='#'
                className='inline-flex rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'>
                Visit the help center
              </a>
            </div>
          </div>
        </div>
      </div>

      {/*  figures  */}
      <div className='bg-white py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:max-w-none'>
            <div className='text-center'>
              <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                Trusted by creators worldwide
              </h2>
              <p className='mt-4 text-lg leading-8 text-gray-600'>
                Lorem ipsum dolor sit amet consect adipisicing possimus.
              </p>
            </div>
            <dl className='mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4'>
              {stats.map((stat) => (
                <div key={stat.id} className='flex flex-col bg-gray-400/5 p-8'>
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
      <div className='bg-white  sm:py-14'>
        <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
          <div className='relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32'>
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
              From the blog
            </h2>
            <p className='mt-2 text-lg leading-8 text-gray-600'>
              Learn how to grow your business with our expert advice.
            </p>
          </div>
          <div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
            {posts.data.map((post: any) => (
              <article
                key={post.id}
                className='flex flex-col items-start justify-between'>
                <div className='relative w-full'>
                  <img
                    src={post.image}
                    alt=''
                    className='aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]'
                  />
                  <div className='absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10' />
                </div>

                <div className='mt-8 flex items-center justify-between text-xs'>
                  <time dateTime={post.datetime} className='text-gray-500'>
                    {post.date}
                  </time>
                  <Link
                    href={`/post/${post.id}`}
                    className='relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100'>
                    {post.name}
                  </Link>
                </div>
                <div className='group relative'>
                  <h3 className='mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600'>
                    <Link href={`/post/${post.id}`}>
                      <span className='absolute inset-0' />
                      {post.name}
                    </Link>
                  </h3>
                  <p className='mt-5 line-clamp-3 text-sm leading-6 text-gray-600'>
                    {post.caption}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* subscription prices */}
      <div className='expo-green sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-4xl text-center'>
            <h2 className='text-base font-semibold leading-7 text-indigo-600'>
              Pricing
            </h2>
            <p className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
              Pricing plans for teams of&nbsp;all&nbsp;sizes
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
                        tier.mostPopular ? "text-indigo-600" : "text-gray-900",
                        "text-lg font-semibold leading-8"
                      )}>
                      {tier.name}
                    </h3>
                    {tier.mostPopular ? (
                      <p className='rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600'>
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
                          className='h-6 w-5 flex-none text-indigo-600'
                          aria-hidden='true'
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={tier.href}
                  aria-describedby={tier.id}
                  className={classNames(
                    tier.mostPopular
                      ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500"
                      : "text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300",
                    "mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  )}>
                  Buy plan
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* sponsors logos */}
      <div className='bg-white py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <h2 className='text-center text-lg font-semibold leading-8 text-gray-900'>
            Trusted by the world’s most innovative teams
          </h2>
          <div className='mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5'>
            <img
              className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
              src='https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg'
              alt='Transistor'
              width={158}
              height={48}
            />
            <img
              className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
              src='https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg'
              alt='Reform'
              width={158}
              height={48}
            />
            <img
              className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
              src='https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg'
              alt='Tuple'
              width={158}
              height={48}
            />
            <img
              className='col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1'
              src='https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg'
              alt='SavvyCal'
              width={158}
              height={48}
            />
            <img
              className='col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1'
              src='https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg'
              alt='Statamic'
              width={158}
              height={48}
            />
          </div>
        </div>
      </div>

      {/* sponsorship prices */}
      <div className='expo-green py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-4xl text-center'>
            <h2 className='text-base font-semibold leading-7 text-indigo-600'>
              Pricing
            </h2>
            <p className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
              Pricing plans for teams of all sizes
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
                <a
                  href={tier.href}
                  aria-describedby={tier.id}
                  className={classNames(
                    tier.featured
                      ? "bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white"
                      : "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600",
                    "mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  )}>
                  {tier.cta}
                </a>
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
                          tier.featured ? "text-white" : "text-indigo-600",
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

      {/* Gallery & downloads */}
      {/* categories */}
      <div className='py-12 sm:py-10'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:mx-0'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
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
            className='mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
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

      {/* footer */}
      <footer className='bg-white'>
        <div className='mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8'>
          <nav
            className='-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12'
            aria-label='Footer'>
            {navigation.main.map((item) => (
              <div key={item.name} className='pb-6'>
                <a
                  href={item.href}
                  className='text-sm leading-6 text-gray-600 hover:text-gray-900'>
                  {item.name}
                </a>
              </div>
            ))}
          </nav>
          <div className='mt-10 flex justify-center space-x-10'>
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className='text-gray-400 hover:text-gray-500'>
                <span className='sr-only'>{item.name}</span>
                <item.icon className='h-6 w-6' aria-hidden='true' />
              </a>
            ))}
          </div>
          <p className='mt-10 text-center text-xs leading-5 text-gray-500'>
            &copy; 2020 Your Company, Inc. All rights reserved.
          </p>
        </div>
      </footer>
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
