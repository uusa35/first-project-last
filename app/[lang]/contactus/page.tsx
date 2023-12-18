import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { MainContextLayout } from "@/layouts/MainContentLayout";
import { cookies } from "next/headers";
import { getCountryNameCookie } from "@/app/actions";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import PageHeader from "@/src/components/PageHeader";
import ContactusImg from "@/appImages/contactus.png";
type Props = {
  params: { lang: Locale["lang"] };
};

export async function generateMetadata({ params }: Props) {
  const { trans } = await getDictionary(params.lang);
  return {
    title: trans.contactus,
    description: trans.contactus,
    openGraph: {
      title: trans.contactus,
      description: trans.contactus,
      locale: params.lang,
      type: "website",
    },
  };
}

export default async function ({ params: { lang } }: Props) {
  const country: any = await getCountryNameCookie();
  const [{ trans }]: [{ trans: any }] = await Promise.all([
    getDictionary(lang),
  ]);

  return (
    <MainContextLayout trans={trans} showMiddleNav={false}>
      <PageHeader img={ContactusImg.src} title={trans.contactus} />
      <div className='mt-20 text-black px-4 md:px-8 min-h-screen'>
        <h1 className='capitalize text-2xl'>contact us form</h1>
        <form action='#' method='POST' className=' mt-16 max-w-4xl sm:mt-20'>
          <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
            <div>
              <label
                htmlFor='first-name'
                className='block text-sm font-semibold leading-6 text-gray-900'>
                First name
              </label>
              <div className='mt-2.5'>
                <input
                  type='text'
                  name='first-name'
                  id='first-name'
                  autoComplete='given-name'
                  className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-picks-dark sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='last-name'
                className='block text-sm font-semibold leading-6 text-gray-900'>
                Last name
              </label>
              <div className='mt-2.5'>
                <input
                  type='text'
                  name='last-name'
                  id='last-name'
                  autoComplete='family-name'
                  className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-picks-dark sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div className='sm:col-span-2'>
              <label
                htmlFor='company'
                className='block text-sm font-semibold leading-6 text-gray-900'>
                Company
              </label>
              <div className='mt-2.5'>
                <input
                  type='text'
                  name='company'
                  id='company'
                  autoComplete='organization'
                  className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-picks-dark sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div className='sm:col-span-2'>
              <label
                htmlFor='email'
                className='block text-sm font-semibold leading-6 text-gray-900'>
                Email
              </label>
              <div className='mt-2.5'>
                <input
                  type='email'
                  name='email'
                  id='email'
                  autoComplete='email'
                  className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-picks-dark sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div className='sm:col-span-2'>
              <label
                htmlFor='phone-number'
                className='block text-sm font-semibold leading-6 text-gray-900'>
                Phone number
              </label>
              <div className='relative mt-2.5'>
                <div className='absolute inset-y-0 left-0 flex items-center'>
                  <label htmlFor='country' className='sr-only'>
                    Country
                  </label>
                  <select
                    id='country'
                    name='country'
                    className='h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-picks-dark sm:text-sm'>
                    <option>US</option>
                    <option>CA</option>
                    <option>EU</option>
                  </select>
                  <ChevronDownIcon
                    className='pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400'
                    aria-hidden='true'
                  />
                </div>
                <input
                  type='tel'
                  name='phone-number'
                  id='phone-number'
                  autoComplete='tel'
                  className='block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-picks-dark sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div className='sm:col-span-2'>
              <label
                htmlFor='message'
                className='block text-sm font-semibold leading-6 text-gray-900'>
                Message
              </label>
              <div className='mt-2.5'>
                <textarea
                  name='message'
                  id='message'
                  rows={4}
                  className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-picks-dark sm:text-sm sm:leading-6'
                  defaultValue={""}
                />
              </div>
            </div>
          </div>
          <div className='mt-10'>
            <button
              type='submit'
              className='block w-1/4 rounded-md bg-picks-dark px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-picks-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-picks-dark'>
              Let's talk
            </button>
          </div>
        </form>
      </div>
    </MainContextLayout>
  );
}
