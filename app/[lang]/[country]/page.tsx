import { Locale, countriesList } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { MainContextLayout } from "@/layouts/MainContentLayout";
import {
  AppQueryResult,
  Category,
  ElementPagination,
  Product,
  Slide,
  User,
} from "@/types/queries";
import { getCategories } from "@/utils/category";
import { getSlides } from "@/utils/slide";
import Image from "next/image";
import { getProducts } from "@/utils/product";
import Link from "next/link";
import { getVendors } from "@/utils/user";

type Props = {
  params: { lang: Locale["lang"]; country: countriesList };
};

export default async function ({ params: { lang, country } }: Props) {
  const [{ trans }, categories, sliders, products, vendors]: [
    { trans: any },
    AppQueryResult<Category[]>,
    AppQueryResult<Slide[]>,
    ElementPagination<Product[]>,
    AppQueryResult<User[]>
  ] = await Promise.all([
    getDictionary(lang),
    getCategories(),
    getSlides(`screen_type=home&limit=10`),
    getProducts(`limit=10`),
    getVendors(`limit=10`),
  ]);

  return (
    <MainContextLayout trans={trans} lang={lang} country={country}>
      <div className='relative isolate overflow-hidden pt-14'>
        <h1 className='text-7xl'>HomePage Page {country}</h1>
        <div className='bg-gray-100'>
          <div className='py-8 mb-8 xl:mx-auto xl:max-w-7xl xl:px-8'>
            <div className='px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0'>
              <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
                Shop by Category
              </h2>
              <a
                href='#'
                className='hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block'>
                Browse all categories
                <span aria-hidden='true'> &rarr;</span>
              </a>
            </div>

            <div className='mt-4 flow-root'>
              <div className='-my-2'>
                <div className='relative box-content h-40 overflow-x-auto py-2 xl:overflow-visible'>
                  <div className='absolute flex gap-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0'>
                    {categories.data.map((c: Category, i) => (
                      <Link
                        key={c.name}
                        href={"#"}
                        className='relative flex h-40 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto'>
                        <span aria-hidden='true' className='absolute inset-0'>
                          <Image
                            src={c.image}
                            alt=''
                            width='100'
                            height='100'
                            className='h-full w-full object-cover object-center'
                          />
                        </span>
                        <span
                          aria-hidden='true'
                          className='absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-300 opacity-50'
                        />
                        <span className='relative mt-auto text-center text-xl font-bold text-white'>
                          {c.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-6 px-4 sm:hidden'>
              <a
                href='#'
                className='block text-sm font-semibold text-indigo-600 hover:text-indigo-500'>
                Browse all categories
                <span aria-hidden='true'> &rarr;</span>
              </a>
            </div>
          </div>
        </div>

        <div className='flex w-full flex-wrap justify-between items-center'>
          <h1>sliders</h1>
          {sliders.data.map((s: Slide, i) => (
            <Image
              alt={s.type}
              key={i}
              src={s.image}
              width='100'
              height='100'
            />
          ))}
        </div>

        {/* vendors */}
        <div className='flex w-full flex-col flex-wrap justify-between items-center'>
          <h1>Vendors</h1>
          {vendors.data.map((s: User, i) => (
            <Image
              alt={s.name ?? s.store_name}
              key={i}
              src={s.logo}
              width='100'
              height='100'
            />
          ))}
        </div>

        <div className='bg-white'>
          <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
            <div className='flex items-center justify-between space-x-4'>
              <h2 className='text-lg font-medium text-gray-900'>
                Customers also viewed
              </h2>
              <a
                href='#'
                className='whitespace-nowrap text-sm font-medium text-indigo-600 hover:text-indigo-500'>
                View all
                <span aria-hidden='true'> &rarr;</span>
              </a>
            </div>
            <div className='mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4'>
              {products.data.map((p: Product, i) => (
                <div key={p.id} className='group relative'>
                  <div className='aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100'>
                    <Image
                      alt={p.name}
                      key={i}
                      src={p.image}
                      width='100'
                      height='100'
                      className='object-cover object-center'
                    />
                    <div
                      className='flex items-end p-4 opacity-0 group-hover:opacity-100'
                      aria-hidden='true'>
                      <div className='w-full rounded-md bg-white bg-opacity-75 px-4 py-2 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter'>
                        View Product
                      </div>
                    </div>
                  </div>
                  <div className='mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900'>
                    <h3>
                      <a href='#'>
                        <span aria-hidden='true' className='absolute inset-0' />
                        {p.name}
                      </a>
                    </h3>
                    <p>{p.price}</p>
                  </div>
                  <p className='mt-1 text-sm text-gray-500'>{p.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainContextLayout>
  );
}
